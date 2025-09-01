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
            className="flex justify-center items-center min-h-screen 
                       bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,182,193,0.3),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(173,216,230,0.3),transparent_50%)]"></div>

            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
                <h2 className="text-3xl font-bold text-center text-pink-200 drop-shadow-lg mb-6 font-josefin">
                    🌙 Create Account
                </h2>

                <div className="mb-4">
                    <label className="block mb-2 text-sm text-purple-200 font-light">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="w-full px-4 py-2 bg-white/20 text-white placeholder-purple-200
                                   border border-purple-400/40 rounded-md 
                                   focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-300
                                   transition-all duration-300"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm text-purple-200 font-light">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className="w-full px-4 py-2 bg-white/20 text-white placeholder-purple-200
                                   border border-purple-400/40 rounded-md 
                                   focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-300
                                   transition-all duration-300"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 
                               bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                               text-white font-bold rounded-md shadow-lg
                               hover:shadow-pink-400/50 hover:scale-[1.02]
                               transition-all duration-300"
                >
                    Sign Up
                </button>

                <p className="text-center text-gray-300 text-sm mt-4">
                    Already have an Account?{" "}
                    <Link to="/login" className="text-pink-300 hover:underline">Sign In</Link>
                </p>
            </div>
        </form>
    )
}

export default Register
