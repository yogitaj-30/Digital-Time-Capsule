import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { signUp } from '../firebase/auth'
import { Link } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({ email: "", password: "" })

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (user.email && user.password) {
            try {
                await signUp(user.email, user.password);
                Swal.fire({
                    title: "Verification Email Sent!",
                    text: "Please check your inbox or spam folder to verify your email.",
                    icon: "info"
                });
            } catch (error) {
                Swal.fire({
                    title: "Signup Error",
                    text: error.message,
                    icon: "error"
                });
            }
        } else {
            Swal.fire({
                title: "Please fill all the fields.",
                icon: "error"
            });
        }

        setUser({
            email: "",
            password: "",
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex justify-center items-center min-h-screen bg-gray-100'
        >
            <div
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Sign Up
                </h2>

                <div className='mb-4'>
                    <label className="block mb-2 text-sm text-gray-700">
                        Email:
                    </label>
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
                    <label className="block mb-2 text-sm text-gray-700">
                        Password:
                    </label>
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
                    Sign Up
                </button>
                <p className="text-center text-gray-500 text-sm mt-4">
                    Already have an Account?
                    <Link to="/" className="text-indigo-600 hover:underline">Sign In</Link>
                </p>
            </div>
        </form>

    )
}

export default Register