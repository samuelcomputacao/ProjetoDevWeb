import React, { useState } from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import { Modal, Radio, Button, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import Titulo from '../../components/Titulo';
import './index.css';

const { Item } = Breadcrumb;
const { Group } = Radio;

function Usuarios() {
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoCadastro, setTipoCadastro] = useState(0);
    const history = useHistory();

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const onChange = e => {
        setTipoCadastro(e.target.value);
    };

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const redirectCadastro = () => {
        history.push({
            pathname: '/cadastroUsuarios',
            search: `?tipo=${tipoCadastro}`
        });
    }

    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Usuarios</Item>
            </Breadcrumb>
            <Container className='Container'>
                <Titulo nome='Usuários' />
                <Divider />
                <TabelaUsuarios />
                <Divider />
                <Button type='primary' onClick={openModal}>Cadastrar</Button>
                <Modal
                    visible={modalVisible}
                    title="Tipo de Cadastro!"
                    onOk={redirectCadastro}
                    onCancel={closeModal}
                    footer={[
                        <Button key='back' danger type='primary' onClick={closeModal}>
                            Cancelar
                    </Button>,
                        <Button key='submit' type='primary' onClick={redirectCadastro}>
                            Confirmar
                    </Button>,
                    ]}
                >
                    <Group onChange={onChange} value={tipoCadastro}>
                        <Radio style={radioStyle} value={0}>
                            Pessoa Física
                    </Radio>
                        <Radio style={radioStyle} value={1}>
                            Pessoa Jurídica
                     </Radio>
                    </Group>
                </Modal>
            </Container>
        </div>
    );
}

export default Usuarios;