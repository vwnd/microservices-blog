import axios from "axios";
import { defineStore } from "pinia";

export type PostComment = {
  id: string;
  content: string;
  postId: string;
  status: "approved" | "rejected" | "pending";
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
      await axios.post("http://posts.com:4000/posts", {
        title,
      });
    },

    async createComment(postId: string, content: string) {
      await axios.post(`http://posts.com:4001/posts/${postId}/comments/`, {
        content,
      });
    },

    async getPostsAndComments() {
      const { data } = await axios.get("http://posts.com:4002/posts");
      this.posts = Object.keys(data).map((k) => data[k]);
      return data;
    },
  },
});
