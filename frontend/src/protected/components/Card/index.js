import React from 'react';
import './index.css';

function Card({ titulo, conteudo, acoes }) {
    return (
        <div className='card'>
            <center>
                <h3>{titulo}</h3>
            </center>
            <hr />
            {conteudo}
            <hr />
            <p>
                {acoes}
            </p>
        </div>

    );
}

export default Card;