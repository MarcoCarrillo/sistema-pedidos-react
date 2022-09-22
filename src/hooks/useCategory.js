import React, { useState } from 'react';
import { addCategoryApi, getCategoriesApi, updateCategoryApi } from '../api/category';
import { useAuth } from './useAuth';

export function useCategory() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState(null);

    const { auth } = useAuth();

    const getCategories = async () => {
        try {
            setLoading(true);
            const response = await getCategoriesApi();
            setLoading(false);
            setCategories(response);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    const addCategory = async (data) => {
        try {
            setLoading(true)
            await addCategoryApi(data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    const updateCategory = async (id, data) => {
        try {
            setLoading(true)
            await updateCategoryApi(id, data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    return {
        loading,
        error,
        categories,
        getCategories,
        addCategory,
        updateCategory
    }
}
