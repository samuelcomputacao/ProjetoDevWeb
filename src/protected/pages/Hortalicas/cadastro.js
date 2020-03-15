import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
    Form,
    Input,
    Button,
    Select,
    InputNumber,
    Divider,
    notification
} from 'antd';

import Menu from '../../components/Menu';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
const { Item } = Breadcrumb;


function Cadastro() {
  
    const [categorias, setCategorias] = useState(['Folhas', 'Temperos', 'Legumes', 'Raizes']);
    const [nome, setNome]  = useState('');
    const [categoria, setCategoria] = useState('');
    const [valor, setValor]  = useState(0);

    const history = useHistory();

    const onFormLayoutChange = ({ size }) => {
        console.log('formChange');
    };

    const onFinish = values => {
       setNome(values.nome);
       setCategoria(values.categoria);
       setValor(values.valor);
       openNotification();
       setTimeout(redirect, 1000);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

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

    const openNotification = () => {
        notification.open({
          message: 'Salvo',
          description:
           'A Hortaliça foi salva com sucesso',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      };

    const redirect = () => {
        history.goBack();
    }
      

    return (
        <div>
            <Menu />
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Hortaliças</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Cadastro de Hortaliças' />
                <Divider />
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onValuesChange={onFormLayoutChange}
                    size='larger'>
                    <Form.Item
                        label='Nome'
                        name="nome"
                        rules={[
                            {
                                required: true,
                                message: 'O nome é obrigatorio!'
                            }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Categoria'
                        name="categoria"
                        rules={[
                            {
                                required: true,
                                message: 'A Categoria é obrigatoria!',
                            }]}
                    >
                        <Select>
                            {
                                categorias.map((cat) => {
                                    return (<Select.Option value={cat} key={cat}>{cat}</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Valor'
                        name="valor"
                        rules={[
                            {
                                required: true,
                                message: 'O valor é obrigatoria!',
                            }]}
                    >
                        <InputNumber defaultValue={0} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button
                        type="primary"
                        htmlType="submit"
                        >
                            Salvar
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        </div>
    );
}

export default Cadastro;