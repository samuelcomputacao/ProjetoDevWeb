
exports.up = function(knex) {
    return knex.schema.createTable('usuario_avaliacao', (table)=>{
        table.integer('key_usuario');
        table.integer('key_hortalica');
        table.integer('avaliacao').notNullable();
        table.primary(['key_usuario','key_hortalica'],'usuario_hortalica_pk');
        table.foreign('key_usuario').references('key').inTable('usuario');
        table.foreign('key_hortalica').references('key').inTable('hortalica');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario_avaliacao');
};
