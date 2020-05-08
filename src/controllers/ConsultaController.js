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

 async delete (request, response) {
  const { id } = request.params;

  const consulta = await connection('consultas').where('id', id)
  //consultas.findIndex(el => el.id === id)

  if (consulta < 0) {
    return response.status(400).json({error: 'não foi possível encontrar essa consulta'})
  }
  await connection('consultas').where('id', id).delete();

  //consultas.splice(found, 1)

  return response.status(204).send();

},

  async update (request, response) {
    const { id } = request.params;
    const { profissional, horario } = request.body;
  
    // const found = consultas.findIndex(el => el.id === id)
    const found = await connection('consultas').where('id', id)
    if (found < 0) {
      return response.status(400).json({error: 'não foi possível encontrar essa consulta'})
    }

    const update = await connection('consultas').where('id', id).update('profissional', profissional)

  
    return response.json({id, profissional, horario});
  },


};