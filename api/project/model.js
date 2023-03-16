// build your `Project` model here
const db = require('../../data/dbConfig')

async function fetch() {
    return await db('projects');
}

function insert(project) {
    return db('projects').insert(project);
}

module.exports = {
    fetch,
    insert
}