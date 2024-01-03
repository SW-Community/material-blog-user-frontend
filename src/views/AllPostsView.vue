<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

import PostPreviewCardVue from '../components/PostPreviewCard.vue';

import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/menu/menu-item.js';
import '@material/web/menu/sub-menu.js';
import '@material/web/menu/menu.js';
import '@material/web/button/filled-button.js';
import '@material/web/divider/divider.js';
import '@material/web/icon/icon.js'
import '@material/web/fab/fab.js';
import '@material/web/fab/branded-fab.js';


import axios from 'axios';
import router from '../router';
axios.defaults.withCredentials = true;
let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');

let posts = ref([]);

let topics=ref([]);



axios.get("http://localhost:8080/mposts/get_all_preview").then(res => {

    //alert("成功！")
    let payload = res.data;
    if (payload.state == 200) {
        posts.value = payload.data;
    }
}).catch(error => {

})

function openEdit()
{
    router.replace('/addPost/-1/请选择主题/0')
}

</script>
<template>
    <div v-for="post in posts">
        <PostPreviewCardVue 
            :mpost-i-d="post.mpostID" 
            :user-name="post.userName" 
            :mpost-time="post.mpostTime"
            :mpost-title="post.mpostTitle" 
            :topic-name="post.topicName" 
            :last-fo-time="post.lastFoTime" 
            :floor-num="post.floorNum"
            :like-num="post.likeNum"></PostPreviewCardVue>
    </div>
    <div id="fab-container" v-if="currentUserID!=-1">
        <md-fab @click="openEdit">
            <md-icon slot="icon">edit</md-icon>
        </md-fab>
    </div>
</template>
<style scoped>
    #fab-container{
        margin: 5px;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 30px;
        bottom: 10px;
    }
</style>