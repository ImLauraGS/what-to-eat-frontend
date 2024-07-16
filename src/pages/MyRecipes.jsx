import React, { useEffect } from 'react';
import { useRecipe } from '../context/recipeContext';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function MyRecipes() {
    const { favorites, fetchRecipe, userRecipes } = useRecipe();
    const [favoriteRecipes, setFavoriteRecipes] = React.useState([]);
    const [value, setValue] = React.useState('favorites');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
          navigate('/login');
        }
      }, []);

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
                    sx={{
                        '& .MuiTab-root': {
                            fontSize: '1rem', 
                            fontWeight: 'bold', 
                            '&.Mui-selected': {
                                color: '#6CBD98', 
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#6CBD98', 
                        },
                    }}
                >
                    <Tab value="favorites" label="Mis favoritas" />
                    <Tab value="myrecipes" label="Mis recetas" />
                </Tabs>
            </Box>
            {value === 'favorites' && (
                <div>
                    <h2 className='text-xl font-semibold p-5 text-center'>Mis recetas favoritas</h2>
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
                    <h2 className='text-xl font-semibold p-5 text-center'>Mis recetas</h2>
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
