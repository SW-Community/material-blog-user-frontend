<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
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
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/button/text-button.js';

import axios from 'axios';
axios.defaults.withCredentials = true;


let props=defineProps({
    mid:String,
    torefloor:Number,
})

let emit=defineEmits(['re-close','re-refresh']);

//import CloseMenuEvent from '@material/web/menu/internal/controllers/shared.js';
//import {Corner, FocusState, MdMenu, MenuItem} from '@material/web/menu/menu.js';

let route = useRoute();
let router = useRouter();

let currentUserID=inject('currentUserID');
let currentUserName=inject('currentUserName');

let content=ref('');

function sendReply()
{
    alert('loading '+props.mid+" "+currentUserID.value)
    axios.post('http://localhost:8080/fposts/new_fpost',{
        mpostID:props.mid,
        userID:currentUserID.value,
        fpostContent:content.value,
        refloor:props.torefloor
    },{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=>{
        let payload=res.data;
        if(payload.state==200)
        {
            alert("发表成功！");
            emit('re-close');//关闭对话框
            //刷新UI
            emit('re-refresh');
        }
        else
        {
            alert(payload.state)
        }
    }).catch(error=>{
        alert('OOPS!');
    })
}

</script>
<template>
<div id="card-container" class="secondary-container">
    <div class="on-secondary-container-text">
        <div id="tip" class="on-secondary-container-text">
            <h3 v-if="torefloor!=0">回复{{ torefloor }}楼</h3>
            <h3 v-else>回复楼主</h3>
        </div>
        <div id="close" class="on-secondary-container-text">
            <md-text-button @click="emit('re-close')">X</md-text-button>
        </div>
        <div style="clear: both;"></div>
    </div>
    <div class="on-secondary-container-text" style="text-align: center;">
         <md-filled-text-field 
            id="reply-area-textbox"
            type="textarea"
            label="编辑你的回复"
            maxLength="255"
            v-model="content">
        </md-filled-text-field>
    </div>
   
    <div>
        <md-text-button @click="emit('re-close')">取消</md-text-button>
        <md-filled-button @click="sendReply">发送</md-filled-button>
    </div>
    
</div>
</template>
<style scoped>
#card-container{
    margin: 5px;
    padding: 20px;
    border-radius: 15px;
 }
#tip,#close{
    padding:4px;
}

 #tip{
    float: left;
 }
 #close{
    float: right;
 }

 #reply-area-textbox{
    width: 98%;
 }
</style>