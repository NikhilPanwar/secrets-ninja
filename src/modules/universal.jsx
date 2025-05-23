import { useState, useEffect } from 'react';
import { useHash } from 'react-use';
import {
  Button,
  Dropdown,
  Label,
  TextInput,
  Alert,
  Tooltip,
  Checkbox,
} from 'flowbite-react';
import OutputWindow from '../components/output_window';
import RequestWindow from '../components/request_window';
import { HiInformationCircle } from 'react-icons/hi';
import makeUniversalRequest from '../components/requests';
import { AiOutlineLoading } from 'react-icons/ai';

export default function UniversalComponent({ serviceType, servicesConfig }) {
  const [hash, setHash] = useHash();
  const serviceConfig = servicesConfig[serviceType] || {};
  const apiDocumentationPage = serviceConfig.api_documentation_page;
  const endpoints = serviceConfig.endpoints || {};
  const defaultInputFields = serviceConfig.input_fields || {};

  const firstEndpointKey = Object.keys(endpoints)[0];
  const firstEndpoint = endpoints[firstEndpointKey] || {};

  const [selectedEndpoint, setSelectedEndpoint] = useState(
    firstEndpoint.label || 'Select Endpoint'
  );
  const [curlCommand, setCurlCommand] = useState(firstEndpoint.curl || '');
  const [requestURL, setRequestURL] = useState(firstEndpoint.request_url || '');
  const [requestMethod, setRequestMethod] = useState(
    firstEndpoint.request_method || ''
  );
  const [inputFields, setInputFields] = useState(
    firstEndpoint.override_default_input_field
      ? firstEndpoint.input_fields
      : defaultInputFields
  );
  const [status_code, setStatusCode] = useState(0);
  const [output_str, setOutputStr] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const colorIsFailure = serviceConfig?.alert?.color === 'failure';
  const enableButton = !colorIsFailure || (colorIsFailure && isChecked);

  const handleTestEndpoint = async () => {
    setLoading(true);
    try {
      const { status, data } = await makeUniversalRequest(
        isChecked,
        serviceType,
        inputValues,
        requestURL,
        requestMethod
      );
      setStatusCode(status);
      setOutputStr(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateDynamicCurl = (curlCommandTemplate, inputs) => {
    let dynamicCurl = curlCommandTemplate;
    Object.keys(inputs).forEach((key) => {
      dynamicCurl = dynamicCurl.replace(`<${key}>`, inputs[key]);
    });
    return dynamicCurl;
  };

  const handleDropdownChange = (endpointKey, preserveHash = false) => {
    const endpointConfig = endpoints[endpointKey];
    setSelectedEndpoint(endpointConfig.label);
    const updatedCurl = generateDynamicCurl(endpointConfig.curl, inputValues);
    setCurlCommand(updatedCurl);
    setRequestURL(endpointConfig.request_url);
    setRequestMethod(endpointConfig.request_method);

    if (endpointConfig.override_default_input_field) {
      setInputFields(endpointConfig.input_fields || {});
    } else {
      setInputFields(defaultInputFields);
    }

    // Only update hash if we're not preserving it
    if (!preserveHash) {
      const updatedInputs = { ...inputValues, endpoint: endpointKey };
      setHash(new URLSearchParams(updatedInputs).toString());
    }
  };

  const handleInputChange = (key, value) => {
    setInputValues((prev) => {
      const updatedInputs = { ...prev, [key]: value };
      const updatedCurl = generateDynamicCurl(curlCommand, updatedInputs);
      setCurlCommand(updatedCurl);
      // Include the current endpoint in the hash
      const hashInputs = { ...updatedInputs, endpoint: Object.keys(endpoints).find(key => endpoints[key].label === selectedEndpoint) };
      setHash(new URLSearchParams(hashInputs).toString());
      return updatedInputs;
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    // Only reset state variables when serviceType changes
    const newServiceConfig = servicesConfig[serviceType] || {};
    const newEndpoints = newServiceConfig.endpoints || {};
    const newDefaultInputFields = newServiceConfig.input_fields || {};

    const firstNewEndpointKey = Object.keys(newEndpoints)[0];
    const firstNewEndpoint = newEndpoints[firstNewEndpointKey] || {};

    // Reset the selected endpoint and input fields only when serviceType changes
    setSelectedEndpoint(firstNewEndpoint.label || 'Select Endpoint');
    setRequestURL(firstNewEndpoint.request_url || '');
    setRequestMethod(firstNewEndpoint.request_method || '');
    setInputFields(
      firstNewEndpoint.override_default_input_field
        ? firstNewEndpoint.input_fields
        : newDefaultInputFields
    );

    // Reset status code when serviceType changes
    setStatusCode(0);
  }, [serviceType]); // Only depend on serviceType

  useEffect(() => {
    // Update the curl content dynamically based on inputValues but don't reset the endpoint
    const newServiceConfig = servicesConfig[serviceType] || {};
    const newEndpoints = newServiceConfig.endpoints || {};

    // Get the currently selected endpoint
    const selectedEndpointData =
      Object.values(newEndpoints).find(
        (endpoint) => endpoint.label === selectedEndpoint
      ) || {};

    // Generate the updated cURL command based on the selected endpoint and current input values
    const updatedCurl = generateDynamicCurl(
      selectedEndpointData.curl,
      inputValues
    );
    setCurlCommand(updatedCurl);
  }, [inputValues, selectedEndpoint, serviceType]); // Depend on inputValues, selectedEndpoint, and serviceType

  useEffect(() => {
    if (hash) {
      try {
        const hashString = hash.substring(1); // Remove the # character
        if (!hashString) return;
        const hashParamsUrl = new URLSearchParams(hashString);
        var _inputFields = inputFields;
        // First handle the endpoint if it exists
        const endpointKey = hashParamsUrl.get('endpoint');
        if (endpointKey && endpoints[endpointKey]) {
          handleDropdownChange(endpointKey, true); // Pass true to preserve hash
          _inputFields = endpoints[endpointKey].input_fields;
        }

        // Then handle the input fields
        Object.keys(_inputFields).forEach((key) => {
          const value = hashParamsUrl.get(key);
          if (value) {
            setInputValues((prev) => ({ ...prev, [key]: value }));
          }
        });
      } catch (error) {
        console.error('Error parsing hash:', error);
      }
    }
  }, [hash]);

  return (
    <div className="p-4">
      {apiDocumentationPage ? (
        <Tooltip
          content={<span> 👈🏻 Click to View Official API Documentation</span>}
          placement="right"
        >
          <a
            href={apiDocumentationPage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-semibold dark:text-white hover:underline"
          >
            Check {serviceType} Keys
          </a>
        </Tooltip>
      ) : (
        <h2 className="text-2xl font-semibold dark:text-white">
          Check {serviceType} Keys
        </h2>
      )}
      <div className="py-10 flex w-full flex-col gap-4">
        {Object.keys(inputFields).map((key) => (
          <div key={key} className="w-full">
            <div className="mb-2 block">
              <Label htmlFor={key} value={inputFields[key].label} />
            </div>
            <TextInput
              id={key}
              type={inputFields[key].type}
              placeholder={inputFields[key].placeholder}
              value={inputValues[key] || ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
              required
            />
          </div>
        ))}

        {serviceConfig.alert && (
          <Alert color={serviceConfig.alert.color} icon={HiInformationCircle}>
            <span className="font-medium">Alert!</span>{' '}
            {serviceConfig.alert.alert_message}
          </Alert>
        )}

        <div className="flex flex-col gap-2">
          {serviceConfig?.alert?.color === 'failure' && (
            <div className="flex items-center space-x-4">
              <Checkbox
                id="thingsProxyCheckbox"
                label="Use SecretsNinja Proxy to bypass CORS"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <Label htmlFor="thingsProxyCheckbox">
                Use SecretsNinja Proxy to bypass CORS
              </Label>
            </div>
          )}

          <Label value="Select Endpoint" />
          <div className="flex gap-2">
            <Dropdown label={selectedEndpoint}>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {Object.keys(endpoints).map((key) => (
                  <Dropdown.Item
                    key={key}
                    onClick={() => handleDropdownChange(key)}
                  >
                    {endpoints[key].label}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
            <Button
              onClick={handleTestEndpoint}
              size="md"
              isProcessing={loading}
              processingSpinner={
                loading && <AiOutlineLoading className="h-6 w-6 animate-spin" />
              }
              disabled={!enableButton}
            >
              Test Endpoint
            </Button>
          </div>
        </div>
      </div>
      <RequestWindow
        curl={curlCommand}
        url={requestURL}
        method={requestMethod}
      />
      <div className="py-10">
        <OutputWindow status_code={status_code} output_str={output_str} />
      </div>
    </div>
  );
}
