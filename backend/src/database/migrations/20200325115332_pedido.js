
exports.up = function(knex) {
    return knex.schema.createTable('pedido', (table)=>{
        table.increments('key').primary();
        table.date('data').notNullable();
        table.integer('key_cliente').notNullable();

        table.foreign('key_cliente').references('key').inTable('usuario');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pedido');
};
