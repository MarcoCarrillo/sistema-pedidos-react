import { useState } from "react";
import { toast } from "react-toastify";
import { createPaymentApi, getPaymentByTableApi, closePaymentApi } from "../api/payment";


export function usePayment() {
    const [error, setError] = useState(false);

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

    return {
        error,
        createPayment,
        getPaymentByTable,
        closePayment
    }
}
