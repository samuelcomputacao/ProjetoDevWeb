
const getKeyUsuarioLogado = () =>{
    return 3;
}

const isFuncionarioLogado = () => {
    return true;
}

const isClienteLogado = () => {
    return true;
}

const verificaSessao = async () => {
    const token = sessionStorage.getItem('token');
    console.log(token);
    return true;
}

export {getKeyUsuarioLogado,isFuncionarioLogado,isClienteLogado,verificaSessao};