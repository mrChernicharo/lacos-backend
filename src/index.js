const express = require('express');
const { uuid }= require('uuidv4');

const app = express();
app.use(express.json()) // <== Sem isso você não cata os body params


const consultas = [];


//Query params
app.get('/', (request, response) => {

  return response.json(consultas);
});

// request.body
app.post('/consultas', (request, response) => {
  const id = uuid();
  const { profissional, horario } = request.body;

  const consulta = { id, profissional, horario }

  consultas.push(consulta)

 return response.json({ok:'ok'});
});
 
app.put('/consultas/:id', (request, response) => {
  const { id } = request.params;
  const { profissional, horario } = request.body;

  const update = {id, profissional, horario}
  const found = consultas.findIndex(el => el.id === id)
  
  consultas.splice(found, 1, {id, profissional, horario})

  return response.json(update)
})

//route params
app.delete('/consultas/:id', (request, response) => {
  const { id } = request.params;

  const found = consultas.findIndex(el => el.id === id)

  consultas.splice(found, 1)

  return response.status(204).json({ message: 'consulta deletada com sucesso'})
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