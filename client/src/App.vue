<script setup lang="ts">
import PostCreate from "./components/PostCreate.vue";
import PostList from "./components/PostList.vue";
</script>

<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">Create Post</h1>
        <PostCreate />
      </div>
    </div>
    <hr />
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">Post List</h1>
        <PostList />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
