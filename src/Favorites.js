import React from 'react';
import Recipe from './components/Recipe';

const Favorites = ({fav, recipes, addFavorite}) => {

   

    return (
        <>
            {fav.length > 0 ? <Display recipes={fav} addFavorite={addFavorite}/> : <div className='disp-container' style={{height: "85vh"}}>Aucun favoris</div>}
        </>
    )


}

const Display = ({ recipes, addFavorite }) => {
    return (
      <main>
        <div className='disp-container'>
          {recipes.map((recipe, index) => (
            <Recipe recipe={recipe} key={index} fav={true} addFavorite={() => addFavorite(recipe)} />
          ))}
        </div>
      </main>
    )
  }

export default Favorites