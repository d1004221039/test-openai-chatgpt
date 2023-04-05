import React, {useState } from 'react';
import './customers.css';
const Customers=()=>{

  const [question,setQuestion] =useState("")
  const [aiAns,setAiAns] =useState("")

  const Submit=()=>{ 
    fetch(`/api/openai?question=${question}`)
      .then(res => {    
        return res.json()
      })
      .then(customers => {
        console.log(customers )
        setAiAns(customers[0].choices[0].text )
        
        // setQuestion("")
      });
  }
 
    return (
      <div>
        <h2>AI回答</h2>
        <input value={question} onChange={(e)=>setQuestion(e.target.value)}/>
        <button onClick={Submit}>送出</button>
        <div>
          <p>Q: {question}</p>
          <p>A: {aiAns}</p>
        </div>
      </div>
    );
  
}

export default Customers;
