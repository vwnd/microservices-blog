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
import { usePosts } from "@/stores/posts.store";
import { ref } from "vue";

const props = defineProps({
  postId: { required: true, type: String },
});

const commentInput = ref("");
const postStore = usePosts();

async function handleCommentSubmit() {
  await postStore.createComment(props.postId, commentInput.value);
  commentInput.value = "";
}
</script>

<style scoped></style>
