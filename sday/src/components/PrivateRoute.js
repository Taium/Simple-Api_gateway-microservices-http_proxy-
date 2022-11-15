import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({ children, ...rest }) => {
    const auth = localStorage.getItem("userID"); // determine if authorized

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;