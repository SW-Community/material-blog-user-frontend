<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'


import PostPreviewCardInLList from '../components/PostPreviewCardInList.vue'

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
import '@material/web/fab/branded-fab.js';
import '@material/web/fab/fab.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';

import axios from 'axios';
axios.defaults.withCredentials = true;

let route = useRoute();
let router = useRouter();
let topid=ref(-1);
let topName=ref('')

let topicId = route.params.id;
let topicName=route.params.name;

topid.value=topicId;
topName.value=topicName;

let blogs = ref(null);

function getNowFormatDate() {
    let date = new Date(),
        year = date.getFullYear(), //获取完整的年份(4位)
        month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
        strDate = date.getDate() // 获取当前日(1-31)
    if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
    if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0

    return `${year}-${month}-${strDate}`
}

let date=ref('');
date.value=getNowFormatDate();

function openEdit()
{
    router.replace('/addPost/'+topid.value+'/'+topName.value+'/1')
}

function refresh(topicId, date) {
    if(topicId==-1)
    {
        alert('OOPS!');
        return;
    }
    //alert(date+" "+topicId)
    axios.get("http://localhost:8080/mposts/get_by_day", {
        params: {
            day: date,
            tid: topicId
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            //alert('OK');
            blogs.value = payload.data;
            //alert(payload.data.length)
        }
    }).catch(error => {

    })
}

onMounted(() => {
    refresh(topicId, getNowFormatDate());
})
</script>
<template>
    <div id="crad-container" class="secondary-container">
        <div class="on-secondary-container-text" id="left-controls">
            <md-filled-text-field id="date" v-model="date" type="date" label="日期"></md-filled-text-field>
            主题：{{ topName }}
        </div>
        <div class="on-secondary-container-text" id="right-controls">
            <md-filled-button @click="refresh(topid,date)">刷新</md-filled-button>
        </div>
        <div style="clear: both;">

        </div>
        <div class="on-secondary-container-text">
            <md-list>
                <md-list-item v-for="post in blogs">
                    <PostPreviewCardInLList 
                        :mpost-i-d="post.mpostID" 
                        :user-name="post.userName"
                        :mpost-time="post.mpostTime" 
                        :mpost-title="post.mpostTitle" 
                        :topic-name="post.topicName"
                        :last-fo-time="post.lastFoTime" 
                        :like-num="post.likeNum"
                        :floor-num="post.floorNum">
                    </PostPreviewCardInLList>
                </md-list-item>
            </md-list>
            <div v-if="blogs==null||blogs.length==0" style="text-align: center;">
                <h3>今日无贴</h3>
                <md-text-button @click="openEdit">我要发贴</md-text-button>
            </div>
        </div>
    </div>
    <div id="fab-container" v-if="currentUserID!=-1">
        <md-fab @click="openEdit">
            <md-icon slot="icon">🖊</md-icon>
        </md-fab>
    </div>
</template>
<style scoped>
#card-container {
    border-radius: 15px;
}

#left-controls,#right-controls{
    margin: 5px;
    padding: 5px;
}
#left-controls{
    float: left;
}
#right-controls{
    float: right;
}
#fab-container{
        margin: 5px;
        width: 30px;
        height: 30px;
        position: fixed;
        right: 30px;
        bottom: 10px;
    }
</style>