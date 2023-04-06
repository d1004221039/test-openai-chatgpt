import React, {useState } from 'react';
import './customers.css';
const Customers=()=>{

  const [question,setQuestion] =useState("")
  const [aiAns,setAiAns] =useState("")
  const [aiImg, setAiImg] =useState("")
  const [imgOrAns ,setImgOrAns] = useState(0)
  const Submit=()=>{ 
    fetch(`/api/openai?question=${question}`)
      .then(res => {    
        return res.json()
      })
      .then(customers => {   
        console.log(customers)
        setAiAns(customers[0].choices[0].text )       
      });
    setImgOrAns(1)
  }

  const AIimgSubmit=()=>{
    fetch(`/api/openaiimg?question=${question}`).then(res => {    
      return res.json()
    })
    .then(josn => {       
      console.log("josn",josn)
      setAiImg(josn)
    });
    setImgOrAns(2)
  }
 
    return (
      <div>
        <h2>AI回答</h2>
        <input value={question} onChange={(e)=>setQuestion(e.target.value)}/>
        <button onClick={Submit}>送出</button>
        <button onClick={AIimgSubmit}> 圖片生成</button>
        {imgOrAns== 1 &&( 
        <div>
          <p>Q: {question}</p>
          <p>A: {aiAns}</p>
        </div>
        )}
        {imgOrAns== 2 &&( 
          <div>
            <p>AI圖片</p>
            <img src={aiImg}/>
          </div>
        )}
        
      </div>
    );
  
}

export default Customers;
