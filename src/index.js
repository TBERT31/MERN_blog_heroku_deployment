import express from "express";
import path from "path";
import cors from "cors";
import {
  getPosts,
  getReviews,
  getSinglePost,
  insertPost,
  insertReview,
} from "./routes";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// basic route
// app.get("/", (_, res) => {
//   res.send("Hello Express ! this is a example of RESTful API ");
// });

// routes and handlers
app.get("/posts", getPosts);
app.get("/reviews", getReviews);
app.get("/posts/:id", getSinglePost);
app.post("/posts/insert", insertPost);
app.post("/reviews/insert", insertReview);

// server client statically
const public_path = path.join(__dirname, "../build");
app.use(express.static(public_path));
app.get("*", (_, res) => {
  res.sendFile(path.join(public_path, "index.html"));
});

//connect to server
app.listen(PORT, () => {
  console.log(`Hello Express, server is up and running on port ${PORT}`);
});
