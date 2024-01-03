<script setup>
import { ref, onMounted, provide, inject } from 'vue';
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'
import axios from 'axios';

// import PostPreviewCard from '../components/PostPreviewCard.vue';
import PostCard from '../components/PostCard.vue';
import ReplyCard from '../components/ReplyCard.vue'
import AddReplyCard from '../components/AddReplyCard.vue';
import AddMediaDialog from '../components/AddMediaDialog.vue';

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


let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');

axios.defaults.withCredentials = true;


let route = useRoute();
let router = useRouter();

let open = ref(false);

let mmid = ref('');

let id = route.params.id;
mmid.value = id;

function refresh() {
    router.replace('/postDetail/' + id);
}

let postArticle = ref(null);
let images = ref([]);
let list = ref(null);

let replyDOpen = ref(false);
let refloor = ref(0);

function openReply(toRefloor) {
    refloor.value = toRefloor;
    replyDOpen.value = true;
}

function closeReply() {
    refloor.value = 0;
    replyDOpen.value = false;
}


function delR(id) {
    if (confirm('删除这条回复？')) {
        axios.post("http://localhost:8080/fposts/del_fpost", {
            fid: id
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


axios.get("http://localhost:8080/mposts/get_by_mid", {
    params: {
        mid: id,
    }
}).then(res => {
    let payload = res.data;
    //alert(payload.state)
    if (payload.state == 200) {
        postArticle.value = payload.data;
        //todo:加载图片
        axios.get("http://localhost:8080/postimg/get_by_pid", {
            params: {
                postID: mmid.value
            }
        }).then(res=>{
            let payload=res.data;
            if(payload.state==200)
            {
                //alert('KO')
                images.value=payload.data;
            }
            else{
                alert(payload.message)
            }
        }).catch(error=>{
            alert('OOPS!')
        })
    }

}).catch(error => {
    alert(error)
})




axios.get("http://localhost:8080/fposts/get_by_mid", {
    params: {
        mid: id,
    }
}).then(res => {
    let pay = res.data;
    if (pay.state == 200) {
        //alert(payload.data.length)
        list.value = pay.data;
    }
})
    .catch(error => {

    })



</script>
<template>
    <div id="post-article">
        <a name="0"></a>
        <PostCard @po-open="openReply(0)" :mpost-i-d="postArticle.mpostID" :topic-i-d="postArticle.topicID"
            :user-i-d="postArticle.userID" :user-name="postArticle.userName" :profile="postArticle.profile"
            :mpost-title="postArticle.mpostTitle" :mpost-time="postArticle.mpostTime" :mpost-i-p="postArticle.mpostIP"
            :mpost-content="postArticle.mpostContent" :last-fo-time="postArticle.lastFoTime"
            :like-num="postArticle.likeNum"
            :img-list="images">
        </PostCard>
    </div>
    <div id="meida-controls">
        <div>
            <md-filled-button @click="open = true">+上传图片</md-filled-button>
        </div>
        <div>
            <AddMediaDialog :pid="mmid" :is-open="open"></AddMediaDialog>
        </div>
    </div>
    <div id="reply-card">
        <ReplyCard @re-open="openReply" @re-del="delR" :rlist="list"></ReplyCard>
    </div>
    <div id="reply-placeholder" class="on-secondary-container-text" v-if="list == null || list.length == 0">
        <h4>暂无回复</h4>
        <md-filled-button @click="openReply(0)">抢沙发</md-filled-button>
    </div>
    <AddReplyCard @re-close="closeReply" @re-refresh="refresh" v-if="replyDOpen" :mid="mmid" :torefloor="refloor">
    </AddReplyCard>
</template>
<style scoped>
#post-article,
#reply-card {
    margin: 10px;
}

#reply-placeholder {
    text-align: center;
}
</style>