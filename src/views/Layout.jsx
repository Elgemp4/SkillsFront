import React from 'react';
import {Outlet} from "react-router";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-amber-800 text-white"><h1>Test front end</h1></header>
            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;