<script setup>
import { ref, inject,provide,watch,computed } from 'vue'
import axios from 'axios'
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/radio/radio.js';
import '@material/web/icon/icon.js';
import { useRoute,useRouter } from 'vue-router';

axios.defaults.withCredentials = true;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let route=useRoute();
let router=useRouter();

let currentUserID=inject('currentUserID');
let currentUserName=inject('currentUserName');

let username = ref('');
let password = ref('');

let userName = ref('');
let email = ref('');
let gender = ref(0);
//let profile = ref('')

let isLogin=ref(true);

function tabLogin()
{
    isLogin.value=true;
}
function tabReg()
{
    isLogin.value=false;
}


function login(e) {
    e.preventDefault();
    let data = new FormData();
    data.set("username", username.value);
    data.set("password", password.value);

    axios.post("http://localhost:8080/users/login", data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(res => {
        //alert(res.data);
        let data=res.data;

        if(data.state==200)
        {
            alert(data.data.userID+"，欢迎回来！");

            
            
            sessionStorage.setItem('currentUserID',data.data.userID);
            sessionStorage.setItem('currentUserName',data.data.userName);

            currentUserID.value=sessionStorage.getItem('currentUserID');
            currentUserName.value=sessionStorage.getItem('currentUserName');
            
            //done: 修改路由
            router.replace("/topics");
        }
        else
        {
            alert('登陆失败'+data.message);
        }
    }).catch(error=>{

    })
}

function register(e)
{
    //alert("!")
    e.preventDefault();
    let pwd=password.value;
    let pwd1= document.getElementById('confirm-pwd').value;

    if(pwd!=pwd1)
    {
        alert("密码不一致，请检查");
        return;
    }

    let data=new FormData();
    data.set('userName',userName.value);
    data.set('password',password.value);
    //data.set('profile',profile.value);
    data.set('email',email.value);

    let x=document.getElementById("girl-radio");
    if(x.checked)
    {
        gender.value=0;
    }
    else
    {
        gender.value=1;
    }
    data.set('gender',gender.value);
    //alert(gender.value);

    axios.post("http://localhost:8080/users/reg", data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(res => {
        //alert(res.data);
        let data=res.data;

        if(data.state==200)
        {
            alert('注册成功');
            //todo: 修改路由
        }
        else
        {
            alert('注册失败'+data.message);
        }
    }).catch(error=>{

    })

}
</script>
<template id="container" class="on-surface">
    <md-tabs>
        <md-primary-tab>
            <md-icon slot="icon" @click="tabLogin">登录</md-icon>
        </md-primary-tab>
        <md-primary-tab>
            <md-icon slot="icon" @click="tabReg">注册</md-icon>
        </md-primary-tab>
    </md-tabs>

    <div v-if="isLogin">
        <h3 class="on-surface-text">登录</h3>
        <from>
            <md-outlined-text-field label="用户名" v-model="username"></md-outlined-text-field>&nbsp;
            <br>
            <md-outlined-text-field label="密码" v-model="password"></md-outlined-text-field>
            &nbsp;
            <br>
            <md-filled-button @click="login">登录</md-filled-button>
        </from>
    </div>
    
    <div v-else>
        <h3 class="on-surface-text">注册</h3>
        <form>
            <md-outlined-text-field label="用户名" v-model="userName"></md-outlined-text-field>&nbsp;
            <br>
            <md-outlined-text-field label="密码" v-model="password"></md-outlined-text-field>&nbsp;
            <md-outlined-text-field id="confirm-pwd" label="确认密码"></md-outlined-text-field>&nbsp;
            <br>
            <div class="column">
                <div class="radio-label">
                    <md-radio id="girl-radio" name="with-labels" value='女' v-model="gender" checked>
                    </md-radio>
                    <label for="girl-radio" class="on-surface-text">我是女生</label>
                </div>
                <div class="radio-label">
                    <md-radio id="boy-radio" name="with-labels" value='男' v-model="gender">
                    </md-radio>
                    <label for="boy-radio" class="on-surface-text">我是男生</label>
                </div>
            </div>
            <md-outlined-text-field label="电子邮件地址" v-model="email"></md-outlined-text-field>&nbsp;
            <br>
            <md-filled-button @click="register">注册</md-filled-button>
        </form>
    </div>
</template>

<style scoped>
#container {

    text-align: center;
}
</style>