const { db } = require("../utils/admin");

exports.getAllPosts = (req, res) => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let posts = [];
      data.forEach(post => {
        posts.push({
          postId: post.id,
          text: post.data().text,
          userHandle: post.data().userHandle,
          createdAt: post.data().createdAt
        });
      });
      return res.json(posts);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.addPost = (req, res) => {
  const newPost = {
    text: req.body.text,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString()
  };

  db.collection("posts")
    .add(newPost)
    .then(doc => res.json({ message: `Post ${doc.id} was successfully added` }))
    .catch(err => res.status(500).json({ error: "Smth went wrong" }));
};
