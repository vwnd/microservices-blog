import axios from "axios";
import { defineStore } from "pinia";

export type PostComment = {
  id: string;
  content: string;
  postId: string;
};

type Post = {
  id: string;
  title: string;
  comments: PostComment[];
};

interface PostsState {
  posts: Post[];
}

export const usePosts = defineStore({
  id: "posts",
  state: (): PostsState => {
    return {
      posts: [],
    };
  },
  actions: {
    async createPost({ title }: { title: string }) {
      await axios.post("http://localhost:4000/posts", {
        title,
      });
    },

    async getPostsAndComments() {
      const { data } = await axios.get("http://localhost:4002/posts");
      this.posts = Object.keys(data).map((k) => data[k]);
      return data;
    },
  },
});
