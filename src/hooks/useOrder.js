import { useState } from "react";
import { toast } from "react-toastify";
import { 
    getOrdersByTableApi, 
    checkDeliveredOrderApi, 
    addOrderToTableApi,
    addPaymentToOrderApi,
    closeOrderApi,
    getOrdersByPaymentApi
} from "../api/orders";

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

    const addOrderToTable = async (idTable, idProduct) => {
        try {
            await addOrderToTableApi(idTable, idProduct);
        } catch (error) {
            setError(error);
        }
    }

    const addPaymentToOrder = async (idOrder, idPayment) => {
        try {
            await addPaymentToOrderApi(idOrder, idPayment);
        } catch (error) {
            setError(error)
        }
    }

    const closeOrder = async (idOrder) => {
        try {
            await closeOrderApi(idOrder);
        } catch (error) {
            setError(error);
        }
    }

    const getOrdersByPayment = async (idPayment) => {
        try {
            return await getOrdersByPaymentApi(idPayment);
        } catch (error) {
            setError(error);
        }
    }

    return {
        loading,
        error,
        orders,
        getOrdersByTable,
        checkDeliveredOrder,
        addOrderToTable,
        addPaymentToOrder,
        closeOrder,
        getOrdersByPayment
    }
}