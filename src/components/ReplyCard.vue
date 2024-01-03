<script setup>
import {ref,onMounted,provide,inject} from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'

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
import '@material/web/divider/divider.js';
import '@material/web/list/list.js';

let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');


import axios from 'axios';
axios.defaults.withCredentials = true;

let props=defineProps({
    rlist:Array,
})

let emit =defineEmits(['re-open','re-del']);

</script>
<template>
    <md-list class="secondary-container">
        <md-list-item v-for="reply in rlist">
            <div>
                <div class="btn-delete-and-reply-slot">
                    <md-text-button @click="emit('re-del',reply.fpostID)">🗑️</md-text-button>
                    <md-filled-button @click="emit('re-open',reply.ffloor)">↩</md-filled-button>
                </div>
                <a :name="reply.ffloor"></a>
                <img class="avator on-secondary-container-text" alt="暂无图像" :src="reply.profile"/>  {{ reply.userName }} 发表于 {{ reply.fpostTime }}, IP属地：{{ fpostIP }}<br>
                <div class="reply-tag secondary" v-if="reply.refloor!=null && reply.refloor!=0">
                    <a class="reply-label on-secondary-text" :href="'#'+reply.refloor"><span  class="on-secondary-text ">&lt;&lt;回复{{ reply.refloor }}楼</span></a>
                </div>
            </div>
            <div v-if="reply.ffloor>2" class="on-secondary-container-text">
                {{ reply.ffloor }}楼<br>
            </div>
            <div v-if="reply.ffloor==1" class="on-secondary-container-text">
                沙发<br>
            </div>
            <div v-if="reply.ffloor==2" class="on-secondary-container-text">
                板凳<br>
            </div>
            <div class="on-secondary-container-text">
                {{ reply.fpostContent }}
                <br>
            </div>
            <md-divider></md-divider>
        </md-list-item>
    </md-list>
</template>
<style scoped>
.avator{
    width: 50px; 
    height: 50px; 
    border-radius: 50%;
}
.reply-tag{
    border-radius: 5px;
}
.reply-label{
    text-decoration : none
}
.btn-delete-slot{
    float: right;
}

</style>