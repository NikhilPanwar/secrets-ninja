import React, { useState, useEffect } from "react";
import { Button, Dropdown, Label, TextInput, Alert } from 'flowbite-react';
import OutputWindow from "../components/output_window";
import RequestWindow from "../components/request_window";
import servicesConfig from '../data/detectors.json';
import { HiInformationCircle } from 'react-icons/hi';
import makeUniversalRequest from "../components/requests";
import { AiOutlineLoading } from 'react-icons/ai';

export default function UniversalComponent({ serviceType }) {
    const serviceConfig = servicesConfig[serviceType] || {};
    const endpoints = serviceConfig.endpoints || {};
    const defaultInputFields = serviceConfig.input_fields || {};

    const firstEndpointKey = Object.keys(endpoints)[0];
    const firstEndpoint = endpoints[firstEndpointKey] || {};

    const [selectedEndpoint, setSelectedEndpoint] = useState(firstEndpoint.label || "Select Endpoint");
    const [curlCommand, setCurlCommand] = useState(firstEndpoint.curl || "");
    const [requestURL, setRequestURL] = useState(firstEndpoint.request_url || "");
    const [requestMethod, setRequestMethod] = useState(firstEndpoint.request_method || "");
    const [inputFields, setInputFields] = useState(firstEndpoint.override_default_input_field ? firstEndpoint.input_fields : defaultInputFields);
    const [status_code, setStatusCode] = useState(0);
    const [output_str, setOutputStr] = useState('');
    const [inputValues, setInputValues] = useState({});
    const [loading, setLoading] = useState(false);

    const handleTestEndpoint = async () => {
        setLoading(true);
        try {
            const { status, data } = await makeUniversalRequest(serviceType, inputValues, requestURL, requestMethod);
            setStatusCode(status);
            setOutputStr(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const handleDropdownChange = (endpointKey) => {
        const endpointConfig = endpoints[endpointKey];
        setSelectedEndpoint(endpointConfig.label);
        setCurlCommand(endpointConfig.curl);
        setRequestURL(endpointConfig.request_url);
        setRequestMethod(endpointConfig.request_method);

        if (endpointConfig.override_default_input_field) {
            setInputFields(endpointConfig.input_fields || {});
        } else {
            setInputFields(defaultInputFields);
        }
    };

    const handleInputChange = (key, value) => {
        setInputValues(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        // Resetting the state variables when serviceType changes
        const newServiceConfig = servicesConfig[serviceType] || {};
        const newEndpoints = newServiceConfig.endpoints || {};
        const newDefaultInputFields = newServiceConfig.input_fields || {};

        const firstNewEndpointKey = Object.keys(newEndpoints)[0];
        const firstNewEndpoint = newEndpoints[firstNewEndpointKey] || {};

        setSelectedEndpoint(firstNewEndpoint.label || "Select Endpoint");
        setCurlCommand(firstNewEndpoint.curl || "");
        setRequestURL(firstNewEndpoint.request_url || "");
        setRequestMethod(firstNewEndpoint.request_method || "");
        setInputFields(firstNewEndpoint.override_default_input_field ? firstNewEndpoint.input_fields : newDefaultInputFields);

        setStatusCode(0);
    }, [serviceType]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold dark:text-white">Check {serviceType} Keys</h2>
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
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            required
                        />
                    </div>
                ))}

                {serviceConfig.alert && (
                    <Alert color={serviceConfig.alert.color} icon={HiInformationCircle}>
                        <span className="font-medium">Alert!</span> {serviceConfig.alert.alert_message}
                    </Alert>
                )}

                <div className="flex flex-col gap-2">
                    <Label value="Select Endpoint" />
                    <div className="flex gap-2">
                        <Dropdown label={selectedEndpoint}>
                            {Object.keys(endpoints).map((key) => (
                                <Dropdown.Item key={key} onClick={() => handleDropdownChange(key)}>
                                    {endpoints[key].label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                        <Button onClick={handleTestEndpoint} size="md" isProcessing={loading} processingSpinner={loading && <AiOutlineLoading className="h-6 w-6 animate-spin" />}>
                            Test Endpoint
                        </Button>
                    </div>
                </div>
            </div>
            <RequestWindow curl={curlCommand} url={requestURL} method={requestMethod} />
            <div className="py-10">
                <OutputWindow status_code={status_code} output_str={output_str} />
            </div>
        </div>
    );
}