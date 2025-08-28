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
        const { title, message, unlockDate } = formData;

        if (!title || !message || mediaFiles.length == 0 || !unlockDate) {
            Swal.fire("All fields are required!", "", "error");
            return;
        }
        setLoading(true);

        try {
            const mediaUrls = await uploadToCloudinary(mediaFiles);
            let coverImg = null;
            if (cover) {
                coverImg = await uploadCoverImage(cover);
            }
            if (!mediaUrls || !coverImg) throw new Error("Upload Failed");

            await addDoc(collection(db, "users", currentUserId, "capsules"), {
                title,
                message,
                coverImage: coverImg,
                media: mediaUrls,
                unlockDate: new Date(unlockDate),
                createdAt: new Date(),
                theme: selectedTheme
            })

            Swal.fire("Capsule Saved Successfully!", "", "success");
            setFormData({
                title: "",
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
            className='bg-white shadow-lg rounded-lg p-6 max-w-screen-lg mx-auto mt-10'
        >
            <h2 className='text-xl font-semibold mb-4 text-center'>Create Time Capsule</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                <div>
                    <label className='block text-sm text-gray-700 mb-1'>Title</label>
                    <input
                        type="text"
                        name='title'
                        placeholder='Capsule Title'
                        value={formData.title}
                        onChange={handleChange}
                        className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                <div>
                    <label className='block text-sm text-gray-700 mb-1'>Unlock date:</label>
                    <input
                        type="date"
                        name="unlockDate"
                        value={formData.unlockDate}
                        onChange={handleChange}
                        className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                <div>
                    <label className='block text-sm text-gray-700 mb-1'>Cover Image(optional)</label>
                    <input
                        type="file"
                        accept='image/*'
                        onChange={handleCoverChange}
                        className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-md'
                    />
                </div>
                <div>
                    <label className='block text-sm text-gray-700 mb-1'>Memories</label>
                    <input
                        type="file"
                        accept='image/*, video/*'
                        multiple
                        onChange={handleFileChange}
                        className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
            </div>


            <div className='mb-4'>
                <label className='block text-sm text-gray-700 mb-1'>Message</label>
                <textarea name="message"
                    placeholder='Write your memory, thoughts or prediction...'
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-md'
                    required
                />
            </div>
            <div className='mb-6'>
                <label className='block text-sm text-gray-700 mb-1'>Capsule Theme</label>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            onClick={() => setSelectedTheme(theme.id)}
                            className={`cursor-pointer rounded-md p-4 border-2 transition-all duration-300 
                            ${theme.className} ${selectedTheme === theme.id ?
                                    "ring-2 ring-indigo-500" :
                                    "opacity-80 hover:opacity-100"}      
                            `}
                        >
                            <p className='font-semibold text-center'>{theme.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button
                type='submit'
                disabled={loading}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
            >
                {loading ? "Saving..." : "Save Capsule"}
            </button>
        </form >
    )
}

export default CreateCapsule