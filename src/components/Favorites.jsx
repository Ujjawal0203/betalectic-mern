// Favorites.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Favorites = ({ favorites, removeFromFavorites, addToFavorites }) => {
  const navigate = useNavigate();

  const handleViewPackage = (packageName) => {
    // Implement logic to show the modal or navigate to a details page
    console.log('Viewing package:', packageName);
  };

  const handleEditPackage = (packageName) => {
    // Implement logic to edit the package
    console.log('Editing package:', packageName);
  };

  const handleDeletePackage = (packageName) => {
    // Implement logic to delete the package
    removeFromFavorites(packageName);
  };

  useEffect(() => {
    // Retrieve favorites from local storage on mount
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    addToFavorites(storedFavorites);
  }, [addToFavorites]);

  return (
    <div className="text-center mx-auto my-8 p-4 bg-gray-100" >
      <h1 className="text-2xl font-bold mb-4 mt-10">Welcome to Favorite NPM packages</h1>

      {favorites.length === 0 ? (
        <div className="mb-8">
          <p>You don't have any favs yet, please add.</p>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => navigate('/favorites')}
          >
            Add Fav
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Package Name</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite) => (
                <tr key={favorite.packageName} className="border-b border-gray-300">
                  <td className="p-2">{favorite.packageName}</td>
                  <td className="p-2">
                    <button
                      className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-700"
                      onClick={() => handleViewPackage(favorite.packageName)}
                    >
                      View
                    </button>
                    <button
                      className="mr-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={() => handleEditPackage(favorite.packageName)}
                    >
                      Edit
                    </button>
                    <button
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => handleDeletePackage(favorite.packageName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Favorites;