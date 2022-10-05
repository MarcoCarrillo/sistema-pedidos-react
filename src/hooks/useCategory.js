import React, { useState } from 'react';
import { addCategoryApi, getCategoriesApi, updateCategoryApi, deleteCategoryApi } from '../api/category';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';

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

    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            await deleteCategoryApi(id, auth.token);
            setLoading(false);
            toast.success('Categoria eliminada correctamente')
        } catch (error) {
            setLoading(false);
            setError(error);
            
        console.log(error)
            toast.error('Ha ocurrido un error')
        }
    }

    return {
        loading,
        error,
        categories,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory
    }
}
