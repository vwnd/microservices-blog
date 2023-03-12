import axios from "axios";
import { defineStore } from "pinia";

type Post = {
  id: string;
  title: string;
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
    async getPosts() {
      const { data } = await axios.get("http://localhost:4000/posts/");
      this.posts = Object.keys(data).map((k) => data[k]);
    },

    async createPost({ title }: { title: string }) {
      await axios.post("http://localhost:4000/posts", {
        title,
      });
    },
  },
});
