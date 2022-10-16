import React, {useState} from 'react'
import { getTablesApi, addTableApi, updateTableApi, deleteTableApi } from '../api/table'
import { useAuth } from './';
import { toast } from 'react-toastify';

export function useTable() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tables, setTables] = useState(null);

    const { auth } = useAuth();

    const getTables = async () => {
        try {
            setLoading(true);
            const response = await getTablesApi(auth.token);
            setLoading(false);
            setTables(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const addTable = async (data) => {
        try {
            setLoading(true);
            await addTableApi(data, auth.token);
            setLoading(false);
            toast.success('Mesa agregada correctamente')
        } catch (error) {
            setLoading(false);
            setError(false);
            toast.success('Hubo un error')
        }
    }

    const updateTable = async (id, data) => {
        try {
            setLoading(true);
            await updateTableApi(id, data, auth.token);
            setLoading(false);
            toast.success('Mesa actualizada correctamente')
        } catch (error) {
            setLoading(false);
            setError(false);
            toast.success('Hubo un error')
        }
    }

    const deleteTable = async (id) => {
        try {
            setLoading(true);
            await deleteTableApi(id, auth.token);
            setLoading(false);
            toast.success('Mesa eliminada correctamente')
        } catch (error) {
            setLoading(false);
            setError(false);
            toast.success('Hubo un error')
        }
    }

    return {
        loading,
        error,
        tables,
        getTables,
        addTable,
        updateTable,
        deleteTable
    }

}
