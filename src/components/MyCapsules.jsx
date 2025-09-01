import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

function MyCapsules() {
    const { currentUser } = useAuth();
    const [capsules, setCapsules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCapsules = async () => {
            if (!currentUser) return;

            try {
                const capsulesRef = collection(db, "users", currentUser.uid, "capsules");
                const q = query(capsulesRef, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const capsulesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCapsules(capsulesData);
            } catch (error) {
                console.error("Error Fetching Capsules: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCapsules();
    }, [currentUser]);

    if (loading) return <p className='text-center mt-10'>Loading your capsules...</p>
    if (capsules.length === 0) return <p className='text-center mt-10 font-kode font-bold text-emerald-700'>You haven't created any capsules yet.</p>

    return (
        <div className='max-w-7xl mx-auto px-4 py-10'>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {capsules.map(capsule => (
                    <div
                        key={capsule.id}
                        className='bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 border border-gray-100'
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

                        <p className='text-sm text-gray-600 line-clamp-2 mb-2'>
                            {capsule.message}
                        </p>

                        <p className='text-xs text-gray-500 mt-auto'>
                            Unlocks on:{" "}
                            {new Date(capsule.unlockDate.seconds * 1000).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyCapsules;
