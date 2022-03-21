import React, { useState, useEffect } from 'react';

import Recipe from './components/Recipe';

import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import './components/Navbar.css';
import './App.css';
import './components/Display.css';
import Favorites from './Favorites';


function App() {

  let navigate = useNavigate();

  const [ingredient, setIngredient] = useState('none');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const key = 'a5cc238333cee8ed7741a1302e34865a';
  const id = '4b353692';

  useEffect(() => {
    //localStorage.clear();
    getFav();
    
  }, [])

  const getFav = () => {
    const fav = JSON.parse(localStorage.getItem('recipe-favorites'));
    console.log(fav);
    if (fav != null) {
      setFavorites(fav);
      console.log('Il ya des favoris');
    } else {
      setFavorites([]);
      console.log('Il ya pas de favoris');
    }
  }

  const addFavorite = (recipe) => {

    let array = favorites;

    if (!array.some((r) => r.recipe.label == recipe.recipe.label)) {
      array.push(recipe);
      const favString = JSON.stringify(array);
      localStorage.setItem('recipe-favorites', favString);
      setFavorites(array);
    } else {
      console.log(array);
      console.log("suppression")
      array = array.filter(r => r.recipe.label != recipe.recipe.label);
      console.log(array);
      
      const favString = JSON.stringify(array);
      localStorage.setItem('recipe-favorites', favString);
      setFavorites(array);
    }
    getFav();
  }

  const getRecipe = async (e) => {
    navigate('/');
    e.preventDefault();
    console.log(ingredient);
    const response = await fetch(`https://api.edamam.com/search?q=${ingredient}&app_id=${id}&app_key=${key}`);
    const data = await response.json();
    const hits = data.hits;
    setRecipes(hits);
    console.log(hits);
  }

  const changeIngredient = (e) => {
    setIngredient(e.target.value);
  }

  return (

    <div className="App">
      <nav>
        <div className="nav-container">
          <form id='search-form' onSubmit={getRecipe}>
            <input type="text" onChange={changeIngredient}></input>
            <button className="search-btn" onClick={getRecipe}>Search</button>
          </form>
          <Link to='/favorites' className='fav-btn'>Favourites</Link>
        </div>
      </nav>


      <Routes>
        <Route exact path="/" element={<Home recipes={recipes} favorites={favorites} addFavorite={addFavorite} />} />
        <Route exact path="/favorites" element={<Favorites fav={favorites} recipes={recipes} addFavorite={addFavorite} />} />
      </Routes>


    </div>
  );
}


const Home = ({ recipes, addFavorite, favorites }) => {


  return (
    <main>
      <div className='disp-container'>
        {recipes.map((recipe, index) => {
          
          const isFav = favorites.some(r => r.recipe.label == recipe.recipe.label);

          return <Recipe recipe={recipe} key={index} fav={isFav} addFavorite={() => addFavorite(recipe)} />
        })}
      </div>
    </main>
  )

}

export default App;
