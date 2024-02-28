import React from "react";
import MainPageTable from "./table";
import { Alert, Button } from 'flowbite-react';

export default function Dashboard({ servicesConfig }) {
    return (
        <div className="px-10 py-10">
            <Alert color="info">
                <span className="font-medium">Found API Keys, Credentials while Pentesting!</span> Test them using Secrets Ninja ...
                <br />
                <span className="font-medium">Note:</span> All the secrets are checked from frontend using your browser. No secrets are sent to our servers.
            </Alert>
            <div>
                <h1 className="text-2xl font-semibold dark:text-white py-10">Supported Keys</h1>
                <div >
                    <MainPageTable servicesConfig={servicesConfig} />
                </div>
            </div>
        </div>
    );
}