import Die from "./die";
import React from "react";
import {nanoid} from "nanoid";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
function App() {
  const [dice , setDice] = React.useState(() => generateAllNewDice() )// we do that to not rendered this function every time)

  const {width , height} = useWindowSize();

  const refBtn = React.useRef(null) ; 

  const gameWon = dice.every(die => die.isHeld === true) && 
                  dice.every(die => die.value === dice[0].value) ;

  React.useEffect( () => {
      if(gameWon) {
          refBtn.current.focus()
      }
  },[gameWon])

  function generateAllNewDice() {
    return new Array(10)
          .fill(0)
          .map(() => ({
              value:Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid()
          }))
  }
  
  function rollDice(){
    if(!gameWon){
      setDice(oldDice => oldDice.map(die => 
          die.isHeld ? die : {...die, value : Math.ceil(Math.random() * 6)}
      )
      );
    }else{
     setDice(generateAllNewDice()) ;
    }
  }
   
  function handlClick(id){
    
      setDice((prev) => 
        prev.map((die) => 
          die.id === id ? { ...die, isHeld : !die.isHeld} : die
        )
      );
  }
  const diceElement = dice.map(num => <Die 
          key={num.id} 
          value={num.value}
          style={{background : num.isHeld && "#59E391"}}
          onClick={()=> handlClick(num.id)}
    />);
  return(
    <main>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-dice" ref={refBtn} onClick={rollDice}> {gameWon ? "New game" : "Roll"} </button>
      <div>
        {gameWon && (<Confetti
            width={width}
            height={height}
        />)}
      </div>
    </main>
  );
}

export default App
