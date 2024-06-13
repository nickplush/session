import React from 'react'
import './Card.css'

const Card = ({card, openCard}) => {
    return (
        <div className='card-wrapper' onClick={() => openCard(card.id)}>
                <div className='card-title'>{card.title}</div>
                {card.isOpen &&
                    <div className='card-answer'>
                        <div dangerouslySetInnerHTML={{ __html: card.answer }}/>
                        <div>{card.exemples}</div>
                    </div>
                }
        </div>
    )
}

export default Card;