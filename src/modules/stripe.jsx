import React, { useState } from "react";
import { Button, Spinner, Label, TextInput, ButtonGroup, Dropdown } from 'flowbite-react';
import { Card } from 'flowbite-react';
import OutputWindow from "../components/output_window";
import RequestWindow from "../components/request_window";

export default function Stripe() {
    const [selectedItem, setSelectedItem] = useState("Select Endpoint");
    return (
        /* add some padding and then show h2 text check stripe keys */
        <div className="p-10">
            <h2 className="text-2xl font-semibold dark:text-white">Check Stripe Keys</h2>

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
                    <Dropdown label={selectedItem} >
                        <Dropdown.Item onClick={() => setSelectedItem("Account Metadata")}>Account Metadata</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedItem("Balance")}>Balance</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedItem("Customers")}>Customers</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedItem("Orders")}>Orders</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedItem("Payment Intents")}>Payment Intents</Dropdown.Item>
                    </Dropdown>
                    <Button >Test Endpoint</Button>
                    </div>
                </div>

            </div>
            <RequestWindow />
            <div className="py-10">
                <OutputWindow />
            </div>
        </div>

    );
}