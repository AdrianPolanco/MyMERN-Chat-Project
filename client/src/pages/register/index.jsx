import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = async () => {
        console.log(user);
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
                <Link to="/login" className="hover:text-primary">
                    Already have an account? Log In
                </Link>
            </div>
        </div>
    );
}

export default Register;
