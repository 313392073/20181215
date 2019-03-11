<!--  -->
<template>
 <div class="login-wrapper clearfix">
        <div class="left-wrapper"></div>
        <div class="right-wrapper">
            <!--登录 -->
            <div class="info-box">
                <h3 class="reg-title">选择身份</h3>
                    <div class="item">
                        <label class="desc">选择身份</label>
                        <label class="choose">
                            <input type="radio" name="identity" value="1" v-model="checkedValue">
                            <span></span>
                            教师
                        </label>
                        <label class="choose">
                            <input type="radio" name="identity" value="0" v-model="checkedValue">
                            <span></span>
                            学生
                        </label>
                    </div>
                    <div class="item">
                        <label class="desc" >选择课程</label>
                        <select name="majorId" class="majorId" @click="majorIdSelect($event)">
                            <option v-for="item in majorIds" :key="item.id" :value="item.id">{{item.name}}</option>
                        </select>
                        <i class="iconfont icon-icon_sanjiaoxing"></i>
                    </div>
                    <div class="item" v-if="(checkedValue == 0) && courseIds.length > 0">
                        <label class="desc" >选择班级</label>
                        <select name="courseId" class="majorId" @change="courseIdSelect($event)">
                            <option value="no">请选择班级</option>
                            <option v-for="item in courseIds" :key="item.sys_class_id" :value="item.sys_class_id">{{item.classname}}</option>
                        </select>
                        <i class="iconfont icon-icon_sanjiaoxing"></i>
                    </div>

                    <div class="item" v-if="(checkedValue == 1) && courseIds.length > 0">
                        <label class="desc" >选择班级</label>
                        <select name="courseId" class="majorId" @change="courseIdSelect($event)">
                            <option value="no">请选择班级</option>
                            <option v-for="item in courseIds" :key="item.schoolId" :value="item.schoolId">{{item.schoolName}}</option>
                        </select>
                        <i class="iconfont icon-icon_sanjiaoxing"></i>
                    </div>

                    <div class="login-btn">
                        <input type="submit" @click="goLogin" class="sbtn" :value="btnMsg">
                    </div>
                    <div class="go-login">
                        <a href="javascript:void(0)" @click="gotologin">返回登录</a>
                    </div>
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
import common from '../assets/js/common.js'
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
    btnMsg:'去选课',
    tipsMsg:'验证邮箱已发送到你的邮箱，请注意查收验证邮箱已发送到你的',
    toggleTips:false,
    checkedValue:'',
    majorId:'',
    majorIds:[
        {
            name:'数学',
            id:3
        }
    ],
    courseId:'',
    courseIds:[]
};
},
//监听属性 类似于data概念
computed: {
},
//监控data中的数据变化
watch: {
    
},
//方法集合
methods: {
    gotologin(){
        this.$router.push('/')
    },
    majorIdSelect(e){
        this.majorId = e.target.value
        
    },
    courseIdSelect(e){
        this.courseId = e.target.value
    },
    goLogin(){
        let self = this;
        if(self.courseId) {
            if(self.courseId == 'no') {
                self.tipsMsg = '请选择您的选课信息111';
                self.toggleTips = true;
                return
            }else{
                store.commit(types.CHOOSECOURSE,this.courseId)
                store.commit(types.USERTYTPE,this.checkedValue)
                self.$router.push('/reg');
            }
        }else{
            if(self.checkedValue == '' || self.majorId == '') {
                self.tipsMsg = '请选择您的选课信息';
                self.toggleTips = true;
                return
            }else{
                let params = {
                    userType:self.checkedValue*1,
                    majorId:self.majorId?self.majorId*1:3
                }
                base.getUrl(API.allUrl.registInfo,params).then((res) => {
                    if(res.code == 200 && res.success == 1){
                        self.courseIds = res.obj;
                        self.btnMsg = '去注册';
                    }else{
                        self.tipsMsg = res.msg;
                        self.toggleTips = true;
                        return
                    }
                })
            }
        }
    },
    hideTip(){
        this.toggleTips = false;
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.majorId = this.majorIds[0].id
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
                .majorId{
                    display: inline-block;
                    margin-left: 20*0.4*0.02rem;
                    width: 50%;
                    height: 90*0.4px;
                    line-height: 90*0.4px;
                    background-color: transparent;
                    outline: none;
                    border: none;
                    color: #ffffff;
                    font-size: 16px;
                    margin-bottom:15*0.4*0.02rem;
                    appearance:none;-moz-appearance:none;-webkit-appearance:none;
                    &::-ms-expand { display: none; }
                    option{
                        color: #333333;
                    }
                }
                .icon-icon_sanjiaoxing{
                    font-size: 48*0.4*0.02rem;
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
            .go-login{
                text-align: center;
                &>a{
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