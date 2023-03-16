/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments('project_id');
        tbl.string('project_name', 255)
            .notNullable();
        tbl.string('project_description');
        tbl.boolean('project_completed')
            .defaultTo('false');
    })
    .createTable('tasks', tbl => {
        tbl.increments('task_id');
        tbl.string('task_description', 255)
            .notNullable();
        tbl.string('task_notes');
        tbl.boolean('task_completed')
            .defaultTo('false');
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects');
    })
    .createTable('resources', tbl => {
        tbl.increments('resource_id');
        tbl.string('resource_name', 255)
            .notNullable()
            .unique();
        tbl.string('resource_description');
    })
    .createTable('project_resources', tbl => {
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects');
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('resource_id')
            .inTable('resources');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
