
import express from "express"
import cors from"cors"
import { Configuration, OpenAIApi } from "openai";
import fetch from "node-fetch";

const app = express();

// app.get('/api/customers', cors(), (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//     {id: 4, firstName: 'Dong', lastName: 'Hang'},
//   ];

//   res.json(customers);
// });

 app.get('/api/openaiimg', cors(), async(req, res) => {
  const {question} = req.query;
  const prompt = question;
  const model = "image-alpha-001";
  const apiKey = "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";
  async function generateImage() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
  
    const data = JSON.stringify({
      'model': model,
      'prompt': prompt,
      'num_images': 1,
      'size': '512x512',
      'response_format': 'url',    
  
    });
    let dataUrl
    try {
      let response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers,
        body: data
      });
      let json = await response.json();
      dataUrl =json.data[0].url   
      return dataUrl
      //  fetch('https://api.openai.com/v1/images/generations', {
      //   method: 'POST',
      //   headers,
      //   body: data
      // })
      // .then(response=>{      
      //   return response.json()
      // })
      // .then(json => console.log(json.data[0].url));
      // .data.data[0].url
   
    } catch (error) {
      console.error("error...",error);
      return ""
     
    }
   
  }
  let getRest = await generateImage(); 
  res.json(getRest);
 });

app.get('/api/openai', cors(), async(req, res) => {
  const { question } = req.query;
  const getAIdata = async()=>{
    const configuration = new Configuration({
        organization: "org-995E46dMYrJB1aGmeg8F3r1f",
        apiKey:"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",
    });
    const openai = new OpenAIApi(configuration);
    
    const prompt =`
      ${question}
    `
   
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 2048
      });
    
    return response.data
  }
  let response = await getAIdata()
  let rest = [response]
  console.log( rest[0].choices[0])
  res.json(rest);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);