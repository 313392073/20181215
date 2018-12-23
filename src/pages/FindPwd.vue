<!--  -->
<template>
<div class="login-wrapper clearfix">
        <div class="left-wrapper"></div>
        <div class="right-wrapper">
            <!-- 找回密码 -->
            <div class="info-box">
                <h3 class="find-pwd">找回密码</h3>
                <form action="" method="POST" @submit.prevent="checkForm">
                <div class="item">
                    <label class="desc">选择身份</label>
                    <label class="choose">
                        <input type="radio" name="identity" value="teacher" checked v-model="dataObj.checkedValue">
                        <span></span>
                        教师
                    </label>
                    <label class="choose">
                        <input type="radio" name="identity" value="student" v-model="dataObj.checkedValue">
                        <span></span>
                        学生
                    </label>
                </div>
                <div class="item">
                    <label class="desc">用户名</label>
                    <input type="text" class="info" name="username" id="username" v-model="dataObj.username">
                </div>
                <div class="login-btn">
                    <input type="submit" class="sbtn" value="下一步">
                </div>
                </form>
            </div>
            <div class="tips" v-show="toggleTips">
                <div class="tips-wrapper">
                    <p class="tips-title">提交成功</p>
                    <p class="tips-msg">{{tipsMsg}}</p>
                    <div class="btn-box">
                        <a class="go-msg" @click="hideTip">进入邮箱</a>
                        <a @click="goLogin">返回登录界面</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import base from '../router/http/base.js'
import API from '../router/http/api.js';
import store from '../store/store.js';
import * as types from '../store/types.js';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    tipsMsg:'验证邮箱已发送到你的邮箱，请注意查收验证邮箱已发送到你的',
    toggleTips:false,
    dataObj:{
        checkedValue:'',
        username:''
    },
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    hideTip(){
        this.toggleTips = false;
    },
    goLogin(){
        this.$router.push('/login')
    },
    checkForm(){
        let self = this;
        if(self.dataObj.checkedValue == '' || self.dataObj.username == '') {
            self.tipsMsg = '请将信息输入完整后才能提交'
            self.toggleTips = true;
            return false;
        }
        if(self.dataObj.username.length < 2 || self.dataObj.username.length > 20) {
            self.tipsMsg = '请注意输入合法长度的用户名'
            self.toggleTips = true;
            return false;
        }
        let params = {
            userLoginname:self.dataObj.username
        }
        base.getUrl(API.allUrl.find,params).then(res => {
            console.log(res)
            if(res.code == 200 && res.success == 1) {

            }else{
                self.tipsMsg = res.msg;
                self.toggleTips = true;
                return
            }
        })
        
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
                margin: 23% auto 7.8%;
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
                margin: 15.49% auto;
                text-align: center;
                img{
                    width: 255*0.4px;
                    height: 255*0.4px;
                }
            }
            .item{
                min-height: 45*0.4px;
                line-height: 45*0.4px;
                margin-top: 85*0.4px;
                color: #ffffff;
                border-bottom: 1px solid #ffffff;
                padding-left: 8px;
                .header-box{
                    width: 255*0.4px;
                    height: 255*0.4px;
                    margin: 0 auto;
                    border-radius:50%; 
                    text-align: center;
                    .upload-pic{
                        border-radius:50%;
                        width: 255*0.4px;
                        height: 255*0.4px;
                        margin: 0 auto;
                    }
                    .upload-file{
                        display: none;
                    }
                }
                
                .desc{
                    display: inline-block;
                    width: 30%;
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
                    line-height: 90*0.4px;
                    height: 90*0.4px;
                    background-color: transparent;
                    outline: none;
                    border: none;
                    color: #ffffff;
                    font-size: 16px;
                    width: 60%;
                }
                &.header-item{
                    border-bottom: none;
                    .desc{
                        margin-bottom: 0;
                    }
                }
            }
            .login-btn{
                margin: 95*0.4*0.02rem auto;
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