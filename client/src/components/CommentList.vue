<template>
  <ul>
    <li v-for="comment of props.comments" :key="comment.id">
      {{ getContentByStatus(comment) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PostComment } from "@/stores/posts.store";

const props = defineProps<{
  comments: PostComment[];
}>();

function getContentByStatus(comment: PostComment): string {
  const statusMap: Record<PostComment["status"], string> = {
    approved: comment.content,
    pending: "This comment is pending moderation.",
    rejected: "This comment seems innapropriated and was rejected.  ",
  };

  return statusMap[comment.status]
    ? statusMap[comment.status]
    : "This comment has an unhandle status.";
}
</script>

<style scoped></style>
