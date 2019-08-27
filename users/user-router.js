const express = require("express");

const db = require("./user-model");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user : ", err });
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;

  // select p.id, contents, username from posts as p
  // join users as u on p.user_id = u.id where user_id = id
  db.findPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;

  db.add(userData)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(changes, id)
    .then(count => {
      if (count) {
        res.json(count)
      } else {
        res.status(404).json({message: "No user found"})
      }
      
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user: ", err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
