// build your `Project` model here
const db = require('../../data/dbConfig')

async function fetch() {
    const rows = await db('projects');
    const result = []
    
    rows.forEach(row => {
        if (row.project_completed === 0) {
            result.push({...row, project_completed: false})
        } else {
            result.push({...row, project_completed: true})
        }
    })
    return result;
}

async function insert(project) {
    const [id] = await db('projects').insert(project);
    const [rows] = await db('projects').where('project_id', id);
    if (rows.project_completed === 0) {
        return ({...rows, project_completed: false})
    } else {
        return ({...rows, project_completed: true})
    }
}

module.exports = {
    fetch,
    insert
}