    import React from 'react';
    import {notification} from 'antd';
    import { ExclamationCircleOutlined,SmileOutlined} from '@ant-design/icons';


    const notificarSucesso = (description) => {
       open('Sucesso!',description,<SmileOutlined style={{color:'green'}}/>);
    }

    const notificarErro = (description) => {
        open('Erro!',description,<ExclamationCircleOutlined style={{color:'red'}}/>);
    }

    const open = (message,description,icone) => {
        notification.open({
            message: message,
            description:
                description,
            icon:icone
        });
    }

    export {notificarSucesso,notificarErro};