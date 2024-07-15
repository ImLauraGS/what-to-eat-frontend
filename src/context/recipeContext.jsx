import React, { createContext, useContext, useState, useEffect } from 'react';
import recipeApi from '../services/recipeService'; // Importa recipeApi correctamente

const RecipeContext = createContext();

export const useRecipe = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const api = recipeApi(); // Inicializa el API de recetas

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await api.getRecipes();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const fetchRecipe = async (recipeId) => {
        try {
            const data = await api.getRecipe(recipeId);
            return data;
        } catch (error) {
            console.error(`Error fetching recipe with ID ${recipeId}:`, error);
            throw error;
        }
    };

    return (
        <RecipeContext.Provider value={{ recipes, fetchRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};
