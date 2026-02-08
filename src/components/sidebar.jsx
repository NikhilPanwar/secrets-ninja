'use client';

import { Sidebar } from 'flowbite-react';
import { LiaStripeS } from 'react-icons/lia';
import { RiOpenaiFill } from 'react-icons/ri';
import { HiOutlineRocketLaunch } from 'react-icons/hi2';
import { SlPaypal } from 'react-icons/sl';
import { FaGithub, FaShopify, FaTelegramPlane } from 'react-icons/fa';
import { CiCircleInfo } from 'react-icons/ci';
import { SiBrevo } from "react-icons/si";
import { FaTrello } from 'react-icons/fa';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { SiRazorpay } from 'react-icons/si';
import { SiTwilio } from 'react-icons/si';
import { RiNpmjsLine } from 'react-icons/ri';
import { SiMailgun } from 'react-icons/si';
import { FaDigitalOcean } from 'react-icons/fa';
import { GiHoneycomb } from 'react-icons/gi';
import { SiEventbrite } from 'react-icons/si';
import { FaMailchimp } from 'react-icons/fa';
import { TbSquareLetterP } from 'react-icons/tb';
import { SiRavelry } from 'react-icons/si';
import { GrTextAlignFull } from 'react-icons/gr';
import { RiFlag2Line } from 'react-icons/ri';
import { TbCircleLetterP } from 'react-icons/tb';
import { IoLogoVercel } from 'react-icons/io5';
import { SiBitly } from 'react-icons/si';
import { SiAlgolia } from 'react-icons/si';
import { SiPosthog } from 'react-icons/si';
import { SiOpsgenie } from 'react-icons/si';
import { SiHelpscout } from 'react-icons/si';
import { SiTypeform } from 'react-icons/si';
import { SiNotion } from 'react-icons/si';
import { FaSlack } from 'react-icons/fa';
import { FaSquareGitlab } from 'react-icons/fa6';
import { SiPostman } from 'react-icons/si';
import { SiTerraform } from 'react-icons/si';
import { SiJfrog } from 'react-icons/si';
import { SiBuildkite } from 'react-icons/si';
import { SiPulumi } from 'react-icons/si';
import { SiSnyk } from 'react-icons/si';
import { CgSquare } from 'react-icons/cg';
import { SiSentry } from "react-icons/si";
import { FaBitbucket } from "react-icons/fa";
import { SiJira } from "react-icons/si";
import { SiHuggingface } from "react-icons/si";
import { SiSendgrid } from "react-icons/si";
import { FaHubspot } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiRabbitmq } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiZendesk } from "react-icons/si";
import { SiGooglecloud } from "react-icons/si";
import { BsNvidia } from "react-icons/bs";
import { SiSonar } from "react-icons/si";
import { SiClerk } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { SiOkta } from "react-icons/si";
import { SiCircleci } from "react-icons/si";
import { SiWeightsandbiases } from "react-icons/si";
import { SiVirustotal } from "react-icons/si";
import { SiApachekafka } from "react-icons/si";
import { SiNetlify } from "react-icons/si";
import { useRef, useEffect } from 'react';
import { useMatch } from 'react-router-dom';


function SB({ visible, servicesConfig }) {
  // Accept visible as a prop
  if (!visible) return null; // Do not render if not visible

  let serviceIcons = {
    Stripe: LiaStripeS,
    Paypal: SlPaypal,
    OpenAI: RiOpenaiFill,
    LaunchDarkly: HiOutlineRocketLaunch,
    Github: FaGithub,
    Shopify: FaShopify,
    Telegram: FaTelegramPlane,
    SendInBlue: SiBrevo,
    Trello: FaTrello,
    RazorPay: SiRazorpay,
    Twilio: SiTwilio,
    NpmToken: RiNpmjsLine,
    Mailgun: SiMailgun,
    DigitalOcean: FaDigitalOcean,
    Honeycomb: GiHoneycomb,
    Eventbrite: SiEventbrite,
    MailChimp: FaMailchimp,
    Postmark: TbSquareLetterP,
    RechargePayments: SiRavelry,
    Paystack: GrTextAlignFull,
    Klaviyo: RiFlag2Line,
    Pipedrive: TbCircleLetterP,
    Vercel: IoLogoVercel,
    Bitly: SiBitly,
    Algolia: SiAlgolia,
    Posthog: SiPosthog,
    Opsgenie: SiOpsgenie,
    Helpscout: SiHelpscout,
    Typeform: SiTypeform,
    Notion: SiNotion,
    Slack: FaSlack,
    Gitlab: FaSquareGitlab,
    Postman: SiPostman,
    Terraform: SiTerraform,
    Jfrog: SiJfrog,
    Buildkite: SiBuildkite,
    Pulumi: SiPulumi,
    Snyk: SiSnyk,
    SquareAccessToken: CgSquare,
    Sentry: SiSentry,
    Bitbucket: FaBitbucket,
    Jira: SiJira,
    HuggingFace: SiHuggingface,
    SendGrid: SiSendgrid,
    HubSpot: FaHubspot,
    AWS: FaAws,
    MongoDB: SiMongodb,
    RabbitMQ: SiRabbitmq,
    Postgres: BiLogoPostgresql,
    Zendesk: SiZendesk,
    GCP: SiGooglecloud,
    NVIDIA: BsNvidia,
    SonarCloud: SiSonar,
    Clerk: SiClerk,
    Twitter: FaXTwitter,
    Okta: SiOkta,
    CircleCI: SiCircleci,
    WeightsAndBiases: SiWeightsandbiases,
    VirusTotal: SiVirustotal,
    Confluent: SiApachekafka,
    Netlify: SiNetlify
  };

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Modules
          </h2>
          {/* <Sidebar.Item href="/" icon={CiCircleInfo}>
            About
          </Sidebar.Item> */}
          {Object.keys(servicesConfig).map((service) => {
            const path = `/${service.toLowerCase()}`;
            const isActive = useMatch(path);
            const itemRef = useRef(null);

            useEffect(() => {
              if (isActive && itemRef.current) {
                itemRef.current.scrollIntoView({ block: 'center' });
              }
            }, [isActive]);

            return (
              <div key={service} ref={itemRef}>
                <Sidebar.Item
                  href={path}
                  icon={serviceIcons[service] || IoMdArrowDroprightCircle}
                  active={isActive}
                  className={isActive ? 'font-bold' : ''}
                >
                  {service}
                </Sidebar.Item>
              </div>
            );
          })}

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SB;
