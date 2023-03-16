// build your `Project` model here
const db = require('../../data/dbConfig')

async function fetch() {
    return await db('projects');
}

async function insert(project) {
    const [id] = await db('projects').insert(project);
    return await db('projects').where('project_id', id);
}

module.exports = {
    fetch,
    insert
}