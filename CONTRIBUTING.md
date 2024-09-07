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
            "additional_endpoints" : {}
        },
        "input_fields": {
            "api_key": {
                "type": "text",
                "label": "Enter OpenAI API Key",
                "placeholder": "sk-xxxxx-xxxxx-xxxxx-xxxxx"
            },
            "additional_input_fields" : {}
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

If the api can't be accessed from browser due to CORS, add the following to the `src/data/detectors.json`. This will auto enable the corsproxy.io checkbox

```json
"alert": {
            "alert_message": "Can't work from frontend because of CORS. Use the curl on your local machine to test it. Or Check the corsproxy.io box to use proxy, at your own risk. We dont control corsproxy.io",
            "color": "failure"
        }
```

