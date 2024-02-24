import React, { useState } from "react";
import { Button, Dropdown, Label, TextInput } from 'flowbite-react';
import OutputWindow from "../components/output_window";
import RequestWindow from "../components/request_window";
import servicesConfig from '../data/detectors copy.json'; // Import your JSON configuration

export default function UniversalComponent({ serviceType }) {
    const [selectedEndpoint, setSelectedEndpoint] = useState("Select Endpoint");
    const [curlCommand, setCurlCommand] = useState("");
    const [requestURL, setRequestURL] = useState("");
    const [requestMethod, setRequestMethod] = useState("");

    const serviceConfig = servicesConfig[serviceType] || {};
    const endpoints = serviceConfig.endpoints || {};

    const handleDropdownChange = (endpointKey) => {
        const endpointConfig = endpoints[endpointKey];
        setSelectedEndpoint(endpointConfig.label);
        setCurlCommand(endpointConfig.curl);
        setRequestURL(endpointConfig.request_url);
        setRequestMethod(endpointConfig.request_method);
    };

    return (
        <div className="p-10">
            <h2 className="text-2xl font-semibold dark:text-white">Check {serviceType} Keys</h2>
            <div className="py-10 flex w-full flex-col gap-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="secret" value="Enter API Key" />
                    </div>
                    <TextInput id="secret" type="text" placeholder="sk_live_xxxx" required />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="secret" value="Select Endpoint" />
                    <div className="flex gap-2">
                        <Dropdown label={selectedEndpoint}>
                            {Object.keys(endpoints).map((key) => (
                                <Dropdown.Item key={key} onClick={() => handleDropdownChange(key)}>
                                    {endpoints[key].label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                        <Button>Test Endpoint</Button>
                    </div>
                </div>
            </div>
            <RequestWindow curl={curlCommand} url={requestURL} method={requestMethod} />
            <div className="py-10">
                <OutputWindow />
            </div>
        </div>
    );
}
