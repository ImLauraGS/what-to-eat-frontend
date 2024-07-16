import React, { useContext, useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    }, [navigate]);

    const handleClick = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
        } else if (selectedIngredients.length < 6) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredRecipes = recipes.filter((recipe) => {
        const normalizedTitle = normalizeString(recipe.title);
        const normalizedDescription = normalizeString(recipe.description);
        
        const titleMatch = selectedIngredients.every((ingredient) =>
            normalizedTitle.includes(normalizeString(ingredient))
        );
        const descriptionMatch = selectedIngredients.every((ingredient) =>
            normalizedDescription.includes(normalizeString(ingredient))
        );
        
        return titleMatch || descriptionMatch;
    });

    return (
        <div className='flex flex-col p-5'>
            {selectedIngredients.length === 0 && (
                <p className='text-lg mb-4 mt-4 text-center'>Selecciona hasta un máximo de 6 ingredientes.</p>
            )}
            {Object.keys(ingredients).map((category, index) => (
                <Accordion key={index} sx={{ boxShadow: 'none', borderBottom: '2px solid #6CBD98'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#6CBD98' }} />} 
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography 
                        >{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            spacing={1} flexWrap="wrap">
                            {ingredients[category].map((ingredient) => (
                                <Chip
                                    key={ingredient}
                                    label={ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                                    variant="outlined"
                                    onClick={() => handleClick(ingredient)}
                                    style={{ margin: '0.4rem', padding: '1rem' }}
                                    sx={{
                                        fontSize: '1rem',
                                        borderColor: '#6CBD98',
                                        borderWidth: '2px',
                                    }}
                                />
                            ))}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}
            <section className=''>
                {selectedIngredients.length > 0 && (
                    <>
                        <h2 className='text-2xl border-b-2 border-green-btn mb-4'>Resultados de la búsqueda:</h2>
                        <p>Ingredientes seleccionados:</p>
                        {selectedIngredients.map((ingredient) => (
                            <Chip
                                key={ingredient}
                                label={ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                                variant="outlined"
                                onClick={() => handleClick(ingredient)}
                                style={{ margin: '0.4rem', padding: '1rem' }}
                                sx={{
                                    margin: '4px',
                                    fontSize: '1rem',
                                    borderColor: '#6CBD98',
                                    borderWidth: '2px',
                                }}
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
