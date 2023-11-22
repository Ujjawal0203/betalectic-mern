// SearchPackages.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchPackages = ({ addToFavorites }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [favoriteReason, setFavoriteReason] = useState('');

    useEffect(() => {
        const searchPackages = async () => {
            try {
                const response = await axios.get(`https://api.npms.io/v2/search?q=${searchTerm}`);
                setSearchResults(response.data.results);
            } catch (error) {
                console.error('Error searching packages:', error);
            }
        };

        const timeoutId = setTimeout(() => {
            searchPackages();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleAddToFavorites = (packageName, reason) => {
        // Add validation logic here
        addToFavorites({ packageName, reason });

        // Save to local storage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        localStorage.setItem('favorites', JSON.stringify([...storedFavorites, { packageName, reason }]));

        // Show success alert
        alert('Success, your NPM package is stored in favorites!');
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFavoriteReasonChange = (e) => {
        setFavoriteReason(e.target.value);
    };

    const handleSubmit = () => {
        // Handle submit logic here
        console.log('Submit clicked:', favoriteReason);
    };

    return (
        <div className="container mx-auto my-8 p-4 bg-gray-100">
          <h2>Search for NPM packages</h2>
            <input
                className="p-2 border border-gray-300 rounded"
                type="text"
                placeholder="angular"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button
                className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Search
            </button>
            <div className="mt-4 max-h-60 overflow-y-auto">
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.package.name} className="mb-2 p-2 border border-gray-300 rounded">
                            <span className="mr-2">{result.package.name}</span> - {result.package.description}
                            <button
                                className="ml-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
                                onClick={() => handleAddToFavorites(result.package.name, 'My favorite because...')}
                            >
                                Add to Favorites
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <label className="block mb-2" htmlFor="favoriteReason">
                    Why is this your fav?
                </label>
                <textarea
                    id="favoriteReason"
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    value={favoriteReason}
                    onChange={handleFavoriteReasonChange}
                ></textarea>
            </div>

            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default SearchPackages;