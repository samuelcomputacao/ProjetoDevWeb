import api from './api';

const TOKEN = 'token';
const AVATAR = 'avatar';
const USUARIO_KEY = 'key_usuario';
const USUARIO_TIPO = 'tipo_usuario';

const getKeyUsuarioLogado = async () =>{
    const key = await sessionStorage.getItem(USUARIO_KEY);
    return key;
}

const isFuncionarioLogado = async () => {
    const tipo = await sessionStorage.getItem(USUARIO_TIPO);
    console.log(tipo);
    if(tipo==='FUNCIONARIO'){
         return true;
    }
    return false;
}

const isClienteLogado = async () => {
    const tipo = await sessionStorage.getItem(USUARIO_TIPO);
    console.log(tipo);
    if(tipo==='CLIENTE'){
        return true;
     }
    return false;
}

const getToken = async () => {
    const token = sessionStorage.getItem(TOKEN);
    return token;
}

const getAvatar = async () => {
    const avatar = await sessionStorage.getItem(AVATAR);
    return avatar;
}

const setToken = async (token) => {
    const {data}= await api.get('/usuarioToken/', {params:{
        Authentication:token
    }});
    sessionStorage.setItem(TOKEN,token);
    sessionStorage.setItem(AVATAR,data.avatar);
    sessionStorage.setItem(USUARIO_KEY,data.key);
    sessionStorage.setItem(USUARIO_TIPO, data.funcao);
    setTimeout(()=>{
       window.location.reload();
    },500);
}

const getTipoUsuarioLogado = async () => {
    const tipo = await sessionStorage.getItem(USUARIO_TIPO);
    return tipo;
}

const sair = () => {
    sessionStorage.clear();
    setTimeout(()=>{
        window.location.reload();
     },500);
}

export {getKeyUsuarioLogado,isFuncionarioLogado,isClienteLogado,getToken,sair,setToken, getAvatar,getTipoUsuarioLogado};