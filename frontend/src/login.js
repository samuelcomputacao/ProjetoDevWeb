import React from 'react';
import 'antd/dist/antd.css';
import { Container } from 'react-bootstrap';
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import Titulo from './protected/components/Titulo';

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 16,
    },
};

const forgoutLayout = {
    wrapperCol: {
        offset: 5,
    },
}

const Login = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Titulo nome="Login" />
            <Divider />
            <Container className='Container'>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'O email é obrigatório!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="senha"
                        rules={[
                            {
                                required: true,
                                message: 'A senha é obrigatória!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{margin:'2px'}}>
                            Entrar
                        </Button>
                        <Button type="danger" htmlType="button">
                            Esqueceu a senha?
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        </div>
    );
};

export default Login;