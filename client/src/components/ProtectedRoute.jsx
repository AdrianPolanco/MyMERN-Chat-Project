import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoader, HideLoader } from "../redux/loaderSlice";
import userSlice, { SetUser } from "../redux/userSlice";
import gradiente from "../stylesheets/gradiente.css?inline";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoader());
            const response = await GetCurrentUser();
            dispatch(HideLoader());
            if (response.success) {
                dispatch(SetUser(response.Data));
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
        <div className="h-screen w-screen">
            <header className="flex justify-between p-5 bg-gray-50">
                <div className="flex justify-between gap-1">
                    <i class="ri-chat-1-line text-2xl texto-con-gradiente"></i>
                    <h1 className="text-black text-2xl font-semibold texto-con-gradiente">
                        DevChat
                    </h1>
                </div>
                <div className="flex justify-between gap-2">
                    <i class="ri-shield-user-fill texto-con-gradiente"></i>
                    <h1 className="text-black text-base font-semibold underline-offset-2 hover:text-lg texto-con-gradiente cursor-pointer">
                        {user?.name}
                    </h1>
                </div>
            </header>
            <div className="p-5">{children}</div>
        </div>
    );
};

export default ProtectedRoute;
