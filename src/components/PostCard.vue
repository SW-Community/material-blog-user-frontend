<script setup>
import { ref, onMounted, provide, inject, computed } from 'vue';
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router';

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
import '@material/web/icon/icon.js';
import '@material/web/button/text-button.js';


import axios from 'axios';
axios.defaults.withCredentials = true;

let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');


let route = useRoute();
let router = useRouter();


let props = defineProps({
    mpostID: String,
    topicID: Number,
    userID: Number,
    userName: String,
    profile: String,
    mpostTitle: String,
    mpostTime: Date,
    mpostIP: String,
    mpostContent: String,
    lastFoTime: Date,
    likeNum: Number,
    imgList: {
        type: Array,
        default: []
    }
});

let emit = defineEmits(['po-open']);

let likes = ref(0);
let isopen = ref(false);


onMounted(() => {
    likes.value = props.likeNum;
})

function like() {
    axios.post("http://localhost:8080/mposts/add_like", {
        mid: props.mpostID
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            alert("OK");
            likes++;
        }

    }).catch(error => { })
}

function deletem(id) {
    if (confirm("删除这个帖子？")) {
        axios.post("http://localhost:8080/mposts/del_mpost", {
            mid: id
        }, {

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            let payload = res.data;
            if (payload.state == 200) {
                alert("success!");
                location.reload();
            }
            else {
                alert(payload.message);
            }
        }).catch(error => {
            alert('OOPS');
        })
    }
}


function deli(id) {
    if (confirm('删除此媒体？')) {
        
        
        axios.post("http://localhost:8080/postimg/delete_img", {
            imgId: id
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            let payload = res.data;
            if (payload.state == 200) {
                alert("success!");
                location.reload();
            }
            else {
                alert(payload.message);
            }
        }).catch(error=>{
            alert('OOPS')
        })
    }

}
</script>
<template>
    <div id="pcard-container" class="secondary-container">
        <div class="on-secondary-container-text">
            <div id="del-popup">
                <div v-show="userID == currentUserID">
                    <md-text-button id="btn-del-popup" @click="isopen = !isopen">
                        <h3 class="on-secondary-container-text">...</h3>
                    </md-text-button>
                    <md-menu class="on-seconday-container-text" id="usage-menu" :open="isopen" anchor="btn-del-popup"
                        positioning="fixed">
                        <md-menu-item @click="deletem(mpostID)">
                            <div slot="headline">删除帖子</div>
                        </md-menu-item>
                    </md-menu>
                </div>
                <div>
                    <md-filled-button @click="emit('po-open')">↩</md-filled-button>
                </div>
            </div>
            <div>
                <div style="text-align: center;">
                    <h1 class="on-secondary-container-text">{{ mpostTitle }}</h1>
                </div>

                <br>
                <div style="text-align: right;">
                    <h3>{{ userName }}发表于：{{ mpostTime }}</h3>
                </div>

                <hr>
            </div>
            <section>
                {{ mpostContent }}
            </section>
            <md-divider></md-divider>
            <!-- 图像 -->
            <section id="mid-area" v-if="imgList != null || imgList.length > 0" >
                <div v-for="img in imgList">
                    <div class="img-control-panel">
                        <md-text-button @click="deli(img.imgID)">删除</md-text-button>
                    </div>

                    <div v-if="img.type == 0">
                        <img :src="'http://localhost:8080' + img.img" alt="解析图片出现问题" class="img-frame">
                    </div>
                    <div v-if="img.type == 1">
                        <video :src="'http://localhost:8080' + img.img" alt="解析视频出现问题" class="img-frame">
                        </video>
                    </div>
                </div>
            </section>
            <br>
            <div style="margin:5px;">
                本贴最后回复于{{ lastFoTime }}，{{ likes }}点赞
            </div>
            <div>
                <md-icon-button @click="like">
                    <md-icon>favorite</md-icon>
                </md-icon-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
#pcard-container {
    margin: 5px;
    padding: 20px;
    border-radius: 15px;
}

.img-control-panel {
    float: right;
}

#del-popup {
    float: right;
}

#mid-area {
    margin: 10px;
}

.img-frame {
    width: 85%;
}
</style>