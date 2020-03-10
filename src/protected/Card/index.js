import React from 'react';


function Card({header,title,description}){
    return (
        <Card bg="Secondary" text="white" style={{ width: '18rem' }}>
            <Card.Header>{header}</Card.Header>
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Card();