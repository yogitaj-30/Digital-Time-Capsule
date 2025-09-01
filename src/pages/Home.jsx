import React from "react";
import Fireflies from "../components/Fireflies";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { currentUser } = useAuth();

    return (
        <main>
            <section className="relative w-full h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-between px-10 pt-20 overflow-hidden">
                <div className="absolute inset-0 z-10">
                    <Fireflies />
                </div>
                <div className="relative z-20 w-1/2 text-white space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Preserve Your <span className="text-yellow-400">Memories</span><br /> for the Future
                    </h1>

                    <p className="text-lg text-gray-200 mb-8">
                        Create your digital time capsule- lock in your emotions, photos, and videos, and choose the perfect moment to relive them.
                    </p>
                    {currentUser ?
                        <Link to="/create">
                            <button className="px-4 py-2 md:px-6 md:py-3 mt-4 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500">
                                Get Started
                            </button>
                        </Link> :
                        <Link to="/login">
                            <button className="px-4 py-2 md:px-6 md:py-3 mt-4 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500">
                                Get Started
                            </button>
                        </Link>
                    }
                </div>

                <div className="relative z-20 w-1/2 flex justify-center items-center">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/054/310/214/small_2x/glowing-jar-with-warm-fairy-lights-creating-a-cozy-atmosphere-during-an-evening-png.png"
                        alt="Memory 1"
                        className="w-100 h-100  transform"
                    />
                </div>
            </section>
            <Features />
            <Testimonials />
        </main>
    );
};

export default Home;