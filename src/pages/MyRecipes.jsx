import React, { useEffect } from 'react';
import { useRecipe } from '../context/recipeContext';
import RecipeCard from '../components/RecipeCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function MyRecipes() {
    const { favorites, fetchRecipe, userRecipes } = useRecipe();
    const [favoriteRecipes, setFavoriteRecipes] = React.useState([]);
    const [value, setValue] = React.useState('favorites');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const loadFavoriteRecipes = async () => {
            const recipes = await Promise.all(favorites.map(async (favorite) => {
                const recipe = await fetchRecipe(favorite.recipe_id);
                return recipe;
            }));
            setFavoriteRecipes(recipes);
        };

        loadFavoriteRecipes();
    }, [favorites, fetchRecipe]);

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    variant="fullWidth"
                >
                    <Tab value="favorites" label="Mis favoritas" />
                    <Tab value="myrecipes" label="Mis recetas" />
                </Tabs>
            </Box>
            {value === 'favorites' && (
                <div>
                    <h2>Mis Recetas Favoritas</h2>
                    <div>
                        {favoriteRecipes.length > 0 ? (
                            favoriteRecipes.map((recipe) => (
                                <RecipeCard
                                    title={recipe.title}
                                    description={recipe.description}
                                    id={recipe.id}
                                    key={recipe.id}
                                />
                            ))
                        ) : (
                            <p>No tienes recetas favoritas.</p>
                        )}
                    </div>
                </div>
            )}
            {value === 'myrecipes' && (
                <div>
                    <h2>Mis Recetas</h2>
                    <div>
                        {userRecipes.length > 0 ? (
                            userRecipes.map((recipe) => (
                                <RecipeCard
                                    title={recipe.title}
                                    description={recipe.description}
                                    id={recipe.id}
                                    key={recipe.id}
                                />
                            ))
                        ) : (
                            <p>No has añadido ninguna receta.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
