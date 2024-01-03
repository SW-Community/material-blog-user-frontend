<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'
import axios from 'axios';

import '@material/web/icon/icon.js';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/menu/menu-item.js';
import '@material/web/menu/sub-menu.js';
import '@material/web/menu/menu.js';
import '@material/web/dialog/dialog.js';
import '@material/web/divider/divider.js';
import '@material/web/radio/radio.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';

let route = useRoute();
let router = useRouter();

axios.defaults.withCredentials = true;

let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');


let tid = ref(-1);
let tName = ref('请选择主题');

let topics = ref([]);

let title = ref('');
let content = ref('');

let open = ref(false);

tid.value = route.params.tid;
tName.value = route.params.tName;
let locked = route.params.locked;

function setSelect(topicID, topicName) {
    tid.value = topicID;
    tName.value = topicName;
}

function submit() {
    if (tid.value < 0) {
        alert("请选择一个主题！");
        return;
    }
    if (title.value.length == 0 || content.value.length == 0) {
        alert("贴文和标题不能为空！")
        return;
    }
    axios.post('http://localhost:8080/mposts/new_mpost', {
        topicID: tid.value,
        userID: currentUserID.value,
        mpostTitle: title.value,
        mpostContent: content.value
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            alert('帖子发布成功！')
        }
        else {
            alert(payload.state)
        }
    }).catch(error => {
        alert('OOPS!');
    });
}

function back() {
    if (locked == 0) {
        router.replace('/posts');
    }
    else {
        router.replace('/topicAndDate/' + route.params.tid + '/' + route.params.tName);
    }
}


onMounted(() => {
    if (locked == 0) {
        axios.get('http://localhost:8080/topics/getall').then(res => {
            let payload = res.data;
            if (payload.state == 200) {
                topics.value = payload.data;
            }
        }).catch(error => {

        })
    }
})


</script>
<template>
    <div>
        <div id="page-title-con" class="on-surface-text">
            <h1>发表您的帖子</h1>
        </div>

        <div id="topic-selector-con">
            主题：{{ tName }}
            <md-filled-button :disabled="locked == 1" @click="open = !open">
                修改
            </md-filled-button>
            <md-dialog class="secondary-container" id="select-dialog" :open="open" v-show="open">
                <div slot="headline" class="on-secondary-container-text">
                    选择主题
                </div>
                <div slot="content" id="list-con">
                    <form id="form-id" method="dialog">
                        <md-list class="on-secondary-container-text">
                            <md-list-item>
                                <md-divider></md-divider>
                                <md-radio name="tp-radio" :checked="locked == 1" value='-1'
                                    @click="setSelect(-1, '请选择主题')"></md-radio>请选择主题
                            </md-list-item>
                            <md-list-item v-for="topic in topics">
                                <md-divider></md-divider>
                                <md-radio name="tp-radio" :value="topic.topicID"
                                    @click="setSelect(topic.topicID, topic.topicName)"></md-radio>{{ topic.topicName }}
                            </md-list-item>
                        </md-list>
                    </form>
                </div>

                <div slot="actions" style="text-align: right;">
                    <md-text-button form="form-id" @click="open = false">OK</md-text-button>
                </div>
            </md-dialog>
        </div>
        <div style="clear: both;"></div>
        <div>
            <md-divider></md-divider>
            <div>
                <div class="edit-area">
                    <md-filled-text-field class="edit-area" label="请输入标题" maxlength="30" v-model="title">
                    </md-filled-text-field>
                </div>
                <div class="edit-area">
                    <md-filled-text-field class="edit-area" type="textarea" label="请输入内容" maxlength="255" v-model="content">
                    </md-filled-text-field>
                </div>
            </div>
            <div class="submit-area">
                <md-text-button @click="back">取消</md-text-button>
                <md-filled-button @click="submit">提交</md-filled-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
#page-title-con,
#topic-selector-con {
    margin: 5px;
    padding: 2px;
}

#page-title-con {
    float: left;
}

#topic-selector-con {
    float: right;
}

.edit-area {
    width: 95%;
    margin: 5px;
}

.submit-area {
    margin: 10px;
    text-align: right;
}

#select-dialog {
    padding: 10px;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    z-index: 9999999999;
}

#list-con {
    height: 400px;
    overflow: auto;
}
</style>