import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-black px-6 py-8 mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start md:items-center text-left">

                <div>
                    <h2 className="text-2xl font-lucky mb-2 text-pink-200">MemoCap✨</h2>
                    <p className="text-md text-yellow-100 font-josefin">
                        MemoCap helps you preserve your most precious memories in time capsules that unlock in the future.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-sky-300 font-kode">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><Link to="/" className="text-yellow-100 font-josefin">Home</Link></li>
                        <li><Link to="/create" className="text-yellow-100 font-josefin">Create Capsule</Link></li>
                        <li><Link to="/login" className="text-yellow-100 font-josefin">Login</Link></li>
                        <li><Link to="/signup" className="text-yellow-100 font-josefin">Register</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-sky-300 font-kode">Contact</h3>
                    <p className="text-sm text-yellow-100 font-josefin">Email: support@capmemo.app</p>
                    <p className="text-sm text-yellow-100 font-josefin">&copy; {new Date().getFullYear()} CapMemo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
