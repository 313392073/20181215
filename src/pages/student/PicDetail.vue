<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>寻找棱锥<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">图片详情</h3>
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
                <img :src="info.uploadNetUrl" alt="暂无图片">
            </div>
            <div class="back-btn">
                <div v-if="isZan" class="bg-btn">
                    <p><i style="color:red;" class="iconfont icon-xin"></i></p>
                    <span>{{info.likesUserNum?info.likesUserNum:0}}</span>
                </div>
                <div v-else class="bg-btn" @click="getZan">
                    <template v-if="isInArray">
                        <p><i class="iconfont icon-xin"></i></p>
                        <span>{{info.likesUserNum?info.likesUserNum:0}}</span>
                    </template>
                </div>
            </div>
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
inject:['reload'],
// 提供reload方法
data() {
//这里存放数据
return {
    attId:'',
    isInArray:false,
    info:{
        group:'',
        userLoginname:'',
        createTime:'',
        likesUserNum:0,
        uploadNetUrl:'',
        headImage:'',
        likesUserLoginname:'',
    }
};
},
//监听属性 类似于data概念
computed: {
    isZan(){
        let userName = JSON.parse(store.state.user).userLoginname;
        let str = this.info.likesUserLoginname;
        for(var i=0;i<str.length;i++){
             if(str[i] == userName){
                return true;
            }
        }
        return false;
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    goBack(){
        this.$router.go(-1)
    },
    getDetail(){
        let params = {
            token:store.state.token,
            attid:this.attId
        }   
        base.getUrl(API.allUrl.lookSingPic,params).then((res) => {
            if(res.code == 200 && res.success == 1) {
                this.info.userLoginname = res.obj.userLoginname;
                this.info.createTime = res.obj.createTime;
                this.info.uploadNetUrl = res.obj.uploadNetUrl;
                this.info.likesUserNum = res.obj.likesUserNum;
                this.info.likesUserLoginname = res.obj.likesUserLoginname?res.obj.likesUserLoginname.split(','):[];
            }
        })
    },
    getTime(time){
        return share.formatTime(time/1000)
    },
    getZan(){
        let params = {
            token:store.state.token,
            attid:this.attId
        }

        base.getUrl(API.allUrl.listLike,params).then((res) => {
            if(res.code == 200 && res.success == 1) {
                this.getDetail()
            }
        })
    },
    getrefresh(){
        this.reload();
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let attId = this.$route.params.attids;
    this.attId = attId;
    this.info.group = this.$route.params.groupInfo;
    this.info.headImage = this.$route.params.headImage;
    this.getDetail();
    let self = this
    let num = 2
    base.getMenuStep().then((res) => {
        self.isInArray = base.arrContain(res,num)
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
            min-height: 700*0.4*0.02rem;
            margin-top: 40*0.4*0.02rem;
            text-align: center;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .back-btn{
            width: 100%;
            margin: 55*0.4*0.02rem auto 0;
            text-align: center;
            .bg-btn{
                width: 160*0.4*0.02rem;
                margin: 0 auto;
                background-color: #6c63ff;
                color: #ffffff;
                border-radius: 50*0.4*0.02rem;
                padding: 20*0.4*0.02rem 10*0.4*0.02rem 0;
                i{
                    font-size: 50*0.4*0.02rem;
                    line-height: 40*0.4*0.02rem;
                }
                span{
                    font-size: 30*0.4*0.02rem;
                    line-height:30*0.4*0.02rem;
                    position: relative;
                    top:-10*0.4*0.02rem;
                }
            }
        }
    }
}
</style>