import {Navigate, Outlet} from "react-router";

const ProtectedRoute = () => {
    return (localStorage.getItem("token") != undefined ? <Outlet /> : <Navigate to="/login"/>);
};

export default ProtectedRoute;