import React from 'react'
import { FaLock, FaUnlock, FaUserFriends } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BsCapsule, BsEmojiHeartEyes } from "react-icons/bs";

function Features() {
    return (
        <section className="flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-indigo-200 to-purple-100">
            <h1 className="mb-10 bg-gradient-to-r from-purple-900 via-indigo-900 to-black bg-clip-text text-transparent text-3xl md:text-4xl font-bold">
                Features
            </h1>

            <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <FaUnlock className="text-3xl text-sky-500" />,
                        title: "Set Unlock Date",
                        desc: "Choose a future date to unlock your capsule with a simple calendar picker."

                    },
                    {
                        icon: <BsCapsule className="text-3xl text-sky-500" />,
                        title: "Multiple Time Capsules",
                        desc: "Create and manage several capsules with unique unlock dates."

                    },
                    {
                        icon: <FaLock className="text-3xl text-sky-500" />,
                        title: "Lock Capsules",
                        desc: "Once sealed, capsules can’t be edited—preserving authenticity."

                    },
                    {
                        icon: <FaUserFriends className="text-3xl text-sky-500" />,
                        title: "Future Recipients",
                        desc: "Assign friends or family to receive capsules when they unlock."

                    },
                    {
                        icon: <MdMessage className="text-3xl text-sky-500" />,
                        title: "Secret Messages",
                        desc: "Hide surprise notes that appear only at the unlock date."

                    },
                    {
                        icon: <BsEmojiHeartEyes className="text-3xl text-sky-500" />,
                        title: "Themes & Personalization",
                        desc: "Customize capsules with unique themes, colors, and designs."

                    },
                ].map((feature, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-r from-sky-300 via-emerald-200 to-sky-100 rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-3"
                    >
                        {feature.icon}
                        <h2 className='text-lg font-bold text-gray-800'>{feature.title}</h2>
                        <p className="text-sm text-gray-700">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features