const express = require('express');
const router = express.Router();

const ConsultaController = require('./controllers/ConsultaController');

const { uuid, isUuid }= require('uuidv4');

const consultas = [];


router.use(logRequisicoes) // <== Chamada da 1ª middleware
router.use('/consultas/:id',isIdConsulta)

// middleware console log de requisições
function logRequisicoes(request, response, next) {
  const { method, rawHeaders, url } = request; 
  // console.log(request);  <== muita coisa aqui dentro
  console.log(`[${method}] => http://${rawHeaders[1]}${url}`);

  next();
}

// middleware validação de id
function isIdConsulta(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Id de consulta inválido'})
  }

  next();
}


// Query params
router.get('/', ConsultaController.list);

// request.body
router.post('/consultas', ConsultaController.create);


//route params + request.body
router.put('/consultas/:id', ConsultaController.update);

// route params
router.delete('/consultas/:id', ConsultaController.delete);



module.exports = router;
