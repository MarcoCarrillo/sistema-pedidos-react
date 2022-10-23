import { useState } from "react";
import { toast } from "react-toastify";
import { getOrdersByTableApi, checkDeliveredOrderApi } from "../api/orders";

export function useOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState(false);

    const getOrdersByTable = async (idTable, status, ordering) => {
        try {
            setLoading(true);
            const response = await getOrdersByTableApi(idTable, status, ordering);
            setLoading(false);
            setOrders(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const checkDeliveredOrder =  async (idOrder) => {
        try {
            await checkDeliveredOrderApi(idOrder);
            toast.success('Producto entregado correctamente')
        } catch (error) {
            setError(error);
        }
    }

    return {
        loading,
        error,
        orders,
        getOrdersByTable,
        checkDeliveredOrder
    }
}