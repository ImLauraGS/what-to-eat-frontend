import React, { createContext, useContext, useEffect, useState } from 'react';
import { userApi } from '../services/userService'; 


const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const api = userApi();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const saveUserToLocalStorage = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const register = async (data) => {
        try {
            const response = await api.register(data);
            setUser(response.data.user);
            saveUserToLocalStorage(response.data.user, response.data.token); 
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
            saveUserToLocalStorage(response.data.user, response.data.token); 
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
            removeUserFromLocalStorage();
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
