import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-indigo-100 text-indigo-900 py-10 px-6 mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl font-bold font-mono mb-2">CapMemo</h2>
                    <p className="text-sm text-gray-700">
                        CapMemo helps you preserve your most precious memories in time capsules that unlock in the future.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><Link to="/" className="hover:underline">🏠 Home</Link></li>
                        <li><Link to="/create" className="hover:underline">💊 Create Capsule</Link></li>
                        <li><Link to="/login" className="hover:underline">🔐 Login</Link></li>
                        <li><Link to="/signup" className="hover:underline">📝 Register</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact</h3>
                    <p className="text-sm text-gray-700">Email: support@capmemo.app</p>
                    <p className="text-sm text-gray-700 mt-4">&copy; {new Date().getFullYear()} CapMemo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
