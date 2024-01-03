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


import axios from 'axios';
axios.defaults.withCredentials = true;


//import CloseMenuEvent from '@material/web/menu/internal/controllers/shared.js';
//import {Corner, FocusState, MdMenu, MenuItem} from '@material/web/menu/menu.js';

let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');

let open = ref(false);


let route = useRoute();
let router = useRouter();
//let link=useLink();

function userInfo() {
  router.replace('/myProfile')
}


function about() {
  router.replace('/about');
}

function all()
{
  router.replace('/posts')
}

function topics()
{
  router.replace('/topics')
}

function logout() {
  //todo:发送清除session
  axios.post("http://localhost:8080/users/log_out", null,{
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

</script>

<template>
  <header id="head" class="secondary-container">
    <div id="search-area">
      <md-outlined-text-field id="search-box" placeholder="搜索你想要的">
        <md-icon slot="leading-icon">search</md-icon>
      </md-outlined-text-field>
    </div>
    <div id="user-control">
      <md-filled-button  id="usage-anchor" @click="open = !open">{{ currentUserName }}</md-filled-button>
    <md-menu  id="usage-menu" v-bind:open="open" anchor="usage-anchor">
      <md-menu-item>
        <div class="on-seconday-container-text" slot="headline" @click="userInfo">你的资料</div>
      </md-menu-item>
      <md-menu-item>
        <div class="on-seconday-container-text" slot="headline" @click="about">设置&关于</div>
      </md-menu-item>
      <md-menu-item v-show="currentUserID != -1">
        <div class="on-seconday-container-text" slot="headline" @click="logout">退出登录</div>
      </md-menu-item>
    </md-menu>
    </div>
    <div style="clear:both"></div>
  </header>
  <br>
  <section id="sidebar" class="secondary-container">
    <div id="sb-div">
      <md-filled-button @click="all">
        博客
      </md-filled-button>
      <md-filled-button @click="topics">
        主题
      </md-filled-button>
      <md-filled-button @click="router.replace('/comingSoon')">
        收藏
      </md-filled-button>
    </div>
  </section>
  <section id="main" class="surface">
    <RouterView></RouterView>
  </section>
  <footer id="foot">刘一涵</footer>
</template>

<style>
* {
  margin: 0px;
  padding: 0px;
}

#search-area{
  /* text-align: center; */
  /*两个display设置后这个属性就起作用*/
  float: left;
  padding: 5.5px;
  width: 70%;
  text-align: center;
}
#user-control{
  float: right; 
  margin: 5px;
}

#search-box{
  height: 46px;
}

#head {
  z-index: 100000;
  height: 60px;
  /* background-color: burlywood; */
  width: 100%;
  position: fixed;
  top: 0;
  /* text-align: right; */
}

#sidebar {
  z-index: 99999;
  /* background-color: burlywood; */
  text-align: center;
}

#main {
  /* width: 100%; */
  /* background-color: burlywood; */
  /* line-height: 50px; */

  margin-top: 60px;
  min-width: 280px;
  height: auto;
  /* margin: 0 auto; */
  /* overflow: hidden; */
}


/*当屏幕宽度大于 1200px 时会执行的 CSS 代码*/
@media only screen and (min-width: 720px) {
  #sidebar {
    position: fixed;
    left: 0;
    height: 100%;
    width: 100px;
  }

  #sb-div{
      position: relative;
      top: 50%;
      transform:translateY(-50%);
      
  }

  #main {

    margin-left: 100px;
  }
  #foot{
    height: 0px;
    display: none;
  }
}


/*当屏幕宽度小于 720px 时会执行的 CSS 代码*/
@media only screen and (max-width: 720px) {

  #main {
    width: 100%;
    height: 100%;
  }

  #sidebar {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
  }

  #foot{
    height: 60px;
    line-height: 60px;
  }
}
</style>
