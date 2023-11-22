import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Example from "./Example"
import SearchPackages from "./components/SearchPackages"
import Favorites from "./components/Favorites"


function App() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (favorite) => {
    // Add validation for uniqueness
    setFavorites([...favorites, favorite]);
  };
  const removeFromFavorites = (packageName) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.packageName !== packageName);
    setFavorites(updatedFavorites);
  };
  console.log(favorites)
  return (
    <Routes>
        <Route path="/" element={<SearchPackages addToFavorites={addToFavorites}/>} />
        <Route path="/favorites" element={<Favorites favorites={[]} removeFromFavorites={removeFromFavorites} addToFavorites={addToFavorites}/>} />
    </Routes>
  )
}

export default App
