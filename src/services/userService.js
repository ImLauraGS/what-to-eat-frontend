import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

export const userApi = () => {
    const register = async (data) => {
        const response = await api.post('/register', data);
        return response;
    };

    const login = async (data) => {
        const response = await api.post('/login', data);
        return response;
    };

    const logout = async () => {
        const response = await api.post('/logout');
        return response;
    };

    return {
        register,
        login,
        logout,
    };
};