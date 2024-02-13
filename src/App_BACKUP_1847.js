<<<<<<< HEAD
import {useState,useEffect,useCallback } from "react"
import Cell from "./components/Cell"
import AIButton from "./components/AIButton"
import AIPlayer from "./components/AIPlayer"

const App= () =>{
const [cells,setcells]= useState (["", "", "", "", "", "", "", "", ""]) 
const[go,setgo]=useState("circle")
const[wm, setwm]=useState(null)
const msg="it is now " + go + "'s go"
const [vsAI, setVsAI] = useState(false);
const [aiButtonClicked, setAiButtonClicked] = useState(false);

const startAI = () => {
  setVsAI(true);
  setAiButtonClicked(true);
  // Hide the AI button when it's clicked

};
const handleCellClick = () => {
  if (!aiButtonClicked) {
    setAiButtonClicked(true); // Hide the AI button after a cell is clicked
  }
};
  

const checkscore =useCallback(()=>{
  
=======
import {useState,useEffect} from "react"
import Cell from "./components/Cell"
const App= () =>{
  const [cells,setcells]= useState (["", "", "", "", "", "", "", "", ""])
 
const[go,setgo]=useState("circle")
const[wm, setwm]=useState(null)
const msg="it is now " + go + "'s go"
const checkscore =()=>{
>>>>>>> f9c51e053370a5091cded26140115c1fab770f03
  const winngCombo=[
    [0,1,2],[3,4,5,],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
 
  
  ]
<<<<<<< HEAD
  let isDraw=true;
=======
>>>>>>> f9c51e053370a5091cded26140115c1fab770f03
  winngCombo.forEach(array =>{
    let circlewins=array.every(cell => cells[cell]==="circle")
     if(circlewins){
      setwm("circle wins")
<<<<<<< HEAD
      isDraw=false;

      return
     }
     
     
=======
      return
     }
     
>>>>>>> f9c51e053370a5091cded26140115c1fab770f03
  })
  winngCombo.forEach(array =>{
    let crosswins=array.every(cell => cells[cell]==="cross")
     if(crosswins){
      setwm("cross wins")
<<<<<<< HEAD
      isDraw=false;
=======
>>>>>>> f9c51e053370a5091cded26140115c1fab770f03
      return
     }
     
  })
<<<<<<< HEAD


if (isDraw && cells.every((cell) => cell !== "")) {
  setwm("draw");
}
},[cells]);


useEffect(()=>{
   checkscore()
     //eslint-disable-next-line react-hooks/exhaustive-deps

},[cells,wm, go, vsAI,checkscore])

console.log("vsAI value:", vsAI); // Add this line


return (
    <div className="App">
      <div  className="gameboard">
        {cells.map((cell , index) =>(
         <Cell 
         key={index} 
         id={index} 
         setcells={setcells}
         cell={cell} // This is the prop that should reflect the state of the cell

         go={go}
         setgo={setgo}
         cells={cells}
         wm={wm}
         onClick={handleCellClick} // Pass the callback to handle the cell click
          
         />
        ))}
    
      </div>
       <p>{ wm||msg}</p>
     {!aiButtonClicked &&!vsAI  &&   <AIButton startAI={startAI} /> }
       {vsAI && (
       <AIPlayer 
         cells={cells}
         go={go}
         setGo={setgo} 
         setCells={setcells} 
         checkscore={checkscore} // Make sure to pass the checkscore function
         />
         )}

    </div>
  ) 
}

export default App;
=======
}
useEffect(()=>{
   checkscore()
},[cells])
return (
    <div className="App">
      <div  className="gameboard">
        {cells.map((cell , index) =>
         <Cell key={index} id={index} 
         setcells={setcells}
         go={go}
         setgo={setgo}
         cells={cells}/>)}
    
      </div>
       <p>{ wm||msg}</p>
    </div>
  ) ;
}

export default App;
 
>>>>>>> f9c51e053370a5091cded26140115c1fab770f03
