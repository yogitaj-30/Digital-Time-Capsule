import React, { useState } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../firebase/auth';

function Navbar() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-black px-6 py-4 flex justify-between items-center z-50 shadow-md">
            <Link to="/" className="text-pink-200 text-3xl drop-shadow-lg font-lucky">
                MemoCap✨
            </Link>

            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-yellow-400 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] text-lg font-semibold font-kode">Home</Link>
                <Link to="/create" className="text-yellow-400 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] text-lg font-semibold font-kode">Create Capsule</Link>
                {
                    !currentUser && <Link to="/login" className="text-yellow-400 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] text-lg font-semibold font-kode">
                        Login
                    </Link>
                }
                {currentUser && <Link to="/dashboard" className="text-yellow-400 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] text-lg font-semibold font-kode">Dashboard</Link>}
                {currentUser && <button onClick={() => {
                    logOut().then(() => navigate("/"))
                }} className="text-yellow-400 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] text-lg font-semibold font-kode">
                    Logout
                </button>}
            </div>

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-yellow-300 focus:outline-none text-2xl"
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white/20 rounded-md backdrop-blur-md flex flex-col items-start space-y-4 py-6 px-6 md:hidden shadow-md">
                    <Link to="/" className="text-sky-400 text-lg transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]  font-semibold font-kode" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/create" className="text-sky-400 text-lg transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]  font-semibold font-kode" onClick={() => setMenuOpen(false)}>Create Capsule</Link>
                    {
                        !currentUser && <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sky-400 text-lg transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]  font-semibold font-kode">
                            Login
                        </Link>
                    }
                    {currentUser && <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sky-400 text-lg transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]  font-semibold font-kode">Dashboard</Link>}
                    {currentUser && <button onClick={() => {
                        logOut().then(() => navigate("/"));
                        setMenuOpen(false)
                    }} className="text-sky-400 text-lg transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]  font-semibold font-kode">
                        Logout
                    </button>}
                </div>
            )}
        </nav>
    )
}

export default Navbar;

