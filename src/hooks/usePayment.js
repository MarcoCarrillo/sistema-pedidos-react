import { useState } from "react";
import { toast } from "react-toastify";
import { createPaymentApi } from "../api/payment";


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

    return {
        error,
        createPayment
    }
}
