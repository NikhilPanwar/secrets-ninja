# Run
```
npm install
npm run dev
```



### Contributing Modules
1. Add the module to `src/data/detectors.json`
```
{
    "OpenAI": {
        "endpoints": {
            "organizations": {
                "label": "Get Organizations",
                "curl": "curl -X GET 'https://api.openai.com/v1/organizations' -H 'Authorization: Bearer sk-xxxx'",
                "request_url": "https://api.openai.com/v1/organizations",
                "request_method": "GET"
            },
            "additional_endpoints" : {....}
        },
        "input_fields": {
            "api_key": {
                "type": "text",
                "label": "Enter OpenAI API Key",
                "placeholder": "sk-xxxxx-xxxxx-xxxxx-xxxxx"
            },
            "additional_input_fields" : {.....}
        }
    }
}
```

2. Update `src/components/requests.jsx` with the request code for this service
```
case 'OpenAI':
    response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
            'Authorization': `Bearer ${inputData.api_key}`,
        }
    });
    break;
```
- **Optional**
3. Add the service icon in `src/components/sidebar.jsx`
- Icon for services can be discovered at https://react-icons.github.io/react-icons/
- Adding Icon is optional as services with no specified icons already use a placeholder icon
```
import { RiOpenaiFill } from "react-icons/ri";
.....
let serviceIcons = {
    ....,
    OpenAI: RiOpenaiFill,
    ....
}
```

- **CORS Error Workarounds**

If the api can't be accessed from browser due to CORS, add the following to the `src/data/detectors.json`. This will auto enable the corsproxy.io checkbox
```
"alert": {
            "alert_message": "Can't work from frontend because of CORS. Use the curl on your local machine to test it. Or Check the corsproxy.io box to use proxy, at your own risk. We dont control corsproxy.io",
            "color": "failure"
        }
```
### Note
- I understand that the size of `src/data/detectors.json` is getting big, in future will be moving it to database or having individual JSON for each service.
- I understand that creating a different switch case of each service is redundant, and a universal function can be created for most of these, but i wanted the code to be easily contributable as it can be. 
- **You can add new APIs, endpoints freely, but in order to do make any major refactoring/architecture changes to the project, please discuss this with project owner first**