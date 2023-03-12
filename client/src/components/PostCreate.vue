<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="postTitle" class="form-control" />
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePosts } from "@/stores/posts.store";

const postTitle = ref("");
const { createPost } = usePosts();

async function handleSubmit(payload: Event) {
  await createPost({ title: postTitle.value });
  postTitle.value = "";
}
</script>

<style scoped></style>
