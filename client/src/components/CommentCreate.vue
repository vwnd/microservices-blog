<template>
  <div>
    <form @submit.prevent="handleCommentSubmit">
      <div class="mb-3">
        <label>New Comment</label>
        <input v-model="commentInput" class="form-control" />
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
  postId: { required: true, type: String },
});

const commentInput = ref("");

async function handleCommentSubmit(event: Event) {
  const { data } = await axios.post(
    `http://localhost:4001/posts/${props.postId}/comments/`,
    {
      content: commentInput.value,
    }
  );

  commentInput.value = "";
}
</script>

<style scoped></style>
