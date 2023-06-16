import React, { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const getCurrentUser = async () => {
        const response = await GetCurrentUser();
        try {
            if (response.success) {
                return true;
            } else {
                navigate("/login");

                return false;
            }
        } catch (error) {
            navigate("/login");
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getCurrentUser();
        }
    }, []);
    return <div>{children}</div>;
};

export default ProtectedRoute;
