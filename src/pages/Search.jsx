import React, { useContext } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { IngredientsContext } from '../context/ingredientsContext';
import { useRecipe } from '../context/recipeContext';

export default function Search() {
    const { ingredients } = useContext(IngredientsContext);
    const { recipes } = useRecipe();
    

    const handleClick = (ingredient) => {
        console.log(ingredient);
    };

    console.log(recipes)


    return (
        <div className='flex flex-col gap-5 p-5'>
           {Object.keys(ingredients).map((category, index) => (
                <div key={index}>
                    <h3 className='text-xl border-b-2 border-green-btn mb-4'>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {ingredients[category].map((ingredient) => (
                            <Chip
                                key={ingredient}
                                label={ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                                variant="outlined"
                                onClick={() => handleClick(ingredient)}
                                style={{ margin: '4px' }}
                                
                            />
                        ))}
                    </Stack>
                </div>

            ))}
            <section>
                <h2 className='text-2xl border-b-2 border-green-btn mb-4'>Recipe List</h2>
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            {/* Aquí puedes mostrar más detalles de la receta */}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
