const express = require('express');

const app = express();

app.get('/', (request, response) => {
  const query = request.query;
  console.log(query)

  return response.send('ok!');
})

app.get('/consultas', (request, response) => {
  return response.send('Hello Consultas!'); 
})

app.post('/consultas', (request, response) => {
 const body = request.body;
 const params = request.params;

 console.log(body);
 console.log(params);

 return response.json(body);

})

app.listen(3333, () => {
  console.log('🌹 servidor rodando na porta 3333!');
});
