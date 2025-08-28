import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { resetPassword, signIn } from '../firebase/auth'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({ email: "", password: "", })
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (user.email && user.password) {
            try {
                const result = await signIn(user.email, user.password);
                if (result) {
                    Swal.fire({
                        title: "Login Successful!",
                        icon: "success"
                    });
                    navigate('/dashboard');
                } else {
                    Swal.fire({
                        title: "Please verify your email before logging in.",
                        icon: "error"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Login failed!",
                    text: error.message,
                    icon: "error"
                });
                navigate('/signup')
            }
        } else {
            Swal.fire({
                title: "Please fill in all fields.",
                icon: "error"
            })
        }

        setUser({
            email: "",
            password: "",
        })
    }

    return (
        <div className="bg-pink-500 w-full">
            <form
                onSubmit={handleSubmit}
                className='flex justify-center items-center min-h-screen bg-gray-100'
            >
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Login
                    </h2>

                    <div className='mb-4'>
                        <label className="block mb-2 text-sm text-gray-700"> Email: </label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label className="block mb-2 text-sm text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition duration-300"
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
                    >
                        Login
                    </button>
                    <div className='flex justify-between'>
                        <p className=" text-gray-500 text-xs mt-4">
                            Don't have an Account?
                            <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
                        </p>
                        <button className='text-xs' onClick={() => {
                            const email = prompt("Enter your email to receive a reset link:");
                            if (email) {
                                resetPassword(email)
                                Swal.fire("Password Reset Email sent");
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    icon: "error"
                                });
                            }
                        }}>
                            Forgot Password?
                        </button>
                    </div>

                </div>
            </form></div>

    )
}

export default Login
