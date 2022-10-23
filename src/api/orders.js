import { toast } from "react-toastify";
import { BASE_API, ORDER_STATUS } from "../utils/constants";

export async function getOrdersByTableApi(idTable, status='', ordering = '') {
    try {
        const tableFilter = `table=${idTable}`;
        const statusFilter = `status=${status}`;
        const closeFilter = 'close=False';

        const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error);
        throw error;
    }
}

export async function checkDeliveredOrderApi(id) {
    try {
        const url = `${BASE_API}/api/orders/${id}/`;
        const params = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: ORDER_STATUS.DELIVERED,
            }),
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        toast.error(error);
        throw error;
    }
}