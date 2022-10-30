import { useState } from "react";
import { toast } from "react-toastify";
import { createPaymentApi, getPaymentByTableApi, closePaymentApi, getPaymentsApi } from "../api/payment";


export function usePayment() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState(null);

    const createPayment = async (paymentData) => {
        try {
            return await createPaymentApi(paymentData);
        } catch (error) {
            setError(error);
            toast.error('No se pudo generar la cuenta, intentálo de nuevo')
        }
    }

    const getPaymentByTable = async (idTable) => {
        try {
            return await getPaymentByTableApi(idTable);
        } catch (error) {
            setError(error);
        }
    }

    const closePayment = async (idPayment) => {
        try {
            await closePaymentApi(idPayment);
        } catch (error) {
            setError(error)
        }
    }

    const getPayments = async () => {
        try {
            setLoading(true);
            const response = await getPaymentsApi();
            setLoading(false);
            setPayments(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return {
        error,
        loading,
        payments,
        createPayment,
        getPaymentByTable,
        closePayment,
        getPayments
    }
}
