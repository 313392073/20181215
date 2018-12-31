<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">视频分享</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">视频详情</h3>
        <div class="main-box">
            <div class="info-box clearfix">
                <div class="info-left">
                    <img :src="info.headImage" alt="">
                    <span>{{info.group}}组</span>
                </div>
                <div class="info-right">
                    <p class="info-title">{{info.userLoginname}}</p>
                    <p class="info-time">上传时间：{{getTime(info.createTime)}}</p>
                </div>
            </div>
            <div class="video-box">
                <video v-if="info.uploadNetUrl" :src="info.uploadNetUrl"></video>
                <div v-else class="video-desc">暂未上传视频</div>
            </div>
            <div class="back-btn"><button class="btn" @click="goBack">返回</button></div>
        </div>
    </div>
  </div>
   </div>
<side-bar></side-bar>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import SideBar from "@/common/SideBar";
import share from '../../router/http/share.js'
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {
    info:{
        group:'',
        userLoginname:'',
        createTime:'',
        likesUserNum:0,
        uploadNetUrl:'',
        headImage:''
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getTime(time){
        return share.formatTime(time/1000)
    },
    goBack(){
        this.$router.go(-1)
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let attId = this.$route.params.attids;
    this.info.group = this.$route.params.groupInfo;
    this.info.headImage = this.$route.params.headImage;
    let params = {
        token:store.state.token,
        attid:attId
    }
    base.getUrl(API.allUrl.lookSingPic,params).then((res) => {
        console.log(res)
        if(res.code == 200 && res.success == 1) {
            this.info.userLoginname = res.obj.userLoginname;
            this.info.createTime = res.obj.createTime;
            this.info.uploadNetUrl = res.obj.uploadNetUrl;
            this.info.likesUserNum = res.obj.likesUserNum;
            this.info.likesUserNum = res.obj.likesUserNum;
        }
    })
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
@fcolor:#5c5a5a;
.left-box{
    height: calc(~"100% - 1.6rem");
    overflow-y:auto; 
    .title{
        height: 106*0.4*0.02rem;
        line-height: 106*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 78.8%;
        margin: 0 auto 70*0.4*0.02rem; 
        .info-box{
            width: 100%;
            border-bottom: 1px solid #dddddd;
            .info-left{
                float: left;
                padding-bottom: 0.1rem;
                width: 2.7rem;
                margin-right: 0.3rem;
                img{
                    width: 130*0.4*0.02rem;
                    height: 130*0.4*0.02rem;
                    border-radius: 50%;
                }
                span{
                    display: inline-block;
                    font-size: 0.5rem;
                    color: #39cc6c;
                    margin-left: 0.3rem;
                    padding-right: 0.4rem;
                    border-right: 1px solid #eeeeee;
                    vertical-align: middle;
                }
            }
            .info-right{
                float: right;
                width: calc(~"100% - 3rem");
                .info-title{
                    font-size: 0.3rem;
                    color: @fcolor;
                    line-height: 0.52rem;
                }
                .info-time{
                    font-size: 0.24rem;
                    color: @fcolor;
                }
            }
        }
        .video-box{
            width: 100%;
            height: 829*0.4*0.02rem;
            margin-top: 40*0.4*0.02rem;
            video{
                width: 100%;
                height: 100%;
            }
            .video-desc{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .back-btn{
            width: 100%;
            margin: 55*0.4*0.02rem auto 0;
            text-align: center;
            .btn{
                display: block;
                width: 510*0.4*0.02rem;
                height: 90*0.4*0.02rem;
                margin: 0 auto;
                line-height: 90*0.4*0.02rem;
                background-color: #6c63ff;
                color: #ffffff;
                font-size: 0.36rem;
                border-radius: 90*0.4*0.02rem;
                border: none;
                outline: none;
            }
        }
    }
}
</style>