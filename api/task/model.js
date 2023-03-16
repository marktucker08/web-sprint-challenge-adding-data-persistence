// build your `Task` model here
const db = require('../../data/dbConfig')

async function fetch() {
    const rows = await db('tasks as t')
        .leftJoin('projects as p', 'p.project_id', 't.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes', 
            't.task_completed',
            'p.project_name',
            'p.project_description')
        .orderBy('p.project_id')

    const result = []
    
    rows.forEach(row => {
        if (row.task_completed === 0) {
            result.push({...row, task_completed: false})
        } else {
            result.push({...row, task_completed: true})
        }
    })
    return result;

}

async function insert(task) {
    const [id] = await db('tasks').insert(task);
    const [rows] = await db('tasks').where('task_id', id);
    if (rows.task_completed === 0) {
        return ({...rows, task_completed: false})
    } else {
        return ({...rows, task_completed: true})
    }
}

module.exports = {
    fetch,
    insert
}