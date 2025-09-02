import React, { useState } from 'react'
import { uploadCoverImage, uploadToCloudinary } from '../utils/uploadToCloudinary';
import Swal from 'sweetalert2';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { themes } from '../utils/themes';

function CreateCapsule() {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState("");
    const [cover, setCover] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        prediction: "",
        unlockDate: ""
    })

    const { currentUser } = useAuth();
    const currentUserId = currentUser?.uid

    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setMediaFiles([...e.target.files])
    }

    const handleCoverChange = (e) => {
        setCover(e.target.files[0]);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, message, prediction, unlockDate } = formData;

        if (!title || !message || mediaFiles.length == 0 || !unlockDate) {
            Swal.fire("All fields are required!", "", "error");
            return;
        }
        setLoading(true);

        try {
            const mediaUrls = await uploadToCloudinary(mediaFiles);
            console.log(mediaUrls);
            let coverImg = null;
            if (cover) {
                coverImg = await uploadCoverImage(cover);
            }
            if (!mediaUrls || !coverImg) throw new Error("Upload Failed");

            await addDoc(collection(db, "users", currentUserId, "capsules"), {
                title,
                message,
                prediction,
                coverImage: coverImg,
                media: mediaUrls,
                unlockDate: new Date(unlockDate),
                createdAt: new Date(),
                theme: selectedTheme
            })

            Swal.fire("Capsule Saved Successfully!", "", "success");
            setFormData({
                title: "",
                prediction: "",
                message: "",
                unlockDate: ""
            })
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="relative bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 shadow-xl rounded-2xl p-8 max-w-screen-lg mx-auto mt-20 backdrop-blur-lg border border-white/40"
        >
            <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-md">
                Create Time Capsule ✨
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Title<span className='text-red-600'>*</span></label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Capsule Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Unlock Date<span className='text-red-600'>*</span></label>
                    <input
                        type="date"
                        name="unlockDate"
                        value={formData.unlockDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Cover Image<span className='text-red-600'>*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-200 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Memories<span className='text-red-600'>*</span></label>
                    <input
                        type="file"
                        accept="image/*, video/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-200 file:text-pink-700 hover:file:bg-pink-100"
                        required
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Message<span className='text-red-600'>*</span></label>
                <textarea
                    name="message"
                    placeholder="Write your memory, thoughts or prediction..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Prediction</label>
                <textarea
                    name="prediction"
                    placeholder="Write your memory, thoughts or prediction..."
                    value={formData.prediction}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
            </div>

            <div className="mb-8">
                <label className="block text-lg font-medium text-gray-700 mb-4">Capsule Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            onClick={() => setSelectedTheme(theme.id)}
                            className={`cursor-pointer rounded-xl p-5 border-2 transition-all duration-300 transform hover:scale-105 ${theme.className} ${selectedTheme === theme.id
                                ? "ring-4 ring-purple-400 shadow-lg"
                                : "opacity-80 hover:opacity-100"
                                }`}
                        >
                            <p className="font-semibold text-center drop-shadow-md">
                                {theme.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {loading && <p className='text-orange-500 font-semibold text-center pb-4'>Saving the capsule might take 2-3 minutes.</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
            >
                {loading ? "Saving..." : "Save Capsule"}
            </button>
        </form>
    )
}

export default CreateCapsule