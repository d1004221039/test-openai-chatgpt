
import express from "express"
import cors from"cors"
import { Configuration, OpenAIApi } from "openai";


const app = express();

app.get('/api/customers', cors(), (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    {id: 4, firstName: 'Dong', lastName: 'Hang'},
  ];

  res.json(customers);
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