<template>
  <ul>
    <li v-for="comment of props.comments" :key="comment.id">
      {{ comment.content }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PostComment } from "@/stores/posts.store";

const props = defineProps<{
  comments: PostComment[];
}>();
</script>

<style scoped></style>
