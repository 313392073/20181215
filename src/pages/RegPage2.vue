<!--  -->
<template>
<div class="login-wrapper clearfix">
        <div class="left-wrapper"></div>
        <div class="right-wrapper">
            <!--注册 -->
            <div class="info-box">
                <h3 class="reg-title">新用户注册</h3>
                <form action="" method="POST" @submit.prevent="checkForm">
                    <div class="item header-item">
                        <label class="desc">上传头像</label>
                        <div class="header-box">
                            <img class="upload-pic" :src="defaultUrl" alt="default" @click="showActionSheet()">
                            <input type="file" name="file" accept="image/png,image/jpg,image/jepg,image/gif" capture="camera" ref="filElem" class="upload-file"  @change="fileChange($event)">
                        </div>
                    </div>
                    <div class="item">
                        <label class="desc">选择性别</label>
                        <label class="choose">
                            <input type="radio" name="identity" value="0" v-model="checkedValue">
                            <span></span>
                            男
                        </label>
                        <label class="choose">
                            <input type="radio" name="identity" value="1" v-model="checkedValue">
                            <span></span>
                            女
                        </label>
                    </div>

                    <div class="item">
                        <label class="desc">姓名</label>
                        <input type="text" class="info" name="username" id="username" v-model="dataObj.username">
                    </div>
                    <div class="item">
                        <label class="desc">邮箱</label>
                        <input type="text" class="info" name="email" id="email" v-model="dataObj.email">
                    </div>
                    <div class="item">
                        <label class="desc">密码</label>
                        <input type="password" class="info" name="pwd" id="pwd" v-model="dataObj.pwd">
                    </div>
                    <div class="item">
                        <label class="desc">确认密码</label>
                        <input type="password" class="info" name="repwd" id="repwd" v-model="dataObj.repwd">
                    </div>

                    <div class="login-btn">
                        <input type="submit" class="sbtn" value="确认注册">
                    </div>
                   
                </form>
            </div>
            <div class="tips" v-show="toggleTips">
                <div class="tips-wrapper">
                    <p class="tips-title">温馨提示</p>
                    <p class="tips-msg">{{tipsMsg}}</p>
                    <div class="btn-box">
                        <a href="javascript:void(0)" class="go-msg" @click="hideTip">确定</a>
                        <a href="javascript:void(0)" class="closed" @click="hideTip">关闭</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import defaultUrls from '../assets/images/default.png'
import defaultUrl1 from '../assets/images/noupload.png'
import common from '../assets/js/common.js'
import base from '../router/http/base.js'
import API from '../router/http/api.js'
import store from '../store/store';
import Axios from 'axios';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    tipsMsg:'验证邮箱已发送到你的邮箱，请注意查收验证邮箱已发送到你的',
    toggleTips:false,
    defaultUrl:defaultUrls,
    dataObj:{
        username:'',
        pwd:'',
        repwd:'',
        email:'',
        sex:''
    },
    checkedValue:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    //选图片
    //点击事件，弹出选择摄像头和相册的选项
    showActionSheet() {
        let bts = [{
        title: "拍照"
        }, {
        title: "从相册选择"
        }];
        plus.nativeUI.actionSheet({
            cancel: "取消",
            buttons: bts
        },
        function(e) {
            if (e.index == 1) {
            this.getImage();
            } else if (e.index == 2) {
            this.galleryImgs();
            }
        }
        );
    },
     //调用手机摄像头并拍照
    getImage() {
        let cmr = plus.camera.getCamera();
        cmr.captureImage(function(p) {
        plus.io.resolveLocalFileSystemURL(p, function(entry) {
            compressImage(entry.toLocalURL(),entry.name);
        }, function(e) {
            plus.nativeUI.toast("读取拍照文件错误：" + e.message);
        });
        }, function(e) {
        }, {
        filter: 'image'
        });
    },
    fileChange(el) {
        this.files=$("#upload_file").get(0).files;
        console.log(this.files.length);
        for(let i=0;i<this.files.length;i++){
        this.datas.append("file",this.files[i]);
        }
        this.show1=false;
        console.log(typeof this.files);
        console.log(this.files);
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
    },
    //从相册选择照片
    galleryImgs() {
        plus.gallery.pick(function(e) {
        let name = e.substr(e.lastIndexOf('/') + 1);
        compressImage(e,name);
        }, function(e) {
        }, {
        filter: "image"
        });
    },
    //图片上传的跟新头像
    uploadImg(){
        let self = this;
        let fileMaxSize = 1024;//1M
        let file = self.$refs.filElem.files[0];
        if(file.size/fileMaxSize > fileMaxSize){
            self.tipsMsg = '图片过大 不能上传'
            self.toggleTips = true;
            return false;
        }
        if (!/image\/\w+/.test(file.type)) {
            self.tipsMsg = '请注意上传图片的格式！'
            self.toggleTips = true;
            return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
             var formData = new FormData();
                 formData.append("file", self.$refs.filElem.files[0]);
                 Axios({
                     method:'post',
                     baseURL:base.baseURL,
                     url:API.allUrl.uploadfile+'?token=1',
                     data:formData,
                 }).then((res) => {
                     if(res.data.code == 200 && res.data.success == 1) {
                         self.defaultUrl = res.data.obj;
                     }else{
                        self.tipsMsg = '网络错误，上传头像失败'
                        self.toggleTips = true;
                        return false;
                     }
                 })
        }
    },
    checkForm(){
        let self = this;
        // self.dataObj.filePath = self.$refs.filElem.files[0]?self.$refs.filElem.files[0].name:'';
        if(self.defaultUrl == '' || self.dataObj.username == '' || self.dataObj.pwd == '' || self.dataObj.repwd == '' || self.checkedValue == '' || self.dataObj.email == '') {
            self.tipsMsg = '请将信息输入完整后才能提交'
            self.toggleTips = true;
            return false;
        }
        // if(!common.checkStrong(self.dataObj.pwd) || !common.checkStrong(self.dataObj.repwd)){
        //     self.tipsMsg = '6-20位数字、大小写字'
        //     self.toggleTips = true;
        //     return false;
        // }
        if(self.dataObj.pwd != self.dataObj.repwd){
            self.tipsMsg = '输入的密码不一致'
            self.toggleTips = true;
            return false;
        }
        if(self.dataObj.username.length < 2 || self.dataObj.username.length > 20) {
            self.tipsMsg = '请注意输入合法长度的用户名'
            self.toggleTips = true;
            return false;
        }
        let params = {
            userLoginname : self.dataObj.username,
            userPassword : self.dataObj.pwd,
            headImage : self.defaultUrl,
            userType : store.state.userType*1?store.state.userType*1:'0',
            classId : store.state.chooseCourse*1?1:'1',
            sex:self.checkedValue,
            email:self.dataObj.email
        }
        console.log(params)
        base.postUrl(API.allUrl.regist,params).then((res) => {
            console.log(res)
            if(res.code == 200 && res.success == 1){
                self.tipsMsg = '注册成功，立即去登陆';
                self.toggleTips = true;
                setTimeout(function(){
                    self.$router.push('/')
                },2000)
            }else{
                self.tipsMsg = res.msg;
                self.toggleTips = true;
                return false;
            }
        })
  
    },
    hideTip(){
        this.toggleTips = false;
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.login-wrapper{
    width: 100%;
    height: 100%;
    .left-wrapper{
        float: left;
        width: 60%;
        height: 100%;
        background: url("../assets/images/login_bg.png") no-repeat center;
        background-size: contain;
    }
    .right-wrapper{
        float: left;
        width: 40%;
        height: 100%;
        background-color: #6058e5;
        position: relative;
        .info-box{
            width: 67%;
            margin: 0 auto;
            .reg-title{
                width: 100%;
                text-align: center;
                margin: 13% auto 7.8%;
                color: #ffffff;
                font-size: 60*0.4px;
                font-weight: normal;
            }
            .find-pwd{
                width: 100%;
                text-align: center;
                margin: 39.7% auto 17.15%;
                color: #ffffff;
                font-size: 60*0.4px;
                font-weight: normal;
            }
            .headpic{
                width: 100%;
                margin: 8.49% auto;
                text-align: center;
                img{
                    width: 200*0.4px;
                    height: 200*0.4px;
                }
            }
            .item{
                min-height: 90*0.4px;
                line-height: 90*0.4px;
                padding-left: 0;
                margin-bottom: 40*0.4px;
                color: #ffffff;
                border-bottom: 1px solid #ffffff;
                padding-left: 8px;
                .header-box{
                    width: 200*0.4px;
                    height: 200*0.4px;
                    margin: 0 auto;
                    border-radius:50%; 
                    text-align: center;
                    .upload-pic{
                        border-radius:50%;
                        width: 200*0.4px;
                        height: 200*0.4px;
                        margin: 0 auto;
                    }
                    .upload-file{
                        display: none;
                    }
                }
                
                .desc{
                    display: inline-block;
                    width: 33%;
                    font-size: 16px;
                    margin-bottom: 45*0.4px;
                }
                .choose{
                    display: inline-block;
                    margin-bottom: 45*0.4px;
                    margin-left: 50*0.4*0.02rem;
                    font-size: 16px;
                    cursor: pointer;
                    input[type="radio"] {
                        appearance: none;
                        -webkit-appearance: none;
                        outline: none;
                        display: none
                    }
                    span{
                        border-radius: 50%;
                        margin-right: 0.1rem;
                        vertical-align: middle;
                    }
                    input[type="radio"]+span {
                        width: 40*0.4*0.02rem;
                        height: 40*0.4*0.02rem;
                        display: inline-block;
                        background-color: transparent;
                        border: 1px solid #ffffff;
                    }
                    input[type="radio"]:checked+span {
                        background-color: #ffffff;
                    }
                }
                .info{
                    display: inline-block;
                    width: 60%;
                    height: 90*0.4px;
                    line-height: 90*0.4px;
                    background-color: transparent;
                    outline: none;
                    border: none;
                    color: #ffffff;
                    font-size: 16px;
                    margin-bottom: 12*0.54*0.02rem;
                }
                &.header-item{
                    border-bottom: none;
                    .desc{
                        margin-bottom: 0;
                    }
                }
            }
            .login-btn{
                margin: 95*0.4px auto;
                .sbtn{
                    display: block;
                    width: 100%;
                    height: 118*0.4px;
                    line-height: 118*0.4px;
                    border-radius: 118*0.4px;
                    text-align: center;
                    color: #ffffff;
                    background-color: #3acc6c;
                    font-size: 20px;
                    border: none;
                    outline: none;
                    &:active{
                        background-color: #19ca55;
                    }
                }
            }
            .forget-pwd{
                margin-top: 1.2rem;
                text-align: right;
                a{
                    font-size: 16px;
                    color: #ffffff;
                }
            }
            .user-reg{
                text-align: center;
                a{
                    font-size: 16px;
                    color: #ffffff;
                }
            }
        }
        .tips{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background-color: transparent;
            .tips-wrapper{
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                width: 715*0.4px;
                height: 425*0.4px;
                background-color: #ffffff;
                border-radius: 12px;
                color: #4b4b5b;
                .tips-title{
                    text-align: center;
                    line-height: 150*0.4px;
                    height: 150*0.4px;
                    font-size: 55*0.4px;
                }
                .tips-msg{
                    width: 80%;
                    margin: 0 auto;
                    line-height: 55*0.4px;
                    font-size: 38*0.4px;
                    text-align: center;
                }
                .btn-box{
                    width: 100%;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 115*0.4px;
                    line-height: 115*0.4px;
                    border-top: 1px solid #dddddd;
                    a{
                        float: left;
                        width: 50%;
                        text-align: center;
                        color: #4b4b5b;
                        font-size: 40*0.4px;
                        &.go-msg{
                            border-right: 1px solid #dddddd;
                            width: calc(~"50% - 1px");
                        }
                    }
                }
            }
        }
    }
}
</style>