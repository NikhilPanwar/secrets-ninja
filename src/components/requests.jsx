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
            let accessToken;
            const credentials = `${inputData.client_id}:${inputData.client_secret}`;
            const encodedCredentials = btoa(credentials);
            let tokenResponse = await fetch('https://api.paypal.com/v1/oauth2/token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': 'en_US',
                    'Authorization': `Basic ${encodedCredentials}`,
                },
                body: new URLSearchParams({ 'grant_type': 'client_credentials' })
            });
            if (endpointURL !== 'https://api.paypal.com/v1/oauth2/token') {
                const tokenData = await tokenResponse.json();
                accessToken = tokenData.access_token;
                response = await fetch(endpointURL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                });
            } else {
                response = tokenResponse;
            }
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
        case 'SendInBlue':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'api-key': `${inputData.api_key}`,
                }
            });
            break;
        case 'RechargePayments':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'X-Recharge-Access-Token': `${inputData.api_key}`,
                }
            });
            break;
        case 'MailerLite':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'X-MailerLite-ApiKey': `${inputData.api_key}`,
                }
            });
            break;
        case 'Trello':
            response = await fetch(endpointURL.replace('<key>', inputData.key).replace('<token>', inputData.token), {
                method: requestMethod
            });
            break;
        case 'RazorPay':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Basic ${btoa(inputData.key_id + ':' + inputData.key_secret)}`,
                }
            });
            break;
        case 'Twilio':
            response = await fetch(endpointURL.replace('<account_sid>', inputData.account_sid), {
                method: requestMethod,
                headers: {
                    'Authorization': `Basic ${btoa(inputData.account_sid + ':' + inputData.auth_token)}`,
                }
            });
            break;
        case 'NpmToken':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.token}`,
                }
            });
            break;
        case 'Mailgun':
            response = await fetch(endpointURL.replace('<domain>', inputData.domain), {
                method: requestMethod,
                headers: {
                    'Authorization': `Basic ${btoa('api:' + inputData.api_key)}`,
                }
            });
            break;
        case 'Klaviyo':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Revision': '2023-02-22',
                    'Authorization' : `Klaviyo-API-Key ${inputData.api_key}`,
                }
            });
            break;
        default:
            return { status: 400, data: { message: 'Unsupported service type' } };
    }

    data = await response.json();
    return { status: response.status, data };
}

export default makeUniversalRequest;