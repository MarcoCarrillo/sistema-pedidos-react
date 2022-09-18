import { BASE_API } from '../utils/constants';

export async function loginApi(formData) {
    try {
        const url = `${BASE_API}/api/auth/login/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        
        if(response.status === 401){
            throw new Error('Los datos de email o contraseña son incorrectos');
        }
        
        if(response.status !== 200){
            throw new Error('Ha ocurrido un error');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}


export async function getMeApi(token) {
    try {
        const url = `${BASE_API}/api/auth/me/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

export async function getUsersApi(token) {
    try {
        const url = `${BASE_API}/api/users/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}