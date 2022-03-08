import './SingleCard.css'
const SingleCard = ({card, handleChoice, disabled, flipped}) => {
    const handleClick=()=>{
      if(!disabled)
      handleChoice(card);
    }
    return ( 
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className='front' src={card.src} alt="card front" />
              <img 
              className='back' 
              src="/img/cover.png" 
              alt="crad back" 
              onClick={handleClick} />
            </div>
        </div>
     );
}
 
export default SingleCard;