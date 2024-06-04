<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import PostApiInstance from "../api/guide";
const { SinglePost } = PostApiInstance();
const routeId  = ref(router.currentRoute.value.params.id)
const postData = ref({})
async function getSinglePost(){
    try{ 
      const {data} = await  SinglePost(routeId.value)
      postData.value = data
    }catch(error){
        console.log('error', error)
    }
    
}

onMounted(() => {
    getSinglePost()
})
</script>
<template>
    <div class="row">
      <div class="col-6 m-auto">
        <div class="main_content">
          <div class="post_content mb-3">
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
              <div class="post_text">
                <p ><b>{{ postData.title }}</b></p>
                <p>{{ postData.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>