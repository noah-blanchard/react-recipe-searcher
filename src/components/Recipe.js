import React, {useState} from 'react'
import './Recipe.css';


function Recipe({recipe}) {

  const [buttonText, setButtonText] = useState('More');
  const [buttonState, setButtonState] = useState(false);
  const [listStyle, setListStyle] = useState('none');
  const ingredients = recipe.recipe.ingredientLines;

  const buttonClicked = () => {
    if(buttonState){
      setButtonState(false);
      setButtonText('More');
      setListStyle('none');
    }else{
      setButtonState(true);
      setButtonText('Less');
      setListStyle('inline');
    }
  }

    return (
        <>
          <div className="recipe-container">
            <h1>
              {recipe.recipe.label}
            </h1>
            <img src={recipe.recipe.image} alt='Recipe'></img>

            <ul style={{display: listStyle}}>
            {ingredients.map(ingredient => (
                <li>{ingredient}</li>
             ))}
            </ul>

            <button className='voir-plus' onClick={buttonClicked}>
              {buttonText}
            </button>
          </div>
          
        </>
    )
}

export default Recipe;
