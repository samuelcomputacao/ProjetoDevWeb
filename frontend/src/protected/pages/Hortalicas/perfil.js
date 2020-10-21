import React, { useState, useEffect } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import { Divider } from 'antd';
import Titulo from '../../components/Titulo';
import FormHortalica from '../../components/FormHortalica';
import { Link } from 'react-router-dom';
const { Item } = Breadcrumb;

function PerfilHortalica({ location }) {

    const [carregado, setCarregado] = useState(false);
    const [keyHortalica, setKeyHortalica] = useState('');


    useEffect(() => {
        async function buscarHortalica() {
            console.log('fora');
            if (location) {
                console.log('dentro');
                const params = new URLSearchParams(location.search);
                const key = params.get('key');
                if (key) {
                    setKeyHortalica(key);
                    setCarregado(true);
                }
            }
        }
        buscarHortalica();
    }, [location]);

    if (carregado) {

        return (
            <div>
                <Breadcrumb>
                    <Item>
                        <Link className='link' to='/pedidos'>Principal</Link>
                    </Item>
                    <Item>
                        <Link className='link' to='/hortalicas'>Hortaliças</Link>
                    </Item>
                    <Item active >Editar</Item>
                </Breadcrumb>
                <Container>
                    <Titulo nome='Editar Hortaliça' />
                    <Divider />
                    <FormHortalica keyHortalica={keyHortalica} atualizar />
                </Container>
            </div>
        );
    } else {
        return (
            <div>
                <Breadcrumb>
                    <Item>
                        <Link className='link' to='/pedidos'>Principal</Link>
                    </Item>
                    <Item>
                        <Link className='link' to='/hortalicas'>Hortaliças</Link>
                    </Item>
                    <Item active >Cadastrar</Item>
                </Breadcrumb>
                <Container>
                    <Titulo nome='Cadastrar Hortaliça' />
                    <Divider />
                    <FormHortalica atualizar={false} />
                </Container>
            </div>
        );
    }
}
export default PerfilHortalica;