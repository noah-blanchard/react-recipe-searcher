import React, { useState } from 'react'
import './Recipe.css';


function Recipe({ recipe, index, addFavorite, fav }) {

  const [buttonText, setButtonText] = useState('More');
  const [buttonState, setButtonState] = useState(false);
  const [listStyle, setListStyle] = useState('none');
  const ingredients = recipe.recipe.ingredientLines;

  const buttonClicked = () => {
    if (buttonState) {
      setButtonState(false);
      setButtonText('More');
      setListStyle('none');
    } else {
      setButtonState(true);
      setButtonText('Less');
      setListStyle('inline');
    }
  }


  return (
    <>
      <div className="recipe-container" key={index}>
        <h1>
          {recipe.recipe.label}
        </h1>
        <img src={recipe.recipe.image} alt='Recipe'></img>

        <ul style={{ display: listStyle }}>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h3>
          <a href={recipe.recipe.url}>Link to the full recipe</a>
        </h3>

        <button className='voir-plus' onClick={buttonClicked}>
          {buttonText}
        </button>
        <button className='voir-plus' onClick={addFavorite}>
          {
            fav ? "Remove from favourites" : "Add to favourites"
          }
        </button>
      </div>

    </>
  )
}

export default Recipe;
