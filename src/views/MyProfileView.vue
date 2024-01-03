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
import '@material/web/button/filled-button.js';
import '@material/web/divider/divider.js';
import '@material/web/icon/icon.js'

import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';


let route = useRoute();
let router = useRouter();

axios.defaults.withCredentials = true;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let inputBtn=ref(null);

let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');

let userID = ref(-1);
let userName = ref('');
let email = ref('');
let gender = ref(1);
let profile = ref('')

function logout() {
    //todo:发送清除session
    axios.post("http://localhost:8080/users/log_out",{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(res => {

    }).catch(error => {

    })
    sessionStorage.removeItem('currentUserID');
    sessionStorage.removeItem('currentUserName');
    currentUserID.value = -1;
    currentUserName.value = "请登录";
    router.replace("/");

}

function modify() {
    let data = new FormData();
    data.set('userName', userName.value);
    data.set('emaail', email);

    let x = document.getElementById("girl-radio");
    if (x.checked) {
        gender.value = 0;
    }
    else {
        gender.value = 1;
    }
    data.set('gender', gender.value);

    axios.post("http://localhost:8080/users/change_info", data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            alert("修改成功，请重新登陆");
            logout();
        }

    }).catch(error => {

    });
}


function selectImg()
{
    let comp=inputBtn.value;
    comp.dispatchEvent(new MouseEvent('click'));
}

function modifyImg()
{
    let img=document.getElementById("icon-file");
    img.submit();
}

// function test()
// {
//     axios.get("http://localhost:8080/users/test_login").then(res=>{
//         let payload=res.data;
//         alert(payload.data)
//     })
//     .catch(error=>{})
// }

onMounted(() => {

    if (currentUserID.value == -1) {
        alert("没登陆！")
        //todo:返回登录页面
        router.replace("/")
        return;
    }
    axios.get("http://localhost:8080/users/get_by_uid", {
        params: {
            uid: currentUserID.value
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            let user = payload.data;
            userID.value = currentUserID.value;
            userName.value = user.userName;
            gender.value = user.gender;
            email.value = user.email;
            profile.value = user.profile;
            if (gender.value == 0) {
                document.getElementById("girl-radio").checked = true;
            }
            else {
                document.getElementById("boy-radio").checked = true;
            }

        }
    }).catch(error => {
        alert("登录异常请重新登录");
        return;
    })

})

</script>
<template width="100%">
    <div>
        <div>
            <h1 class="on-surface-text">账户&隐私设置</h1>
            <br>
            <div class="outline" width="90%" height="10px"></div>
        </div>
        <div>
            <section class="on-surface-text">
                <img src="../assets/Android-Logo.png" width="200" height="100" alt="无头像" />
                <form id="imgForm" method="post" action="http://localhost:8080/users/change_avatar">
                    <input type="file" ref="inputBtn" id="icon-file" style="display: none;">
                </form>
                <md-text-button @click="selectImg" trailing-icon>
                    选择新头像
                    <svg slot="icon" viewBox="0 0 48 48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"/></svg>
                </md-text-button>
                <md-filled-tonal-button @click="modifyImg">
                    修改头像
                </md-filled-tonal-button>
                <br>
                <md-filled-text-field label="用户ID（注册后不可修改）" v-model="userID" readonly></md-filled-text-field>
                <br>
                <md-outlined-text-field label="用户名" v-model="userName"></md-outlined-text-field>
                <br>
                <md-outlined-text-field label="电子邮件地址" v-model="email"></md-outlined-text-field>
                <div class="column">
                    <div class="radio-label">
                        <md-radio id="girl-radio" name="with-labels" value='女'>
                        </md-radio>
                        <label for="girl-radio" class="on-surface-text">我是女生</label>
                    </div>
                    <div class="radio-label">
                        <md-radio id="boy-radio" name="with-labels" value='男'>
                        </md-radio>
                        <label for="boy-radio" class="on-surface-text">我是男生</label>
                    </div>
                </div>
                <br>
                <md-filled-button @click="modify">保存修改</md-filled-button>
                <!-- <button @click="test">登陆了吗</button> -->
            </section>
        </div>
    </div>
</template>