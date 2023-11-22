// Favorites.js
import React, { useState, useEffect } from 'react';

const Favorites = ({ favorites, removeFromFavorites, addToFavorites }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToFavorites = (packageName, reason) => {
    // Add validation logic here
    addToFavorites({ packageName, reason });
    setShowModal(true);

    // Save favorites to local storage
    localStorage.setItem('favorites', JSON.stringify([...favorites, { packageName, reason }]));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Retrieve favorites from local storage on mount
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    addToFavorites(storedFavorites);
  }, [addToFavorites]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to the favorite NPM packages</h2>

      {favorites.length === 0 ? (
        <div className="text-center">
          <p>You don't have any favs yet, please add.</p>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Add Fav
          </button>
        </div>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.packageName} className="mb-2 p-2 border border-gray-300 rounded">
              <span className="mr-2">{favorite.packageName}</span> - {favorite.reason}
              <button
                className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => removeFromFavorites(favorite.packageName)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-75 p-4 rounded">
            <p className="text-white">Great! You have added a favorite NPM package.</p>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
