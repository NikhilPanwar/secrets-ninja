import React from "react";
import MainPageTable from "./table";

export default function Dashboard() {
    return (
        <div>
        <h1 className="text-2xl font-semibold dark:text-white p-10">Supported Keys</h1>
        <div className="px-10">
            <MainPageTable />
        </div>
        </div>
    );
    }