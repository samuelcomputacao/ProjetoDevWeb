import React from 'react';
import {Row, Col, Badge } from  'react-bootstrap';
function Titulo({ nome }) {
    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                <h1>
                    <Badge>{nome}</Badge>
                </h1>
            </Col>
        </Row>
    );
}

export default Titulo;