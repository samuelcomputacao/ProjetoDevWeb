const TOKEN = 'token';

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

const sair = () => {
    sessionStorage.removeItem(TOKEN);
}

export {getKeyUsuarioLogado,isFuncionarioLogado,isClienteLogado,getToken,sair};