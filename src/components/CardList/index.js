import React from 'react';
import SingleCard from '../SingleCard/SingleCard';
import './style.css';

const CardList = props => {
    const newPics = props.pics.map(pic => {
        return <SingleCard source={pic.image} key={pic.id} alternate={pic.image} id={pic.id} onClick={props.onClick} clicked={pic.clicked} />
    })
    return (
        <div className='card-list'>
            {newPics}
        </div>
    )
}

export default CardList;