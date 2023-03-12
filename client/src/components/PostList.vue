<template>
  <div class="d-flex flex-row flex-wrap justify-content-between gap-3">
    <div
      v-for="post in store.posts"
      :key="post.id"
      class="card"
      style="width: 30%"
    >
      <div class="card-body">
        <h3 class="card-title">{{ post.title }}</h3>
        <CommentList :comments="post.comments" />
        <CommentCreate :post-id="post.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePosts } from "@/stores/posts.store";
import { onMounted } from "vue";
import CommentCreate from "./CommentCreate.vue";
import CommentList from "./CommentList.vue";

const store = usePosts();

store.$onAction(({ name, after }) => {
  if (name == "createPost") {
    after(() => {
      store.getPostsAndComments();
    });
  }

  if (name == "createComment") {
    after(() => {
      store.getPostsAndComments();
    });
  }
});

onMounted(async () => {
  await store.getPostsAndComments();
});
</script>

<style scoped></style>
