async function makeUniversalRequest(serviceType, inputData, endpointURL, requestMethod) {
    let response, data;

    switch (serviceType) {
        case 'Stripe':
            response = await fetch(endpointURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                },
            });
            break;
        case 'Paypal':
            const credentials = `${inputData.access_token}:${inputData.access_token_secret}`;
            const encodedCredentials = btoa(credentials);
            response = await fetch('https://api.paypal.com/v1/oauth2/token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': 'en_US',
                    'Authorization': `Basic ${encodedCredentials}`,
                },
                body: new URLSearchParams({ 'grant_type': 'client_credentials' })
            });
            break;
        case 'OpenAI':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                }
            });
            break;
        case 'Paystack':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                }
            });
            break;
        case 'Github':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `token ${inputData.access_token}`,
                }
            });
            break;
        case 'LaunchDarkly':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': ` ${inputData.api_key}`,
                }
            });
            break;
        case 'Omnisend':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'X-API-KEY': `${inputData.api_key}`,
                }
            });
            break;
        case 'Telegram':
            response = await fetch(endpointURL.replace('<token>', inputData.bot_token), {
                method: requestMethod
            });
            break;
        case 'Clearbit':
            response = await fetch(endpointURL + inputData.email, {
                method: requestMethod,
                headers: {
                    'Authorization': 'Basic ' + btoa(inputData.api_key + ':'),
                }
            });
            break;
        default:
            return { status: 400, data: { message: 'Unsupported service type' } };
    }

    data = await response.json(); // Assuming JSON response; adjust if needed.
    return { status: response.status, data };
}

export default makeUniversalRequest;