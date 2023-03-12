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
        <CommentList :post-id="post.id" />
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
      store.getPosts();
    });
  }
});

onMounted(async () => {
  await store.getPosts();
});
</script>

<style scoped></style>
