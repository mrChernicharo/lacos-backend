const connection = require('../database/connection');

const { uuid, isUuid }= require('uuidv4');


module.exports = {
  async list(request, response) {
    const { profissional } = request.query;
    if (profissional === undefined) {
      const consultas = await connection('consultas').select('*');

      return response.json(consultas);
    } else {
      const consultasFiltradas = await connection('consultas').where('profissional', profissional).select('*');
      

      return response.json(consultasFiltradas)
    }

  },


  async create(request, response) {
    const id = uuid();
    const { profissional, horario } = request.body;


    const consulta = await connection('consultas').insert({
      id,
      profissional,
      horario,
    })


    return response.json({ id, profissional, horario});
  },


  // async update (request, response) {
  //   const { id } = request.params;
  //   const { profissional, horario } = request.body;
  
  //   // const found = consultas.findIndex(el => el.id === id)
  //   const found = await connection('consultas').where('id', id).update('profissional', profissional)
  //   if (found < 0) {
  //     return response.status(400).json({error: 'não foi possível encontrar essa consulta'})
  //   }
  
  //   // const update = { id, profissional, horario }
    
  //   // consultas.splice(found, 1, {id, profissional, horario})
  
  //   return response.json(found);
  // },
};