import React, { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const getCurrentUser = async () => {
        const response = await GetCurrentUser();
        try {
            if (response.success) {
                //children.props.username = response.Data.email;
                return true;
            } else {
                if (!toast.isActive(toast.toastId)) {
                    toast.error(
                        response.message.charAt(0).toUpperCase() +
                            response.message.slice(1),
                        {
                            position: toast.POSITION.TOP_CENTER,
                            toastId: "TokenError",
                            delay: 0,
                        }
                    );
                }
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
