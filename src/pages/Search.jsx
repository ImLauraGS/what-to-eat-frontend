import React, { useContext, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { IngredientsContext } from '../context/ingredientsContext';
import { useRecipe } from '../context/recipeContext';
import RecipeCard from '../components/RecipeCard';

export default function Search() {
    const { ingredients } = useContext(IngredientsContext);
    const { recipes } = useRecipe();
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    

    const handleClick = (ingredient) => {
        if (selectedIngredients.length < 6 && !selectedIngredients.includes(ingredient)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const filteredRecipes = recipes.filter((recipe) => {
        const titleMatch = selectedIngredients.every((ingredient) =>
            recipe.title.toLowerCase().includes(ingredient.toLowerCase())
        );
        const descriptionMatch = selectedIngredients.every((ingredient) =>
            recipe.description.toLowerCase().includes(ingredient.toLowerCase())
        );
        return titleMatch || descriptionMatch;
    });

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
                <h2 className='text-2xl border-b-2 border-green-btn mb-4'>Resultados de la busqueda:</h2>
                {filteredRecipes.map((recipe) => (
                       <RecipeCard title={recipe.title} description={recipe.description} id={recipe.id} key={recipe.id}/>
                    ))}
            </section>
        </div>
    );
}
