import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface PostComment {
  id: string;
  content: string;
  postId: string;
}

interface Post {
  id: string;
  title: string;
  comments: PostComment[];
}

const posts: Record<string, Post> = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content, postId });
  }

  res.send();
});

app.listen(4002, () => {
  console.log("❓ Query - Listening on 4002");
});
