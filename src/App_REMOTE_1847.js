import {useState,useEffect} from "react"
import Cell from "./components/Cell"
const App= () =>{
  const [cells,setcells]= useState (["", "", "", "", "", "", "", "", ""])
 
const[go,setgo]=useState("circle")
const[wm, setwm]=useState(null)
const msg="it is now " + go + "'s go"
const checkscore =()=>{
  const winngCombo=[
    [0,1,2],[3,4,5,],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
 
  
  ]
  winngCombo.forEach(array =>{
    let circlewins=array.every(cell => cells[cell]==="circle")
     if(circlewins){
      setwm("circle wins")
      return
     }
     
  })
  winngCombo.forEach(array =>{
    let crosswins=array.every(cell => cells[cell]==="cross")
     if(crosswins){
      setwm("cross wins")
      return
     }
     
  })
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
 