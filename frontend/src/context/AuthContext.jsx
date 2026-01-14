import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = 'http://localhost:5000/api';

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    const register = async (name, email, password, role) => {
        const response = await axios.post(`${apiUrl}/auth/register`, {
            name, email, password, role
        }, { withCredentials: true });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    };

    const login = async (email, password) => {
        const response = await axios.post(`${apiUrl}/auth/login`, {
            email, password
        }, { withCredentials: true });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout, apiUrl }}>
            {children}
        </AuthContext.Provider>
    );
};
