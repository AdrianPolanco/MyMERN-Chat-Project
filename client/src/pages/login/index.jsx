import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const loginUser = async () => {
        console.log(user);
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
                <Link to="/register" className="hover:text-secondary">
                    Already have an account? Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;
