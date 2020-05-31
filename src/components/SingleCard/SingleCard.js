import React from 'react';
// import ReactCardFlip from 'react-card-flip';
import './style.css';

const SingleCard = props => {
    return (        
        <div>
            {(props.clicked) &&
                <img id='card' src={props.source} alt={props.alternate} onClick={() => props.onClick(props.id)} />
            }
            {(!props.clicked) &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} id='card' onClick={() => props.onClick(props.id)} >
                    <h1 id='question' style={{fontSize: 50, color: 'black'}}>?</h1>
                </div>
            }
        </div>
    )
}

export default SingleCard;