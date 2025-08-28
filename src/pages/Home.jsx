import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

function Home() {
    const { currentUser } = useAuth();

    return (
        <section className="min-h-screen bg-[#fdf6f0] grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-20">
            <div className="flex flex-col justify-center items-start text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-6 leading-tight font-serif">
                    Preserve Your Memories<br /> for the Future
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-md">
                    Create your digital time capsule—lock in your emotions, photos, and videos, and choose the perfect moment to relive them.
                </p>
                {currentUser ?
                    <Link to="/create">
                        <button className="bg-yellow-400 hover:bg-yellow-200 text-violet-700 font-semibold px-6 py-3 rounded-full shadow transition duration-300">
                            Get Started
                        </button>
                    </Link> :
                    <Link to="/login">
                        <button className="bg-yellow-400 hover:bg-yellow-200 text-violet-700 font-semibold px-6 py-3 rounded-full shadow transition duration-300">
                            Get Started
                        </button>
                    </Link>}
            </div>

            <div className="relative flex justify-center items-center gap-4 flex-wrap">
                <img
                    src="https://images.unsplash.com/photo-1598623549917-a38dc6cd19b5?q=80&w=600"
                    alt="Memory 1"
                    className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-pink-100 transform rotate-[-2deg]"
                />
                <img
                    src="https://plus.unsplash.com/premium_photo-1696592053072-2eef6e4ce864?q=80&w=600"
                    alt="Memory 2"
                    className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-blue-100 transform rotate-3"
                />
            </div>
        </section>
    )
}

export default Home;
