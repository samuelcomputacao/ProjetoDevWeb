
const getKeyUsuarioLogado = () =>{
    return 3;
}

const isFuncionarioLogado = () => {
    return true;
}

const isClienteLogado = () => {
    return !isFuncionarioLogado();
}

export {getKeyUsuarioLogado,isFuncionarioLogado,isClienteLogado};