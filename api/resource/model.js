// build your `Resource` model here
const db = require('../../data/dbConfig')

async function fetch() {
    return await db('resources');
}

async function insert(resource) {
    const [id] = await db('resources').insert(resource);
    const [result] = await db('resources').where('resource_id', id);
    return result;
}

module.exports = {
    fetch,
    insert
}