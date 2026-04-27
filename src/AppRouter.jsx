import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import HomeView from "./views/HomeView.jsx";
import ProtectedRoute from "./views/Helpers/ProtectedRoute.jsx";
import LoginView from "./views/LoginView.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/login" element={<LoginView/>}/>
                <Route path="" element={<ProtectedRoute/>}>
                    <Route path="/home" element={<HomeView />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;