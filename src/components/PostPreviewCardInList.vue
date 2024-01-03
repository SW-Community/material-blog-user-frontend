<script setup>
import { ref } from 'vue';
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


let route = useRoute();
let router = useRouter();

let props = defineProps({
    mpostID: String,
    userName: String,
    mpostTitle: String,
    topicName: String,
    mpostTime: Date,
    lastFoTime: Date,
    likeNum: Number,
    floorNum:Number
});

function jmp() {
    router.replace('/postDetail/' + props.mpostID);
}

</script>
<template>
    <div id="item-container" class="on-secondary-container-text" style="float: left">
        <h1>{{ mpostTitle }}</h1>
        分类：{{ topicName }}&nbsp;&nbsp;由{{ userName }}发布于{{ mpostTime }}&nbsp;{{ likeNum }}点赞&nbsp;{{floorNum }}跟帖&nbsp;最后回复于{{ lastFoTime }}
    </div>
    <div style="float: right;">
        <md-filled-button @click="jmp">查看</md-filled-button>
    </div>
    <div style="clear:both"></div>
</template>
<style scoped>
#item-container{
    margin: 5px;
}
</style>