import React, { createContext, useContext, useState } from 'react';
import api from '../service/api';


export const UsuarioContext = createContext();

const UsuarioProvider = ({children}) => {

    const [tokenUser, setTokenUser] = useState('');
    const [keyUser, setKeyUser] = useState('');
    const [tipoUser, setTipoUser] = useState('');
    const [avatarUser, setAvatarUser] = useState('');

    const setToken = async (token) => {
        const {data}= await api.get('/usuarioToken/', {params:{
            Authentication:token
        }});
        setTokenUser(token);
        setAvatarUser(data.avatar);
        setKeyUser(data.key);
        setTipoUser(data.funcao);
    }

    const getToken = () => {
        return tokenUser;
    }

    const sair = () => {
       setAvatarUser('');
       setKeyUser('');
       setTipoUser('');
       setToken('');
    }

    const getTipoUsuarioLogado = () => {
        return tipoUser;
    }
    
    const getAvatar = () => {
        return avatarUser;
    }

    const isClienteLogado =  () => {
        if(tipoUser==='CLIENTE'){
            return true;
         }
        return false;
    }

    const isFuncionarioLogado =  () => {

        if(tipoUser==='FUNCIONARIO'){
             return true;
        }
        return false;
    }

    const getKeyUsuarioLogado =  () =>{
        return keyUser;
    }

    return (
        <UsuarioContext.Provider value={{setToken, getToken, sair, getTipoUsuarioLogado, getAvatar, isClienteLogado, isFuncionarioLogado, getKeyUsuarioLogado}}>
            {children}
        </UsuarioContext.Provider>
    );
}

export function useUsuarioContext(){
    const context = useContext(UsuarioContext);
    const {setToken, getToken, sair, getTipoUsuarioLogado, getAvatar, isClienteLogado, isFuncionarioLogado, getKeyUsuarioLogado} = context;
    return {setToken, getToken, sair, getTipoUsuarioLogado, getAvatar, isClienteLogado, isFuncionarioLogado, getKeyUsuarioLogado};
}

export default UsuarioProvider;