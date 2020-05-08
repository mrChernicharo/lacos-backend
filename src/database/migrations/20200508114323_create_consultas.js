
exports.up = function(knex) {
  return knex.schema.createTable('consultas', function(table){
    table.string('id').notNullable();
    table.string('profissional').notNullable();
    table.datetime('horario').notNullable();
  })
};

exports.down = function(knex) { 
  return knex.schema.dropTable('consultas');
};