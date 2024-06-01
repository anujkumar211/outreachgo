<script setup>
import PostApiInstance from "../api/guide";
import PostsList from "@/components/PostsList.vue";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
const $toast = useToast({ position: "bottom" });
const { AllPosts, ThrashPost } = PostApiInstance();
const posts = ref([]);
async function getGuides() {
  posts.value = [];
  const data = await AllPosts();
  posts.value = data.data;
}
async function deletePost(id) {
  try {
    await ThrashPost(id);
    await getGuides();
    $toast.success("Deleted Successfully");
  } catch (error) {
    console.log("error", error);
  }
}
onMounted(() => {
  getGuides();
});
</script>

<template>
  <main>
    <PostsList :posts="posts" @deletePost="deletePost"></PostsList>
  </main>
</template>
