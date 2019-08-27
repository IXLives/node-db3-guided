const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findPosts,
  add,
  update,
  remove
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findPosts(userid) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "p.contents", "u.username")
    .where({ user_id: userid });
}

//resolves to newly created user
function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(ids => {
        return findById(id)
    })
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
