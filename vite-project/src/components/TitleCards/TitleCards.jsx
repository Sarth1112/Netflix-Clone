import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = () => {
  const cardsRef = useRef();

  const handlewheel = (event)=>{
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handlewheel);

    // Cleanup event listener on component unmount
    return () => {
      currentRef.removeEventListener('wheel', handlewheel);
    };
  }, []);
  return (
    <div className='titlecards' >
        <h2>Popular on Netflix</h2>
        <div className="card-list" ref={cardsRef}>
          {cards_data.map((card,index)=> {
            return <div className="card" key={index}>
              <img src={card.image} alt="" />
              <p>{card.name}</p>
            </div>
          })}
        </div>
    </div>
  )
}

export default TitleCards