import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages=[
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  const [cards,setCards]=useState([]);
  const [turns,setTurns]=useState(0);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);
  const [disabled,setDisabled]=useState(false);
  const [pairs,setPairs]=useState(0);
  const [endGame,setEndGame]=useState(false);
  
  const shuffledCards = ()=>{
    const shuffledCards=[...cardImages,...cardImages]
      .sort(()=>(Math.random()-0.5))
      .map(card=>({...card,id:Math.random()}))
    // When we want to directly return a value in an arrow function without adding any instruction we 
    // enclose the value to be returned in () ans not in {}
    setEndGame(false);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setPairs(0);
    setTurns(0); 
  }

  const handleChoice=(card)=>{
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(()=>{
    if(choiceOne&&choiceTwo)
    {
      setDisabled(true);
      if(choiceOne.src===choiceTwo.src)
      {
        // console.log("Cards Match");
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src==choiceOne.src)
            {
              return {...card, matched: true};
            }
            else {
              return card;
            }
          })
        })
        setPairs(prevPairs=>(prevPairs+1));
      }
      else console.log("Crads Don't Match");
      setTimeout(()=>{resetTurn()},1000);
    }
  },[choiceOne,choiceTwo])
  
  // console.log(cards);

  const resetTurn=()=>{
    setTurns(prevTurns=>(++prevTurns));
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }
  // console.log(cards, turns);

  useEffect(()=>{
    shuffledCards();
  },[])

  useEffect(()=>{
    if(pairs===6)
    {
      setTimeout(()=>{setEndGame(true);},1000);
      // setTimeout(()=>{
      //   shuffledCards();
      // },1000);
    }
  },[pairs])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>
      {!endGame&&<p>Turns : {turns}</p>}
      {endGame&& <div><h2>You took {turns} Turns</h2>
      <p>Click on New Game to start over</p></div> }
      <div className="card-grid">
        {cards.map(card=>(
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          disabled={disabled}
          flipped={card===choiceOne||card===choiceTwo||card.matched}/>
        ))}
      </div>
    </div>
  );
}

export default App