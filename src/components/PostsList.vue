<script setup>
import DialogModal from "@/components/dialog-modal.vue";
import PostApiInstance from "../api/guide";
import { defineProps, ref } from "vue";
import { useToast } from "vue-toast-notification";
import router from "@/router";
const $toast = useToast({ position: "bottom" });
const { CREATE, UpdatePost } = PostApiInstance();
const viewActions = ref(false);
const hoveredCol = ref(0);
const deleteModal = ref(false);
const editModal = ref(false);
const actionPost = ref({});
const formData = ref({});
const loading = ref(false);
const props = defineProps({
  posts: [],
});
function editPost(post) {
  formData.value = post;
  editModal.value = true;
}
function newPost() {
  formData.value = {};
  editModal.value = true;
}
async function submit() {
  try {
    loading.value = true;
    if (formData.value.id) {
      await UpdatePost(formData.value);
    } else {
      await CREATE(formData.value);
    }
    editModal.value = false;
    $toast.success("Updated Successfully");
    formData.value = {};
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="main_content">
          <div class="post_content mb-3" v-for="(post, index) in posts">
            <div>
              <div class="user_details">
                <div class="user_profie">
                  <img src="../assets/images/user.jpg" alt="">
                </div>
                <div class="user_name">
                  lorem Ipsum
                </div>
              </div>
              <div>
                <img src="../assets/images/post.png" alt="" />
              </div>
              <router-link
                :to="{ path: `/single-post/${post.id}` }"                
                class="post_text"
              >
                <p class="post_title">{{ post.title }}</p>
                <p class="post_body">{{ post.body }}</p>
              </router-link>
              <div
                @mouseover="(viewActions = true), (hoveredCol = index)"
                @mouseleave="(viewActions = false), (hoveredCol = index)"
                class="text-center"
              >
                <div class="dropdown">
                  <span
                    class="dropdown-toggle post_toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                  >
                    ...
                  </span>
                  <div
                    class="dropdown-menu"
                    :class="{ show: hoveredCol === index && viewActions }"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <span class="dropdown-item" @click="editPost(post)"
                      >Edit</span
                    >
                    <span
                      class="dropdown-item"
                      @click="(actionPost = post), (deleteModal = true)"
                      >Delete</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="create_post">
          <button type="button" class="btn btn-primary" @click="newPost">
            +
          </button>
        </div>
      </div>
    </div>
    <dialog-modal
      v-if="deleteModal"
      @save="$emit('deletePost', actionPost.id), (deleteModal = false)"
      @close="deleteModal = false"
      :loading="loading"
      :title="'Do you want to Delete Post ?'"
      :btnText="'Delete'"
    >
      <template #content>
        <p>Do you want to Delete Post ?</p>
      </template>
    </dialog-modal>

    <dialog-modal
      v-if="editModal"
      @save="$emit('deletePost', actionPost.id), (editModal = false)"
      @close="editModal = false"
      :loading="loading"
      :title="'New Post'"
      :btnText="'Submit'"
      :button="false"
    >
      <template #content>
        <div></div>
        <div class="form-group">
          <label for="title">Title</label>
          <textarea
            class="form-control"
            id="title"
            rows="3"
            v-model="formData.title"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <textarea
            class="form-control"
            id="body"
            v-model="formData.body"
            rows="3"
          ></textarea>
        </div>
        <div class="text-end">
          <button
            type="button"
            class="btn btn-secondary m-3"
            :disabled="loading"
            @click="emit('close')"
          >
            Close
          </button>
          <button
            type="button"
            @click="submit"
            class="btn btn-primary"
            :disabled="loading"
          >
            Submit
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </template>
    </dialog-modal>
  </div>
</template>

<style>
.dropdown-toggle:after {
  display: none !important;
}
img {
  max-width: 100%;
}
.post_content {
  border: 1px solid gray;
  padding-bottom: 15px;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
}
.post_text {
  padding: 5px 15px 0;
  position: relative;
  text-decoration: none;
  display: block;
}
.post_title {
  margin: 0;
  font-weight: 600;
  font-size: 15px;
  color: #000;
}
.post_body {
  margin: 5px 0 0;
  font-size: 14px;
  max-height: 21px;
  overflow: hidden;
  color: #000;
}
.create_post {
  position: fixed;
  bottom: 20px;
  right: 20%;
}
.create_post button {
  font-size: 20px;
  font-weight: 800;
}
.dropdown {
  position: absolute !important;
  top: 60px;
  right: 10px;
}
.post_toggle {
  font-size: 20px;
  color: #fff;
  font-weight: 807;
}
.dropdown-menu {
    right: 0;
}
.user_profie {
    max-width: 45px;
    max-height: 45px;
    overflow: hidden;
    border-radius: 100px;
}
.user_profie img {
    width: 100%;
}
.user_details {
    display: flex;
    align-items: center;
    padding: 5px 5px;
}
.user_name {
    margin-left: 10px;
    font-weight: 700;
    text-transform: capitalize;
}
</style>