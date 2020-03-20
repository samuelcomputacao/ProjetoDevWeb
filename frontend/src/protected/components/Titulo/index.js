import React from 'react';
import {Row, Col, Badge } from  'react-bootstrap';
function Titulo({ name }) {
    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                <h1>
                    <Badge>{name}</Badge>
                </h1>
            </Col>
        </Row>
    );
}

export default Titulo;