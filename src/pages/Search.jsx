import React, { useContext, useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { IngredientsContext } from '../context/ingredientsContext';
import { useRecipe } from '../context/recipeContext';
import RecipeCard from '../components/RecipeCard';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';


export default function Search() {
    const { ingredients } = useContext(IngredientsContext);
    const navigate = useNavigate();
    const { recipes } = useRecipe();
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const { user, token } = useUser(); 

    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
          navigate('/login');
        }
      }, []);

      const handleClick = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
        } else if (selectedIngredients.length < 6) {
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
            {selectedIngredients.length === 0 && (
                    <p className='text-lg mb-4 mt-4 text-center'>Selecciona hasta un máximo de 6 ingredientes.</p>
                )}
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
            <section className=''>
                {selectedIngredients.length > 0 && (
                    <>
                        <h2 className='text-2xl border-b-2 border-green-btn mb-4'>Resultados de la búsqueda:</h2>
                        <p>Ingredientes selecionados:</p>
                        {selectedIngredients.map((ingredient) => (
                            <Chip
                                key={ingredient}
                                label={ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                                variant="outlined"
                                onClick={() => handleClick(ingredient)}
                                style={{ margin: '4px' }}
                                
                            />
                        ))}

                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <RecipeCard title={recipe.title} description={recipe.description} id={recipe.id} key={recipe.id} />
                            ))
                        ) : (
                            <p className='text-lg mb-4 mt-4'>No se encontraron recetas que coincidan con los ingredientes seleccionados.</p>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
