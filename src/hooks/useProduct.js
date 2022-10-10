import { useState } from "react";
import { getProductsApi, addProductApi, updateProductApi, deleteProductApi } from "../api/product";
import { useAuth } from "./useAuth";
import { toast } from 'react-toastify';

export function useProduct() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState(null);
    const { auth } = useAuth();
    
    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await getProductsApi();
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setLoading(false);
            setError(false);
        }
    }

    const addProduct = async (data) => {
        try {
            setLoading(true);
            addProductApi(data, auth.token);
            setLoading(false);
            toast.success('Producto agregado correctamente')
        } catch (error) {
            setLoading(false);
            setError(false);
            toast.success('Hubo un error')
        }
    }

    const updateProduct = async (id, data) => {
        try {
            setLoading(true);
            updateProductApi(id, data, auth.token);
            setLoading(false);
            toast.success('Producto actualizado correctamente')
        } catch (error) {
            setLoading(false);
            setError(false);
            toast.success('Hubo un error')
        }
    }

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await deleteProductApi(id, auth.token);
            setLoading(false);
            toast.success('Producto eliminado correctamente');
        } catch (error) {
            setLoading(false);
            setError(error);
            toast.error('Ha ocurrido un error');
        }
    }

    return {
        loading,
        error,
        products,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct
    }
}