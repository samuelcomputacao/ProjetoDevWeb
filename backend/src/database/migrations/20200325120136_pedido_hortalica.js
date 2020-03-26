
exports.up = function(knex) {
    return knex.schema.createTable('pedido_hortalica', (table)=>{
        table.integer('key_pedido');
        table.integer('key_hortalica');
        table.integer('quantidade').notNullable();
        table.primary(['key_pedido','key_hortalica'],'pedido_hortalica_pk');
        table.foreign('key_pedido').references('key').inTable('pedido');
        table.foreign('key_hortalica').references('key').inTable('hortalica');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedido_hortalica');
};
