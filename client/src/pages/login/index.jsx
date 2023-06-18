import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { HideLoader, ShowLoader } from "../../redux/loaderSlice";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const loginUser = async () => {
        try {
            dispatch(ShowLoader());
            const response = await LoginUser(user);
            dispatch(HideLoader());
            if (response.success) {
                toast.success(response.message, {
                    position: toast.POSITION.TOP_CENTER,
                    delay: 0,
                });
                localStorage.setItem("token", response.Data);
                window.location.href = "/";
            } else {
                if (!toast.isActive(toast.toastId)) {
                    toast.error(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: "IncorrectPassword",
                        delay: 0,
                    });
                }
            }
        } catch (error) {
            if (!toast.isActive(toast.toastId)) {
                toast.error(response.message, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: "ErrorNotification",
                    delay: 0,
                });
            }
        }
    };

    return (
        <div className="h-screen bg-secondary flex items-center justify-center">
            <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96">
                <h1 className="text-2xl uppercase text-secondary font-semibold">
                    MyMERN Chat Login
                </h1>
                <hr />

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    className="rounded"
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    className="rounded"
                />

                <button
                    className="bg-secondary contained-btn outlined-btn"
                    onClick={loginUser}
                >
                    Log In
                </button>
                <ToastContainer />

                <Link to="/register" className="hover:text-secondary">
                    Do not have an account? Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;
