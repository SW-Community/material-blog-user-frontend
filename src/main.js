import './assets/theme.css'

import { createApp,ref,provide } from 'vue'
import App from './App.vue'
import router from './router'

let currentUserID=ref(-1);
let currentUserName=ref('请登录');

let id=sessionStorage.getItem('currentUserID');
if(id)
{
    currentUserID.value=id;
    let name=sessionStorage.getItem('currentUserName');
    currentUserName.value=name;
}

const app = createApp(App);

app.provide('currentUserID',currentUserID);
app.provide('currentUserName',currentUserName);
app.use(router);

app.mount('#app');
