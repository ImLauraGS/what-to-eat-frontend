import React, { createContext, useContext, useState, useEffect } from 'react';
import recipeApi from '../services/recipeService';

const RecipeContext = createContext();

export const useRecipe = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null); 
    const [favorites, setFavorites] = useState([]); 
    const [favoritesLoaded, setFavoritesLoaded] = useState(false);
    const [userRecipes, setUserRecipes] = useState([]); 
    const api = recipeApi(); 

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

    const addRecipe = async (data) => {
        try {
            const response = await api.createRecipe(data);
            setRecipe(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const addFavorites = async (recipeId) => {
        try {
            const response = await api.addFavorites(recipeId); 
            return response;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            const user = localStorage.getItem('user'); 
            if (user) {
                const userId = JSON.parse(user).id;
                try {
                    const data = await api.getFavorites(userId);
                    setFavorites(data.favorites || []);
                    setFavoritesLoaded(true);
                } catch (error) {
                    console.error(`Error fetching favorites for user ${userId}:`, error);
                }
            }
        };

        if (!favoritesLoaded) {
            fetchFavorites();
        }
    }, []);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const data = await api.getUserRecipes();
                setUserRecipes(data);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };

        fetchUserRecipes();
    }, []);


    const isFavorite = (recipeId) => {
        return favorites.some(favorite => favorite.recipe_id === recipeId);
    };

    return (
        <RecipeContext.Provider value={{ 
            recipes, 
            recipe, 
            favorites,
            userRecipes, 
            isFavorite, 
            addFavorites, 
            fetchRecipe, 
            addRecipe 
        }}>
            {children}
        </RecipeContext.Provider>
    );
};