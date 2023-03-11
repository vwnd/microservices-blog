<template>
  <div class="d-flex flex-row flex-wrap justify-content-between gap-3">
    <div v-for="post in posts" :key="post.id" class="card" style="width: 30%">
      <div class="card-body">
        <h3 class="card-title">{{ post.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

type Post = {
  id: string;
  title: string;
};

const posts = ref<Post[]>([]);

onMounted(async () => {
  const { data } = await axios.get("http://localhost:4000/posts/");
  posts.value = Object.keys(data).map((k) => data[k]);
});
</script>

<style scoped></style>
