import React, { createContext, useContext, useState } from 'react';
import { userApi } from '../services/userService'; 
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const api = userApi();

    const register = async (data) => {
        try {
            const response = await api.register(data);
            setUser(response.data.user);

            return response;
        } catch (error) {
            console.error("Registration Error:", error);
            throw error;
        }
    };

    const login = async (data) => {
        try {
            const response = await api.login(data);
            setUser(response.data.user);

            return response;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.logout();
            setUser(null);

        } catch (error) {
            console.error("Logout Error:", error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ user, register, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
