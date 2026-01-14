import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const useSocket = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000');

        socket.on('connect', () => {
            socket.emit('register', user._id);
        });

        socket.on('hired', (data) => {
            toast.success(data.message, {
                duration: 5000,
                icon: '🎉',
            });
        });

        return () => socket.disconnect();
    }, [user]);
};

export default useSocket;
