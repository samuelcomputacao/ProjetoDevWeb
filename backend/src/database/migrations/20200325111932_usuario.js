
exports.up = function(knex) {
    return knex.schema.createTable('usuario', (table)=>{
        table.increments('key').primary();
        table.string('nome').notNullable();
        table.string('cpfCnpj').notNullable();
        table.string('funcao').notNullable();
        table.string('senha').notNullable();
        table.integer('tipoUsuario').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuario');
};
