    import {notification} from 'antd';


    const notificarSucesso = (description) => {
       open('Sucesso!',description);
    }

    const notificarErro = (description) => {
        open('Erro!',description);
    }

    const open = (message,description) => {
        notification.open({
            message: message,
            description:
                description,
        });
    }


    export {notificarSucesso,notificarErro};