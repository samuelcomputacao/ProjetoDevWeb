import api from './api';

const TOKEN = 'token';
const USUARIO_AVATAR = 'avatar';

const getKeyUsuarioLogado = () =>{
    return 3;
}

const isFuncionarioLogado = () => {
    return true;
}

const isClienteLogado = () => {
    return true;
}

const getToken = async () => {
    const token = sessionStorage.getItem(TOKEN);
    return token;
}

const getUsuarioCorrente = async () => {
    const usuario = await sessionStorage.getItem(USUARIO_AVATAR);
    return usuario;
}

const setToken = async (token) => {
    sessionStorage.setItem(TOKEN,token);
    const {data}= await api.get('/usuarioToken/', {params:{
        Authentication:token
    }});
    console.log(data);
    sessionStorage.setItem(USUARIO_AVATAR,data.avatar);
}

const sair = () => {
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(USUARIO_AVATAR);
}

export {getKeyUsuarioLogado,isFuncionarioLogado,isClienteLogado,getToken,sair,setToken, getUsuarioCorrente};