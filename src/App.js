import React, { useState, useEffect } from 'react';

import Recipe from './components/Recipe';

import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

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



  }, [])

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
              <button className="search-btn" onClick={getRecipe}>Rechercher</button>
            </form>
            <Link to='/favorites'>FAVORITES</Link>
          </div>
        </nav>


        <Routes>
          <Route exact path="/" element={<Home recipes={recipes} />} />
          <Route exact path="/favorites" element={<Favorites />} />
        </Routes>


      </div>
  );
}


const Home = ({ recipes }) => {
  return (
    <main>
      <div className='disp-container'>
        {recipes.map((recipe, index) => (
          <Recipe recipe={recipe} key={index}/>
        ))}
      </div>
    </main>
  )
}

export default App;
