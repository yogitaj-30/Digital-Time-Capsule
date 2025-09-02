import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { themes } from '../utils/themes';

function CapsuleDetails() {
  const { currentUser } = useAuth();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchCapsule = async () => {
    if (!currentUser) return;
    try {
      const capsuleRef = doc(db, "users", currentUser.uid, "capsules", id);
      const capsuleSnap = await getDoc(capsuleRef);

      if (capsuleSnap.exists()) {
        setCapsule({ id: capsuleSnap.id, ...capsuleSnap.data() });
      } else {
        console.error("No such capsule!");
      }
    } catch (error) {
      console.error("Error Fetching Capsule: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapsule();
  }, []);

  if (loading) return <p className='text-center mt-10'>Loading your capsule...</p>;
  if (!capsule) return <p className='text-center mt-10'>Capsule not found.</p>;

  const theme = themes.find(t => t.id === capsule.theme);

  return (
    <div className={`min-h-screen p-6 ${theme?.className || ""}`}>
      <div className="max-w-3xl mt-10 mx-auto bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">

        {capsule.coverImage && (
          <img
            src={capsule.coverImage}
            alt="Cover"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-4">{capsule.title}</h1>

        <p className="text-lg mb-4">{capsule.message}</p>

        {capsule.prediction && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Prediction🔮</h2>
            <p>{capsule.prediction}</p>
          </div>
        )}

        {capsule.media && capsule.media.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Memories</h2>
            <div className="grid grid-cols-2 gap-4">
              {capsule.media.map((url, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow">
                  {url.match(/\.(mp4|webm|ogg)$/) ? (
                    <video src={url} controls className="w-full h-48 object-cover" />
                  ) : (
                    <img src={url} alt={`media-${index}`} className="w-full h-48 object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default CapsuleDetails;
