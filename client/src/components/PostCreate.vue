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
import axios from "axios";

const postTitle = ref("");

async function handleSubmit(payload: Event) {
  await axios.post("http://localhost:4000/posts", {
    title: postTitle.value,
  });

  postTitle.value = "";
}
</script>

<style scoped></style>
