import { useAuthSlice } from '@modules/auth/auth.slice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticateWS } from 'src/ws/auth.ws';
import { registerChatListeners, unregisterChatListeners } from 'src/ws/chats.ws';

const useAuthorizedListeners = () => {
    const dispatch = useDispatch();
    const { token, wsAuthorized } = useAuthSlice();
    useEffect(() => {
        const initializeChats = () => {
            if (token) {
                registerChatListeners(dispatch);
            }
        };

        initializeChats();

        return () => {
            unregisterChatListeners();
        };
    }, [wsAuthorized]);

    useEffect(() => {
        if (token && !wsAuthorized) {
            authenticateWS(token);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            let tries = 0;
            const interval = setInterval(() => {
                if (!wsAuthorized && tries < 3) {
                    authenticateWS(token);
                    tries++;
                } else {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }, []);
};

export default useAuthorizedListeners;
