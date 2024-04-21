# Run
```
npm install
npm run dev
```


# Deploy
```
Install firebase tools to deploy
- npm install -g firebase-tools

npm run build
firebase login
firebase deploy
```



### Contributing Modules
1. Add the module to `data/detectors.json`
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
2. Update `components/requests.jsx` with the request code for this service
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
3. Add the service icon in `components/sidebar.jsx`
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