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
import '@material/web/dialog/dialog.js';


import axios from 'axios';
axios.defaults.withCredentials = true;

let currentUserID = inject('currentUserID');
let currentUserName = inject('currentUserName');


let route = useRoute();
let router = useRouter();

let props=defineProps({
    pid:{
        type:String,
        default:""
    },
    isOpen: Boolean,
})


function submitf()
{
    //alert('OK')
    let frm=document.getElementById('file-upload');
    //用axios试试
    let fd=new FormData();//这样默认就是multipart
    let flist=document.getElementById("flist").files;
    //alert(flist.length==0)
    fd.append("postID",props.pid);
    Array.from(flist).forEach(item=>{
        fd.append('mfiles',item);
    });

    axios.post("http://localhost:8080/postimg/add_img",fd).then(res=>{
        let payload=res.data;
        if(payload.state==200)
        {
            alert('DONEEEEEEEEEEEEE')
        }
    }).catch(error=>{
        alert('OOPS')
    })
    //frm.submit();
}

</script>
<template>
    <div id="item-container">
        <Teleport to="body">
            <md-dialog id="edit-dig" :open="props.isOpen" v-show="props.isOpen">
                <div slot="headline" class="surface-variant">
                    <div class="on-surface-variant-text" style="margin: 20px;">
                        添加图片或视频{{ pid }}
                    </div>
                    
                </div>
                <div slot='content' class="surface-variant" style="padding: 20px;">
                    <div class="surface-variant" style="height: 100%;">
                        <form id="form-id" method="dialog">
                            <form id="file-upload" action="http://localhost:8080/postimg/add_img" method="post" enctype="multipart/form-data">
                                <input type="hidden" name="postID" :value="pid">
                                <input id="flist" name="mfiles" type="file" multiple>
                                
                            </form>
                        </form>
                    </div>
                    <md-filled-button @click="submitf">上传文件</md-filled-button>
                </div> 
                <div slot="actions" class="surface-variant" style="text-align: right;">
                    <div class="on-surface-variant-text" style="margin: 20px;">
                        <md-text-button form="form-id" @click="">关闭</md-text-button>
                    </div>
                </div>
            </md-dialog>
        </Teleport>
    </div>
</template>
<style scoped>
#edit-dig{
    position : fixed;
	left : 50%;
	top : 50%;
	max-width : 700px;
	max-height : 800px;
	transform: translate(-50%, -50%);
}
</style>