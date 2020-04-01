import React from 'react';
import {Modal} from 'antd';
import {ExclamationCircleOutlined } from '@ant-design/icons';

const {confirm} = Modal;

const showConfirm = (title,content,callback,params) => {
    confirm({
        title:`${title}`,
        icon: <ExclamationCircleOutlined />,
        content: `${content}`,
        onOk() {
            callback(params);
        },
        onCancel() { },
    });
}

export {showConfirm};