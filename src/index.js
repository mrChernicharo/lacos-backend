const express = require('express');

const app = express();
app.use(express.json()) // <== Sem isso você não cata os body params


const consultas = [];


//Query params
app.get('/', (request, response) => {
  const { user, hora } = request.query;
  console.log(user) 
  console.log(hora)

  return response.send('ok!');
});

// request.body
app.post('/consultas', (request, response) => {
 const body = request.body;
 console.log(body);

 return response.json(body);
});


app.delete('/consultas/:id/:hora', (request, response) => {
  const { hora, id } = request.params;
  console.log(hora)
  console.log(id)
  return response.json({ok: 'ok'})
});

app.listen(3333, () => {
  console.log('🌹 servidor rodando na porta 3333!');
});


// QUERY PARAMS ==> informações passadas na URL | filtros e paginação 
// http://localhost:3333/?user=felipe&hora=1537




//ROUTE PARAMS ==> informações passadas na URL e Rota no Backend devem coincidir 
// frontend: http://localhost:3333/consultas/123/1430
// backend: app.delete('/consultas/:id/:hora', (request, response) => {
  
// forma um par key/value { id: 123, hora: 1430 } 
// Serve pra controle e identificação de coisas pra deletar ou alterar





// BODY ==> passado no corpo da requisição | geralmente com dados de Formulários 
// JSON  | usado para criar algo, um cadastro, um novo registro de algo no backend...