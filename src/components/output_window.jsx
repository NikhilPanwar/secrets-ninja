import { Card, Button } from 'flowbite-react';
import { FaRegClipboard } from "react-icons/fa";
import JSONPretty from "react-json-pretty";
import 'react-json-pretty/themes/1337.css';

function OutputWindow({ status_code = 200, output_str = '{ "id": "acct_1AQcm4Hm9UpV3KaX", "object": "account", "business_logo": "https://s3.amazonaws.com/stripe-uploads/acct_1AQcm4Hm9UpV3KaXmerchant-icon-1496743778324-villa_carre.jpg", "business_logo_large": null, "business_name": "Villa Eugene", "business_primary_color": "#fefefe", "business_url": "www.villa-eugene.com", "capabilities": { "bancontact_payments": "inactive", "blik_payments": "inactive", "card_payments": "inactive", "eps_payments": "inactive", "giropay_payments": "inactive", "ideal_payments": "inactive", "klarna_payments": "inactive", "link_payments": "inactive", "p24_payments": "inactive", "platform_payments": "inactive", "sepa_debit_payments": "inactive", "sofort_payments": "inactive" }, "charges_enabled": false, "controller": { "type": "account" }, "country": "FR", "debit_negative_balances": true, "default_currency": "eur", "details_submitted": true, "display_name": "Villa-eugene", "email": "abelrafik@orange.fr", "mcc": null, "payout_schedule": { "delay_days": 7, "interval": "daily" }, "payout_statement_descriptor": null, "payouts_enabled": false, "statement_descriptor": "VILLA EUGENE", "statement_descriptor_kana": "", "statement_descriptor_kanji": "", "support_address": { "city": "EPERNAY", "country": "FR", "line1": "84 avenue de Champagne", "line2": null, "postal_code": "51200", "state": "51" }, "support_email": "abelrafik@orange.fr", "support_phone": "33326324476", "support_url": "", "timezone": "Europe/Paris", "type": "standard" }' }) {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output_str).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-lg font-semibold dark:text-white">Response</h2>
        <Button.Group>
          <Button color="gray" size="xs" onClick={copyToClipboard}><FaRegClipboard className="mr-2 h-3 w-3" />Copy</Button>
          <Button color="gray" size="xs">{status_code === 200 ? '🟢' : '🔴'} {status_code}</Button>
        </Button.Group>
      </div>
      <div className="overflow-auto" style={{ maxHeight: '58vh' }}>
        <pre className="text-xs md:text-sm font-mono dark:text-white whitespace-pre-wrap">
          <JSONPretty id="json-pretty" data={output_str}/>
        </pre>
      </div>
    </Card>
  );
}

export default OutputWindow;