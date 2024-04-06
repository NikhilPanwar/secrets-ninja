import React from "react";
import MainPageTable from "./table";
import { Alert, Button } from 'flowbite-react';

export default function Dashboard({ servicesConfig }) {
    return (
        <div className="px-10 py-10">
            <Alert color="info">
                <ul className="list-disc list-inside">
                    <li>
                        <span className="font-medium">Found API Keys, Credentials while Pentesting!</span> Test them using Secrets Ninja ...
                    </li>
                    <li>
                        <span className="font-medium">Note:</span> This webapp checks secrets from frontend using JS in your browser.
                    </li>
                    <li>
                        <span className="font-medium">Source Code :</span> https://github.com/NikhilPanwar/secrets-ninja
                    </li>
                </ul>
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