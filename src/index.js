const express = require('express');
const cors = require('cors')
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()) // <== Sem isso você não cata os body params
app.use(routes);

app.listen(3333, () => {
  console.log('🌹 servidor rodando na porta 3333!');
});