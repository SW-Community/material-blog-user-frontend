<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import '@material/web/icon/icon.js';
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
import '@material/web/list/list-item.js';
import '@material/web/list/list.js';

import axios from 'axios';
axios.defaults.withCredentials = true;


//import CloseMenuEvent from '@material/web/menu/internal/controllers/shared.js';
//import {Corner, FocusState, MdMenu, MenuItem} from '@material/web/menu/menu.js';

let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');


let router=useRouter();
let route=useRoute();

let topics=ref([]);

function jmp(id,name)
{
    router.replace('/topicAndDate/'+id+"/"+name)
}

onMounted(()=>{
    axios.get("http://localhost:8080/topics/getall").then(res=>{
        let payload=res.data;
        if(payload.state==200)
        {
            topics.value=payload.data;
        }
    }).catch(error=>{

    })
})

</script>
<template>
<div class="on-secondary-container-text">
    <h1>全部主题</h1>
    <md-list>
        <md-divider></md-divider>
        <md-list-item v-for="topic in topics">
            <h1 @click="jmp(topic.topicID,topic.topicName)">{{ topic.topicName }}</h1>
            <div>{{ topic.topicIntro }}</div>
        </md-list-item>
    </md-list>
</div>
</template>
<style scoped>

</style>