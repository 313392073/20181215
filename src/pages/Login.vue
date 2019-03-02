<!--  -->
<template>
 <div class="login-wrapper clearfix">
        <div class="left-wrapper"></div>
        <div class="right-wrapper">
            <!--登录 -->
            <div class="info-box">
                <form action="" method="POST" @submit.prevent="checkForm">
                    <div class="item">
                        <label class="desc">用户名</label>
                        <input type="text" class="info" name="username" id="username" v-model="dataObj.username">
                    </div>
                    <div class="item">
                        <label class="desc">密码</label>
                        <input type="text" class="info" name="pwd" id="pwd" v-model="dataObj.pwd">
                    </div>
                    <p class="forget-pwd"><router-link to='findpwd'><a>忘记密码？</a></router-link></p>
                    <div class="login-btn">
                        <input type="submit" class="sbtn" value="登录">
                    </div>
                    <p class="user-reg"><router-link to='selectId'><a>新用户注册</a></router-link></p>
                </form>
            </div>
            <div class="tips" v-show="toggleTips">
                <div class="tips-wrapper">
                    <p class="tips-title">温馨提示</p>
                    <p class="tips-msg">{{tipsMsg}}</p>
                    <div class="btn-box">
                        <a href="javascript:void(0)" class="go-msg"  @click="hideTip">确定</a>
                        <a href="javascript:void(0)" class="closed"  @click="hideTip">关闭</a>
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
import common from '../assets/js/common.js'
import base from '../router/http/base'
import API from '../router/http/api'
import * as types from '../store/types'
import store from '../store/store'
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
        checkedValue:'',
        username:'',
        pwd:''
    },
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    checkForm(){
        let self = this;
        if(self.dataObj.username == '' || self.dataObj.pwd == '') {
            self.tipsMsg = '请将信息输入完整后才能提交'
            self.toggleTips = true;
            return false;
        }

        // if(!common.checkStrong(self.dataObj.pwd)){
        //     self.tipsMsg = '请注意密码格式:6-20位数字、大小写字母'
        //     self.toggleTips = true;
        //     return false;
        // }

        if(self.dataObj.username.length < 2 || self.dataObj.username.length > 20) {
            self.tipsMsg = '请注意输入合法长度的用户名'
            self.toggleTips = true;
            return false;
        }
        let params = {
            userLoginname:self.dataObj.username,
            userPassword:self.dataObj.pwd
        }
        base.getUrl(API.allUrl.login,params).then((res) => {
            console.log(res)
            if(res.code == 200 && res.success == 1){
                let obj = {
                    userInfo:res.obj.user,
                    token:res.obj.token
                }
                store.commit(types.BATCH,res.obj.batch)
                store.commit(types.LOGIN,obj)
                store.commit(types.USERTYTPE,JSON.parse(res.obj.user).userType)
                if(JSON.parse(res.obj.user).userType == 0){ //学生
                    // if(localStorage.getItem('hisurl')){
                    //     self.$router.push(localStorage.getItem('hisurl'))
                    // }else{
                    //     self.$router.push('/stuonlinetest')
                    // }
                    self.$router.push('/stucoursehistory')
                    // self.$router.push('/stuonlinetest')
                }else if(JSON.parse(res.obj.user).userType == 1){ //老师
                    if( res.obj.user &&  JSON.parse(res.obj.user)['sysClassId']) {
                        // self.$router.push('/teapracticreport')
                        self.$router.push('/teacoursehistory')
                    }else{
                        self.$router.push('/teaselectclass')
                    }
                }else{
                    self.tipsMsg = '请先登录！！'
                    self.toggleTips = true;
                    return;
                }
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
            padding-top: 30.49%;
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
                    min-width: 24%;
                    font-size: 16px;
                    margin-bottom: 45*0.4px;
                }
                .info{
                    display: inline-block;
                    min-height: 90*0.4px;
                    line-height: 90*0.4px;
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
            .forget-pwd{
                margin-top: 80*0.4*0.02rem;
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