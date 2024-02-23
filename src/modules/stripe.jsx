import React from "react";
import { Button, Spinner, Label, TextInput } from 'flowbite-react';
import { Card } from 'flowbite-react';
import OutputWindow from "../components/output_window";

export default function Stripe() {
    return (
        /* add some padding and then show h2 text check stripe keys */
        <div className="p-10">
            <h2 className="text-2xl font-semibold dark:text-white">Check Stripe Keys</h2>

            <div className="py-10">
            <form className="flex w-full flex-col gap-4">
    <div className="w-full">
        <div className="mb-2 block">
            <Label htmlFor="secret" value="Enter API Key" />
        </div>
        <TextInput id="secret" type="text" placeholder="sk_live_xxxx" required />
    </div>
    <Button type="submit" className="w-full">Get Balance</Button>
</form>
            </div>
                <OutputWindow />
        </div>

    );
}