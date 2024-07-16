import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const recipeApi = () => {
    const getRecipes = async () => {
        try {
            const response = await api.get('/recipes');
            return response.data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    };

    const getRecipe = async (recipeId) => {
        try {
            const response = await api.get(`/recipe/${recipeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching recipe with ID ${recipeId}:`, error);
            throw error;
        }
    };

    const createRecipe = async (recipeData) => {
        const response = await api.post('/add', recipeData);
        return response.data;
    };

    const addFavorites = async (recipeId) => {
        try {
            const response = await api.post(`/recipe/${recipeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error adding recipe ${recipeId} to favorites:`, error);
            throw error;
        }
    };

    const getFavorites = async (userId) => {
        try {
            const response = await api.get(`/favorites/${userId}`);
            return response.data; 
        } catch (error) {
            console.error(`Error fetching favorites for user ${userId}:`, error);
            throw error;
        }
    };

    const getUserRecipes = async () => {
        try {
            const response = await api.get('/my-recipes');
            return response.data;
        } catch (error) {
            console.error('Error fetching user recipes:', error);
            throw error;
        }
    };

    return {
        getRecipes,
        getRecipe,
        createRecipe,
        addFavorites,
        getFavorites,
        getUserRecipes
    };
};

export default recipeApi;
