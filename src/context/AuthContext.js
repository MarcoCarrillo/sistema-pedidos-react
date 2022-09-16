import React, {useState, useEffect, createContext} from 'react';
import { setToken, getToken, removeToken } from '../api/token';
import { useUser } from '../hooks';
import { TOKEN } from '../utils/constants';
import { toast } from 'react-toastify';

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null
});

export function AuthProvider(props) {
    const { children } = props;
    const [auth, setAuth] = useState(undefined);
    const { getMe } = useUser();

    useEffect(() => {
        (async () => {
            const token = getToken();
            if (token) {
                const me = await getMe(token);
                setAuth({ token, me });
            } else {
                setAuth(null);
            }
        })();
    }, [setAuth]);

    const login = async token => {
        setToken(token);
        const me = await getMe(token);
        setAuth({ token, me })
        toast.success('Haz iniciado sesión correctamente')
    }

    const logout = () =>{
        if(localStorage.getItem(TOKEN)) {
            removeToken();
            setAuth(null);
            toast.info('Haz cerrado sesión correctamente')
            setTimeout(() => {
                window.location.reload()
            }, 2000);
            
        }
    }

    const valueContext = {
        auth,
        login,
        logout
    }

    if(auth === undefined) return null;

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}
