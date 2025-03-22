# How to Contribute

## Adding a new service

1. Add the module to `src/data/detectors.json`. Refer the below example for OpenAI

```json
{
  "OpenAI": {
    "endpoints": {
      "organizations": {
        "label": "Get Organizations",
        "curl": "curl -X GET 'https://api.openai.com/v1/organizations' -H 'Authorization: Bearer sk-xxxx'",
        "request_url": "https://api.openai.com/v1/organizations",
        "request_method": "GET"
      },
      "additional_endpoints": {}
    },
    "input_fields": {
      "api_key": {
        "type": "text",
        "label": "Enter OpenAI API Key",
        "placeholder": "sk-xxxxx-xxxxx-xxxxx-xxxxx"
      },
      "additional_input_fields": {}
    }
  }
}
```

2. Update `src/components/requests.jsx` with the request code for this service

```js
case 'OpenAI':
    response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
            'Authorization': `Bearer ${inputData.api_key}`,
        }
    });
    break;
```

3. **(OPTIONAL)** Add the service icon in `src/components/sidebar.jsx`

- Icon for services can be discovered at [https://react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons/)
- Adding Icon is optional as services with no specified icons already use a placeholder icon

```js
import { RiOpenaiFill } from "react-icons/ri";

let serviceIcons = {
    ....,
    OpenAI: RiOpenaiFill,
    ....
}
```

4. **CORS Error Workarounds**

If the api can't be accessed from browser due to CORS, add the following to the `src/data/detectors.json`. This will auto enable the thingproxy.freeboard.io checkbox

```json
"alert": {
      "alert_message": "Use the curl on your local machine to test creds privately. Or check the proxy box to use secrets-ninja-proxy to bypass CORS.",
      "color": "failure"
    }
```

## Note
The following [GPT bot](https://chatgpt.com/g/g-67d9165cb410819191d7b463e4f0a9a2-secrets-ninja-contribution-bot) can be used to generate somewhat functional modules for secrets.ninja
- Output Modules generated using GPT may not be 100% correct and may require testing


- I understand that the size of `src/data/detectors.json` is getting big, in future will be moving it to database or having individual JSON for each service.
- I understand that creating a different switch case of each service is redundant, and a universal function can be created for most of these, but I wanted the code to be easily contributable as it can be.
- Only contribute readonly endpoints, don't want to add any endpoints which allows adding, updating, pushing, or deletion of data, change of state on the service.
