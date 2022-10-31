import { useState } from "react";
import { 
    getProductsApi, 
    addProductApi, 
    updateProductApi, 
    deleteProductApi, 
    getProductByIdApi,
    getProductByCategoryApi
} from "../api/product";
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
            await addProductApi(data, auth.token);
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
            await updateProductApi(id, data, auth.token);
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

    const getProductById = async (id) => {
        try {
            const response = await getProductByIdApi(id);
            return response;
        } catch (error) {
            setError(false);
        }
    }

    const getProductByCategory = async (idCategory) => {
        try {
            setLoading(true);
            const response = await getProductByCategoryApi(idCategory);
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return {
        loading,
        error,
        products,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductByCategory
    }
}