import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const getCurrentUser = async () => {
        const response = await GetCurrentUser();

        try {
            if (response.success) {
                setUser(response.Data);
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
            }
        } catch (error) {
            navigate("/login");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getCurrentUser();
        } else {
            navigate("/login");
        }
    }, []);
    return (
        <div>
            <h1>{user?.name}</h1>
            <h1>{user?.email}</h1>
            {children}
        </div>
    );
};

export default ProtectedRoute;
