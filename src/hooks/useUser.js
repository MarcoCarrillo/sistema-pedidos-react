import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { getMeApi, getUsersApi, addUserApi } from '../api/user';
import { useAuth } from './useAuth';

export function useUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);
    const { auth } = useAuth();

    const getMe = async token => {
        try {
            const response = await getMeApi(token);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsersApi(auth.token);
            setLoading(false);
            setUsers(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const addUser = async (data) => {
        try {
            setLoading(true);
            await addUserApi(data, auth.token);
            setLoading(false);
            toast.success('Usuario creado correctamente')
        } catch (error) {
            setLoading(false);
            setError(error);
            toast.error('Ha ocurrido un error')
        }
    }

    return {
        loading,
        error,
        users,
        getMe,
        getUsers,
        addUser
    };
}

