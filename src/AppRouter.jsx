import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import HomeView from "./views/HomeView.jsx";
import Layout from "./views/Layout.jsx";
import HelpView from "./views/HelpView.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Navigate to="/home"/>}/>
                    <Route path="/home" element={<HomeView/>}/>
                    <Route path="/help" element={<HelpView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;