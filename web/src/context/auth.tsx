import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { AxiosResponse } from 'axios';

interface Response{
    user: {
        name: string;
        email: string;
    };
    token: string;
    status: number;
}

interface User {
    name: string;
    email: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(email: string, password: string): Promise<boolean>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = localStorage.getItem('@HAPPYAuth:user');
            const storagedToken = localStorage.getItem('@HAPPYAuth:token');

            if(storagedUser && storagedToken && storagedUser !== 'undefined' && storagedToken !== 'undefined'){
                
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`
            
                setUser(JSON.parse(storagedUser));
                
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn(email: string, password: string) {
        const response: AxiosResponse = await api.post('/auth',{email, password});

        if(response.status === 200){
            setUser(response.data.user);
    
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    
            localStorage.setItem('@HAPPYAuth:user', JSON.stringify(response.data.user));
            localStorage.setItem('@HAPPYAuth:token', response.data.token);

            return true;
        }

        return false;
    }

    function signOut() {
        localStorage.clear();
        setUser(null);
    }

    if(loading){
        return (
            <h1>
                loading...
            </h1>

        )
    }


    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}> 
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}
