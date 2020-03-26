
exports.up = function (knex) {
    return knex.schema.createTable('hortalica', (table) => {
        table.increments('key').primary();
        table.string('nome').notNullable();
        table.string('categoria').notNullable();
        table.integer('classificacao').unsigned();
        table.decimal('valor').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('hortalica');
};
