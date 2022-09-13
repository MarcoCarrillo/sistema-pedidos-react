import React, {useState, useEffect, createContext} from 'react';
import { setToken } from '../api/token';
import { useUser } from '../hooks';

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null
})

export function AuthProvider(props) {
    const { children } = props;
    const [auth, setAuth] = useState(undefined);
    const { getMe } = useUser();

    const login = async token => {
        setToken(token);
        const me = await getMe(token);
        setAuth({token, me})
        console.log(auth)
    }
    const valueContext = {
        auth: null,
        login,
        logout: () => {
            console.log('cerrando sesion...')
        }
    }

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}
