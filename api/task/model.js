// build your `Task` model here
const db = require('../../data/dbConfig')

async function fetch() {
    return await db('tasks as t')
        .leftJoin('projects as p', 'p.project_id', 't.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes', 
            't.task_completed',
            'p.project_name',
            'p.project_description')
        .orderBy('p.project_id')

}

async function insert(task) {
    const [id] = await db('tasks').insert(task);
    return await db('tasks').where('task_id', id);
}

module.exports = {
    fetch,
    insert
}