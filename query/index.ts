import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface PostComment {
  id: string;
  content: string;
  status: string;
}

interface Post {
  id: string;
  title: string;
  comments: PostComment[];
}

const posts: Record<string, Post> = {};

function handleEvent(type, data) {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id)!;

    comment.status = status;
    comment.content = content;
    console.log("CommentUpdated: ", JSON.stringify(comment));
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send();
});

app.listen(4002, async () => {
  console.log("❓ Query - Listening on 4002");

  const res = await axios.get("http://event-bus-service:4005/events");

  for (let event of res.data) {
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
