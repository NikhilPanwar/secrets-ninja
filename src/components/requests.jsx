/* eslint-disable no-case-declarations */
async function makeUniversalRequest(
  isProxyEnabled,
  serviceType,
  inputData,
  endpointURL,
  requestMethod
) {
  let response, data;
  const proxyURL = import.meta.env.VITE_SECRETS_NINJA_PROXY_ENDPOINT;
  endpointURL = isProxyEnabled
    ? proxyURL + `/fetch/` + endpointURL
    : endpointURL;

  switch (serviceType) {
    case 'Stripe':
      response = await fetch(endpointURL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'Paypal':
      let accessToken;
      const credentials = `${inputData.client_id}:${inputData.client_secret}`;
      const encodedCredentials = btoa(credentials);
      let tokenResponse = await fetch(
        'https://api.paypal.com/v1/oauth2/token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-Language': 'en_US',
            Authorization: `Basic ${encodedCredentials}`,
          },
          body: new URLSearchParams({ grant_type: 'client_credentials' }),
        }
      );
      if (endpointURL !== 'https://api.paypal.com/v1/oauth2/token') {
        const tokenData = await tokenResponse.json();
        accessToken = tokenData.access_token;
        response = await fetch(endpointURL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
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
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'Paystack':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'Github':
      response = await fetch(
        endpointURL
          .replace('<org_name>', inputData.org_name)
          .replace('<package_type>', inputData.package_type)
          .replace('<query>', inputData.query),
        {
          method: requestMethod,
          headers: {
            Authorization: `token ${inputData.access_token}`,
          },
        }
      );
      break;
    case 'LaunchDarkly':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: ` ${inputData.api_key}`,
        },
      });
      break;
    case 'Omnisend':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'X-API-KEY': `${inputData.api_key}`,
        },
      });
      break;
    case 'Telegram':
      response = await fetch(
        endpointURL.replace('<token>', inputData.bot_token),
        {
          method: requestMethod,
        }
      );
      break;
    case 'Clearbit':
      response = await fetch(endpointURL + inputData.email, {
        method: requestMethod,
        headers: {
          Authorization: 'Basic ' + btoa(inputData.api_key + ':'),
        },
      });
      break;
    case 'SendInBlue':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'api-key': `${inputData.api_key}`,
        },
      });
      break;
    case 'Twitter':
      const isTokenEndpoint = endpointURL.includes('oauth2/token');
      const options = isTokenEndpoint
        ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            proxied_data: {
              headers: {
                Authorization:
                  'Basic ' + btoa(`${inputData.api_key}:${inputData.api_secret_key}`),
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              },
            },
            body: 'grant_type=client_credentials',
          }),
        }
        : {
          method: requestMethod,
          headers: {
            Authorization: 'Bearer ' + inputData.access_token,
          },
        };
      response = await fetch(endpointURL, options);
      break;
    case 'RechargePayments':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'X-Recharge-Access-Token': `${inputData.api_key}`,
        },
      });
      break;
    case 'MailerLite':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'X-MailerLite-ApiKey': `${inputData.api_key}`,
        },
      });
      break;
    case 'Trello':
      response = await fetch(
        endpointURL
          .replace('<key>', inputData.key)
          .replace('<token>', inputData.token),
        {
          method: requestMethod,
        }
      );
      break;
    case 'RazorPay':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Basic ${btoa(inputData.key_id + ':' + inputData.key_secret)}`,
        },
      });
      break;
    case 'Twilio':
      response = await fetch(
        endpointURL.replace('<account_sid>', inputData.account_sid),
        {
          method: requestMethod,
          headers: {
            Authorization: `Basic ${btoa(inputData.account_sid + ':' + inputData.auth_token)}`,
          },
        }
      );
      break;
    case 'NpmToken':
      response = await fetch(endpointURL.replace('<org>', inputData.org).replace('<user>', inputData.user), {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.token}`,
        },
      });
      break;
    case 'Mailgun':
      response = await fetch(
        endpointURL.replace('<domain>', inputData.domain),
        {
          method: requestMethod,
          headers: {
            Authorization: `Basic ${btoa('api:' + inputData.api_key)}`,
          },
        }
      );
      break;
    case 'Klaviyo':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Revision: '2023-02-22',
          Authorization: `Klaviyo-API-Key ${inputData.api_key}`,
        },
      });
      break;
    case 'DigitalOcean':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'Honeycomb':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'X-Honeycomb-Team': `${inputData.api_key}`,
        },
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
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'MailChimp':
      response = await fetch(endpointURL.replace('<dc>', inputData.dc), {
        method: requestMethod,
        headers: {
          Authorization: `Basic ${btoa('anystring:' + inputData.api_key)}`,
        },
      });
      break;
    case 'Postmark':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': `${inputData.server_token}`,
        },
      });
      break;
    case 'Telnyx':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'Pipedrive':
      response = await fetch(
        endpointURL + `?api_token=${inputData.api_token}`,
        {
          method: requestMethod,
        }
      );
      break;
    case 'Vercel':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_token}`,
        },
      });
      break;
    case 'Bitly':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_token}`,
        },
      });
      break;
    case 'Algolia':
      response = await fetch(
        endpointURL.replace('<app_id>', inputData.app_id),
        {
          method: requestMethod,
          headers: {
            'X-Algolia-API-Key': `${inputData.api_key}`,
            'X-Algolia-Application-Id': `${inputData.app_id}`,
          },
        }
      );
      break;
    case 'Posthog':
      response = await fetch(
        endpointURL.replace('<api_key>', inputData.api_key),
        {
          method: requestMethod,
        }
      );
      if (response.status === 401) {
        response = await fetch(
          endpointURL
            .replace('<api_key>', inputData.api_key)
            .replace('https://app.', 'https://eu.'),
          {
            method: requestMethod,
          }
        );
      }
      break;
    case 'Opsgenie':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `GenieKey ${inputData.api_key}`,
        },
      });
      break;
    case 'Helpscout':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: 'Basic ' + btoa(inputData.api_key + ':'),
        },
      });
      break;
    case 'Typeform':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'GetResponse':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'X-Auth-Token': `api-key ${inputData.api_key}`,
        },
      });
      break;
    case 'YouSign':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'Notion':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
          'Notion-Version': '2022-06-28',
        },
      });
      break;
    case 'MadKudu':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Basic ${btoa(inputData.api_key + ':')}`,
        },
      });
      break;
    case 'Autopilot':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          autopilotapikey: `${inputData.api_key}`,
        },
      });
      break;
    case 'Slack':
      response = await fetch(endpointURL.replace('<channel_id>', inputData.channel_id), {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_token}`,
        },
      });
      break;
    case 'Gitlab':
      response = await fetch(
        endpointURL
          .replace('<project_id>', inputData.project_id)
          .replace('<user_id>', inputData.user_id),
        {
          method: requestMethod,
          headers: {
            Authorization: `Bearer ${inputData.access_token}`,
          },
        }
      );
      break;
    case 'BitBucket':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Basic ${btoa(inputData.username + ':' + inputData.password)}`,
        },
      });
      break;
    case 'HuggingFace':
      response = await fetch(endpointURL.replace('<org>', inputData.org), {
        method: requestMethod,
        headers: {
          authorization: `Bearer ${inputData.api_token}`,
        },
      });
      break;
    case 'Shodan':
      response = await fetch(
        endpointURL.replace('<api_key>', inputData.api_key),
        {
          method: requestMethod,
        }
      );
      break;
    case 'Postman':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'X-Api-Key': `${inputData.api_key}`,
        },
      });
      break;
    case 'Terraform':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_token}`,
        },
      });
      break;
    case 'Doppler':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'Shopify':
      response = await fetch(
        endpointURL.replace(
          encodeURIComponent('<store_domain>'),
          inputData.store_domain
        ),
        {
          method: requestMethod,
          headers: {
            'X-Shopify-Access-Token': `${inputData.api_key}`,
          },
        }
      );
      break;
    case 'Jfrog':
      response = await fetch(
        endpointURL.replace(encodeURIComponent('<domain>'), inputData.domain),
        {
          method: requestMethod,
          headers: {
            Authorization: `Basic ${btoa(`${inputData.username}:${inputData.password}`)}`,
            'Content-Type': 'application/json',
          },
        }
      );
      break;
    case 'Buildkite':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_key}`,
        },
      });
      break;
    case 'Pulumi':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `token ${inputData.api_key}`,
        },
      });
      break;
    case 'Snyk':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `token ${inputData.api_key}`,
        },
      });
      break;
    case 'EvolutionAPI':
      response = await fetch(
        endpointURL.replace('<instance_url>', inputData.instance_url),
        {
          method: requestMethod,
          headers: {
            apikey: `${inputData.api_key}`,
          },
        }
      );
      break;
    case 'PushBullet':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'Access-Token': `${inputData.api_key}`,
        },
      });
      break;
    case 'SquareAccessToken':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.access_token}`,
        },
      });
      break;
    case 'Sentry':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.auth_token}`,
        },
      });
      break;
    case 'Bitbucket':
      response = await fetch(endpointURL.replace('<org>', inputData.org), {
        method: requestMethod,
        headers: {
          Authorization: `Basic ${btoa(inputData.username + ':' + inputData.password)}`,
        },
      });
      break;
    case 'Jira':
      response = await fetch(endpointURL.replace(encodeURIComponent('<app_domain>'), inputData.app_domain), {
        method: requestMethod,
        headers: {
          Authorization: `Basic ${btoa(inputData.email + ':' + inputData.api_token)}`,
          Accept: 'application/json',
        },
      });
      break;
    case 'Pandadoc':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `API-Key ${inputData.api_key}`,
        },
      });
      break;
    case 'HubSpot':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.access_token}`,
          'Content-Type': 'application/json'
        },
      });
      break;
    case 'AWS':
      response = await fetch(endpointURL.replace('<secrets_ninja_proxy>', proxyURL), {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aws_access_key: inputData.access_key,
          aws_secret_key: inputData.secrets_access_key,
          region: inputData.region,
        }),
      });
      break;
    case 'MongoDB':
      response = await fetch(endpointURL.replace('<secrets_ninja_proxy>', proxyURL), {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mongodb_uri: inputData.mongodb_uri,
          database: inputData.database,
          collection: inputData.collection,
        }),
      });
      break;
    case 'RabbitMQ':
      response = await fetch(endpointURL.replace('<secrets_ninja_proxy>', proxyURL), {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connection_string: inputData.connection_string,
          queue_name: inputData.queue_name,
        }),
      });
      break;
    case 'Postgres':
      response = await fetch(endpointURL.replace('<secrets_ninja_proxy>', proxyURL), {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postgres_uri: inputData.connection_string,
          database: inputData.database,
          table: inputData.table,
        }),
      });
      break;
    case 'Zendesk':
      response = await fetch(endpointURL.replace('<subdomain>', inputData.subdomain), {
        method: requestMethod,
        headers: {
          Authorization: `Basic ${btoa(inputData.email + '/token:' + inputData.api_token)}`,
        },
      });
      break;
    case 'GCP':
      response = await fetch(endpointURL.replace('<secrets_ninja_proxy>', proxyURL), {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gcp_creds: inputData.gcp_creds
        }),
      });
      break;
    case 'NVIDIA':
      response = await fetch(endpointURL, {
        method: 'POST',
        body: JSON.stringify({
          proxied_data: {
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          },
          body: {
            "credentials": inputData.api_key,
          }
        })
      });
      break;
    case 'SonarCloud':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Basic ${btoa(inputData.token + ':')}`,
        },
      });
      break;
    case 'Clerk':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.secret_key}`,
        },
      });
      break;
    case 'Okta':
      response = await fetch(endpointURL.replace('<your_okta_domain>', inputData.your_okta_domain), {
        method: requestMethod,
        headers: {
          Authorization: `SSWS ${inputData.api_token}`
        }
      });
      break;
    case 'CircleCI':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'Circle-Token': inputData.api_key,
        },
      });
      break;
    case 'WeightsAndBiases':
      response = await fetch(endpointURL, {
        method: 'POST',
        body: JSON.stringify({
          proxied_data: {
            method: 'POST',
            headers: {
              Authorization: 'Basic ' + btoa(`api:${inputData.api_key}`),
            },
            body: JSON.stringify({
              query: "query Viewer { viewer { id username email admin } }",
            }),
          },
        }),
      });
      break;
    case 'VirusTotal':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          'x-apikey': `${inputData.api_key}`,
        },
      });
      break;
    case 'Confluent':
      response = await fetch(
        endpointURL.replace(/<api_key>/g, inputData.api_key),
        {
          method: requestMethod,
          headers: {
            Authorization: `Basic ${btoa(inputData.api_key + ':' + inputData.api_secret)}`,
          },
        }
      );
      break;
    case 'Netlify':
      response = await fetch(endpointURL, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${inputData.api_token}`,
        },
      });
      break;
    default:
      return { status: 400, data: { message: 'Unsupported service type' } };
  }

  data = await response.json();
  return { status: response.status, data };
}

export default makeUniversalRequest;
