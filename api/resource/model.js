// build your `Resource` model here
const db = require('../../data/dbConfig')

async function fetch() {
    return await db('resources');
}

async function insert(resource) {
    const [id] = await db('resources').insert(resource);
    return await db('resources').where('resource_id', id);
}

module.exports = {
    fetch,
    insert
}