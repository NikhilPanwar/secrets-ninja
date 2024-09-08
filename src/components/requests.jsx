/* eslint-disable no-case-declarations */
async function makeUniversalRequest(serviceType, inputData, endpointURL, requestMethod, requestHeaders) {
    let response, data;

    // endpointURL = 'http://localhost:8000?endpoint=' + encodeURIComponent(endpointURL) + '&method=' + requestMethod;
    // endpointURL = 'https://corsproxy.io/?' + endpointURL ;
    switch (serviceType) {
        case 'Stripe':
            let url = endpointURL.replace(/{(\w+)}/g, (_, key) => data[key] || '');
            for (let [key, value] of Object.entries(requestHeaders)) {
              requestHeaders[key] = value.replace(/{(\w+)}/g, (_, key) => inputData[key] || '');
            }
            response = await fetch(url, {
                method: 'GET',
                headers: requestHeaders,
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
                    'Authorization': `Klaviyo-API-Key ${inputData.api_key}`,
                }
            });
            break;
        case 'DigitalOcean':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                }
            });
            break;
        case 'Honeycomb':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'X-Honeycomb-Team': `${inputData.api_key}`,
                }
            });
            break;
        case 'Eventbrite':
            response = await fetch(endpointURL + `?token=${inputData.token}`, {
                method: requestMethod,
            });
            break;
        case 'SendGrid':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                }
            });
            break;
        case 'MailChimp':
            response = await fetch(endpointURL.replace('<dc>', inputData.dc), {
                method: requestMethod,
                headers: {
                    'Authorization': `Basic ${btoa('anystring:' + inputData.auth_token)}`,
                }
            });
            break;
        case 'Postmark':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Postmark-Server-Token': `${inputData.server_token}`,
                }
            });
            break;
        case 'Telnyx':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                }
            });
            break;
        case 'Pipedrive':
            response = await fetch(endpointURL + `?api_token=${inputData.api_token}`, {
                method: requestMethod,
            });
            break;
        case 'Vercel':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_token}`,
                }
            });
            break;
        case 'Bitly':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_token}`,
                }
            });
            break;
        case 'Algolia':
            response = await fetch(endpointURL.replace('<app_id>', inputData.app_id), {
                method: requestMethod,
                headers: {
                    'X-Algolia-API-Key': `${inputData.api_key}`,
                    'X-Algolia-Application-Id': `${inputData.app_id}`,
                }
            });
            break;
        case 'Posthog':
            response = await fetch(endpointURL.replace('<api_key>', inputData.api_key), {
                method: requestMethod,
            });
            if (response.status === 401) {
                response = await fetch(endpointURL.replace('<api_key>', inputData.api_key).replace('https://app.', 'https://eu.'), {
                    method: requestMethod,
                });
            }
            break;
        case 'Opsgenie':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `GenieKey ${inputData.api_key}`,
                }
            });
            break;
        case 'Helpscout':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': 'Basic ' + btoa(inputData.api_key + ':'),
                }
            });
            break;
        case 'Typeform':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                }
            });
            break;
        case 'GetResponse':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'X-Auth-Token': `api-key ${inputData.api_key}`,
                }
            });
            break;
        case 'YouSign':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                }
            });
            break;
        case 'Notion':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
                    'Notion-Version': '2022-06-28',
                }
            });
            break;
        case 'MadKudu':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Basic ${btoa(inputData.api_key + ':')}`,
                }
            });
            break;
        case 'Autopilot':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'autopilotapikey': `${inputData.api_key}`,
                }
            });
            break;
        case 'Slack':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_token}`,
                }
            });
            break;
        case 'Gitlab':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.access_token}`,
                }
            });
            break;
        case 'BitBucket':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Basic ${btoa(inputData.username + ':' + inputData.password)}`,
                }
            });
            break;
        case 'HuggingFace':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'authorization': `Bearer ${inputData.api_token}`,
                }
            });
            break;
        case 'Shodan':
            response = await fetch(endpointURL.replace('<api_key>', inputData.api_key), {
                method: requestMethod
            });
            break;
        case 'Postman':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'X-Api-Key': `${inputData.api_key}`,
                }
            });
            break;
        case 'Terraform':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_token}`,
                }
            });
            break;
        case 'Doppler':
            response = await fetch(endpointURL, {
                method: requestMethod,
                headers: {
                    'Authorization': `Bearer ${inputData.api_key}`,
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
