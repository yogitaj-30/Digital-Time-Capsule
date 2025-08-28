import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../firebase/auth';

function Navbar() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    return (
        <nav className="bg-indigo-100 px-6 py-4 flex justify-between items-center shadow-sm">
            <Link to="/" className="text-indigo-900 text-3xl font-bold font-mono">
                📷CapMemo
            </Link>

            <div className="flex items-center space-x-6">
                <Link to="/" className="text-indigo-700 text-lg hover:underline">🏠 Home</Link>
                <Link to="/create" className="text-indigo-700 text-lg hover:underline">💊 Create Capsule</Link>
                {
                    !currentUser && <Link to="/login" className="bg-yellow-200 hover:bg-yellow-300 px-4 py-2 rounded-lg font-semibold text-indigo-900">
                        Login
                    </Link>
                }
                {!currentUser && <Link to="/signup" className="bg-yellow-200 hover:bg-yellow-300 px-4 py-2 rounded-lg font-semibold text-indigo-900">
                    Register
                </Link>
                }
                {currentUser && <Link to="/dashboard" className="text-indigo-700 text-lg hover:underline">Dashboard</Link>}
                {currentUser && <button onClick={() => {
                    logOut();
                    navigate("/login")
                }} className="text-indigo-700 text-lg hover:underline"><Link>Logout</Link></button>}
            </div>
        </nav>
    )
}

export default Navbar;
