const express = require('express');
const { uuid }= require('uuidv4');

const app = express();
app.use(express.json()) // <== Sem isso você não cata os body params


const consultas = [];


//Query params
app.get('/', (request, response) => {
  const { profissional } = request.query;
  
  if (profissional === undefined) {
    return response.json(consultas);
  } else {
    consultasFiltradas = consultas.filter(el => el.profissional === profissional)

    return response.json(consultasFiltradas)
  }

});

// request.body
app.post('/consultas', (request, response) => {
  try {  
    const id = uuid();
    const { profissional, horario } = request.body;

    const consulta = { id, profissional, horario }

    consultas.push(consulta);

    return response.json(consulta);
  } catch (err){ 
    return response.json({ message: err })
  }
});
 
app.put('/consultas/:id', (request, response) => {
  const { id } = request.params;
  const { profissional, horario } = request.body;

  const found = consultas.findIndex(el => el.id === id)
  if (found < 0) {
    return response.status(400).json({error: 'não foi possível encontrar essa consulta'})
  }

  const update = { id, profissional, horario }
  
  consultas.splice(found, 1, {id, profissional, horario})

  return response.json(update)
});

//route params
app.delete('/consultas/:id', (request, response) => {
    const { id } = request.params;

    const found = consultas.findIndex(el => el.id === id)

    if (found < 0) {
      return response.status(400).json({error: 'não foi possível encontrar essa consulta'})
    }

    consultas.splice(found, 1)

    return response.status(204).send();

});

app.listen(3333, () => {
  console.log('🌹 servidor rodando na porta 3333!');
});

