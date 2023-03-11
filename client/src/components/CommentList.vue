<template>
  <ul>
    <li v-for="comment of comments" :key="comment.id">
      {{ comment.content }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

const props = defineProps({
  postId: { type: String, required: true },
});

const comments = ref<{ id: string; content: string }[]>();

onMounted(async () => {
  const { data } = await axios.get(
    `http://localhost:4001/posts/${props.postId}/comments`
  );

  comments.value = data;
});
</script>

<style scoped></style>
