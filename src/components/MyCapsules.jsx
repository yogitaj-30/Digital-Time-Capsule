import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, orderBy, query, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

function MyCapsules() {
    const { currentUser } = useAuth();
    const [capsules, setCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [capsuleToDelete, setCapsuleToDelete] = useState(null);

    const navigate = useNavigate();

    const fetchCapsules = useCallback(async () => {
        if (!currentUser) return;

        try {
            const capsulesRef = collection(db, "users", currentUser.uid, "capsules");
            const q = query(capsulesRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const capsulesData = querySnapshot.docs.map(doc => {
                const data = doc.data();

                const unlockDate = data.unlockDate?.seconds
                    ? new Date(data.unlockDate.seconds * 1000)
                    : new Date(data.unlockDate);

                return {
                    id: doc.id,
                    ...doc.data(),
                    unlockDate
                };
            });

            setCapsules(capsulesData);
        } catch (error) {
            console.error("Error Fetching Capsules: ", error);
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchCapsules();
    }, [fetchCapsules]);

    const handleUnlock = (capsule) => {
        navigate(`/capsule/${capsule.id}`);
    };

    const onDelete = async (capsuleId) => {
        try {
            const docRef = doc(db, "users", currentUser.uid, "capsules", capsuleId)
            await deleteDoc(docRef);
            console.log("Document successfully deleted!");

            fetchCapsules();
        } catch (error) {
            console.error("Error deleting document: ", error)
        }
    }

    const handleDeleteClick = (capsuleId) => {
        setCapsuleToDelete(capsuleId);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (capsuleToDelete) {
            onDelete(capsuleToDelete);
            setCapsuleToDelete(null);
            setShowConfirm(false);
        }
    };

    const cancelDelete = () => {
        setCapsuleToDelete(null);
        setShowConfirm(false);
    };

    if (loading) return <p className='text-center mt-10'>Loading your capsules...</p>
    if (capsules.length === 0) return <p className='text-center mt-10 font-kode font-bold text-emerald-700'>You haven't created any capsules yet.</p>

    return (
        <div className='max-w-7xl mx-auto px-4 py-10'>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {capsules.map(capsule => {
                    const now = new Date();
                    const unlockDate = new Date(capsule.unlockDate);
                    const isUnlocked = now >= unlockDate;

                    return (
                        <div
                            key={capsule.id}
                            className='bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 border border-indigo-200 
             hover:border-indigo-300 relative overflow-hidden before:absolute before:inset-0 
             before:rounded-xl before:border-2 before:border-indigo-200 before:opacity-0 
             hover:before:opacity-100 before:transition before:duration-300 
             before:shadow-[0_0_20px_rgba(99,102,241,0.6)] before:pointer-events-none'
                        >
                            {capsule.coverImage && (
                                <img
                                    src={capsule.coverImage}
                                    alt="Cover"
                                    className='w-full h-32 object-cover rounded-md mb-3'
                                />
                            )}
                            <h3 className='text-lg font-semibold text-indigo-800 truncate'>
                                {capsule.title}
                            </h3>

                            <button
                                onClick={() => isUnlocked && handleUnlock(capsule)}
                                disabled={!isUnlocked}
                                className={`mt-2 py-1 px-3 font-semibold rounded-lg shadow-lg hover:shadow-2xl
                                    ${isUnlocked
                                        ? "bg-gradient-to-r from-purple-500 via-indigo-300 to-pink-400 text-yellow-200 cursor-pointer"
                                        : "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
                                    }`}
                            >
                                {isUnlocked ? "Open Capsule🪄" : "Locked🔒"}
                            </button>

                            <button
                                onClick={() => isUnlocked && handleDeleteClick(capsule.id)}
                                disabled={!isUnlocked}
                                className={`mt-2 py-1 px-4 ml-3 font-semibold rounded-lg shadow-lg hover:shadow-2xl
                                    ${isUnlocked
                                        ? "bg-red-500 text-white"
                                        : "bg-red-500 text-white opacity-50 cursor-not-allowed"
                                    }`}
                            >
                                Delete
                            </button>

                            <p className='text-xs text-gray-500 mt-2 font-kode'>
                                {isUnlocked ? `Unlocked on:  ${unlockDate.toLocaleDateString()} ` : `Unlocks on: ${unlockDate.toLocaleDateString()}`}
                            </p>
                        </div>
                    );
                })}
            </div>

            {showConfirm && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
                    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                        <p className="text-gray-800 font-medium mb-3">
                            Are you sure you want to delete this capsule?
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Yes
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyCapsules;
