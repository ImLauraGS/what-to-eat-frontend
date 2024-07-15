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

    return {
        getRecipes,
        getRecipe,
    };
};

export default recipeApi;  // Asegúrate de exportar el servicio por defecto
