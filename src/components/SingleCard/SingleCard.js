import React from 'react';
import './style.css';

const SingleCard = props => {
    return (        
        <div>
            {(props.clicked && !props.animate) &&
                <img id='card' src={props.source} alt={props.alternate} onClick={() => props.onClick(props.id)} />
            }
            {(!props.clicked && !props.animate) &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} id='card' onClick={() => props.onClick(props.id)} >
                    <h1 id='question' style={{fontSize: 50, color: 'black'}}>?</h1>
                </div>
            }
        </div>
    )
}

export default SingleCard;