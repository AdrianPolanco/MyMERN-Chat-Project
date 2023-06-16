import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { toast, ToastContainer } from "react-toastify";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const registerUser = async () => {
        try {
            const response = await RegisterUser(user);

            if (response.success) {
                toast.success(response.message);
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
            toast.error(error.message);
        }
    };

    return (
        <div className="h-screen bg-primary flex items-center justify-center">
            <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96">
                <h1 className="text-2xl uppercase text-primary font-semibold">
                    MyMERN Chat Register
                </h1>
                <hr />
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Enter your name"
                    className="rounded"
                />
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
                    className="bg-primary contained-btn outlined-btn"
                    onClick={registerUser}
                >
                    Register
                </button>
                <ToastContainer />
                <Link to="/login" className="hover:text-primary">
                    Already have an account? Log In
                </Link>
            </div>
        </div>
    );
}

export default Register;
