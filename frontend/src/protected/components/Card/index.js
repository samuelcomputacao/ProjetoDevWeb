import React from 'react';

function Card({ titulo, conteudo, acoes }) {
    return (
        <div className='card' >
            <div className='grid'>
                <div className='grid center'>
                    <h3>
                        <strong>{titulo}</strong>
                    </h3>
                </div>
            </div>
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