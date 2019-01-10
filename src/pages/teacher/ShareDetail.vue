<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">作业分享</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <div class="main-box">
            <div class="desc-box clearfix">
                <div class="desc-left">
                    <img :src="initInfo.headImage" alt="default">
                    <p class="desc-name">{{initInfo.useName}}</p>
                </div>
                <div class="desc-right">
                    <p class="desc-detail">{{info.attRemark}}</p>
                    <div class="desc-images clearfix">
                        <img :src="info.uploadNetUrl" alt="group-pic">
                    </div>
                    <div class="desc-btns">
                        <a v-if="isZan" href="javascript:void(0)"><i style="color:red" class="iconfont icon-xin"></i>赞</a>
                        <a v-else href="javascript:void(0)" @click="getZan"><i class="iconfont icon-xin"></i>赞</a>
                        <a href="javascript:void(0)"><i class="iconfont icon-guanbi"></i>评论</a>
                    </div>
                </div>
            </div>
            <div class="detail-box">
                <div class="zan-box">
                    <div class="icon-box clearfix">
                        <p class="left-icon"><i class="iconfont icon-xin"></i></p>
                        <div class="zan-wrapper">
                            <img v-if="info.comments.length>0" v-for="(cItem,cIndex) in info.comments" :key="cIndex" :src="cItem.userHeadImage" alt="default">
                        </div>
                    </div>
                </div>
                <div class="comment-box">
                    <div class="icon-box clearfix">
                        <p class="left-icon"><i class="iconfont icon-xin"></i></p>
                        <div class="comment-wrapper">
                           <div class="list clearfix" v-for="(cItem,cIndex) in info.comments" :key="cIndex">
                                <div class="left-icon">
                                     <img :src="cItem.userHeadImage" alt="default">
                                     <p class="comment-name" >{{cItem.userLoginname}}</p>
                                </div>
                                <p class="comment-detail" v-if="cItem.replyUserLoginname" @click="setComment(cItem.userLoginname)">回复 <span v-if="cItem.replyUserLoginname">{{cItem.replyUserLoginname}}：</span>{{cItem.comment}}</p>
                                <p class="comment-detail" v-else  @click="setComment(cItem.userLoginname)">{{cItem.comment}}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                 <div class="input-box clearfix">
                    <p v-if="type"> 你回复 <span class="old-comment">{{oldComment}}</span></p>
                    <textarea placeholder="请填写评论内容" v-model="comments"></textarea>
                    <a href="javascript:void(0)" @click="getComment"><i class="iconfont icon-xin"></i></a>
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
import base from '../../router/http/base';
import store from '../../store/store';
import API from '../../router/http/api.js';
import Axios from 'axios';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {
    type:0, //0 回复别人  1 被回复
    oldComment:'',
    attId:'',
    isZan:false,
    headImage:'',
    comments:'',
    batch:'',
    info:{},
    initInfo:{
        headImage:'',
        useName:''
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    setComment(name){
        this.type = 1;
        this.oldComment = name;
    },
    getBatch(params){
        base.getUrl(API.allUrl.batch,params).then((res) => {
            if(res.code == 200 && res.success == 1) {
                this.batch = res.obj
            }
        })
    },
    getDetail(){
        let params = {
            token:store.state.token,
            attid:this.attId
        }   
        base.getUrl(API.allUrl.lookSingPic,params).then((res) => {
            console.log(res)
            if(res.code == 200 && res.success == 1) {
                Object.assign({},this.info,res.obj)
                this.info = res.obj
            }
        })
    },
     getZan(){
        let params = {
            token:store.state.token,
            attid:this.attId
        }
        base.getUrl(API.allUrl.listLike,params).then((res) => {
            if(res.code == 200 && res.success == 1) {
                this.isZan = true;
                this.getDetail()
            }
        })
    },
    getComment(){
         let params = '';
        if(this.type == 0) {
            params = {
                attid:this.attId*1,
                comment:this.comments
            }
        }else if(this.type == 1) {
            params = {
                attid:this.attId*1,
                comment:this.comments,
                replyUserLoginname:this.oldComment
            }
        }
        Axios({
            method:'post',
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            baseURL:base.baseURL,
            url:API.allUrl.homeComment+'?token='+store.state.token+'&batch='+this.batch,
            data:params,
        }).then((res) => {
            if(res.data.code == 200 && res.data.success == 1) {
                this.type = 0;
                this.comments = '';
                this.getDetail();
            }
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let attId = this.$route.params.attids;
    this.attId = attId;
    this.initInfo.headImage = this.$route.params.headImage;
    this.initInfo.useName = this.$route.params.useName;
    let params = {
        token:store.state.token
    }
    this.getBatch(params)
    this.getDetail()
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
    height: 100%;
    width: 100%; 
    .main-box{
        width: 100%;
        margin: 0 auto 70*0.4*0.02rem;
        padding-right:1.84%;
        padding-left: 5.53%;
        .desc-box{
            padding: 60*0.4*0.02rem 0 0;
            .desc-left{
                float: left;
                width: 7.14%;
                text-align: center;
                font-size: 34*0.4*0.02rem;
                color: @fcolor;
                img{
                    width: 124*0.4*0.02rem;
                    height: 124*0.4*0.02rem;
                    border-radius: 50%;
                }
            }
            .desc-right{
                float: left;
                width: 92.86%;
                padding-left: 32*0.4*0.02rem;
                .desc-detail{
                    font-size: 38*0.4*0.02rem;
                    line-height: 70*0.4*0.02rem;
                    color: #676767;
                }
                .desc-images{
                    img{
                        float: left;
                        width: 18.4%;
                        margin-right: 2%;
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                }
                .desc-btns{
                    text-align: right;
                    height: 104*0.4*0.02rem;
                    line-height: 104*0.4*0.02rem;
                    a{
                        font-size: 38*0.4*0.02rem;
                        color: #6c63ff;
                        margin-left: 100*0.4*0.02rem;
                        i{
                            font-size: 44*0.4*0.02rem;
                            margin-right: 10*0.4*0.02rem;
                        }
                    }
                }
            }
        }
        .detail-box{
            width: 100%;
            padding-left: 3.45%;
            .zan-box{
                min-height: 100*0.4*0.02rem;
                line-height: 100*0.4*0.02rem;
                background-color: #f5f5f5;
                margin-bottom: 2px;
                .left-icon{
                    float: left;
                    width: 2.5%;
                    text-align: center;
                    margin-right: 1.3%;
                }
                .zan-wrapper{
                    float: left;
                    width: 96.2%;
                    overflow: hidden;
                    img{
                        width: 80*0.4*0.02rem;
                        height: 80*0.4*0.02rem;
                        margin-right: 10*0.4*0.02rem;
                        border-radius: 50%;
                    }
                }
            }
            .comment-box{
                min-height: 100*0.4*0.02rem;
                line-height: 100*0.4*0.02rem;
                background-color: #f5f5f5;
                .left-icon{
                    float: left;
                    width: 2.5%;
                    text-align: center;
                    margin-right: 1.3%;
                }
                .comment-wrapper{
                    float: left;
                    width: 96.2%;
                    padding-bottom: 15*0.4*0.02rem;
                    .list{
                        height: 135*0.4*0.02rem;
                        border-bottom: 1px solid #ecebeb;
                        &:last-child{
                            border-bottom: none;
                        }
                        .left-icon{
                            float: left;
                            width: 8.5%;
                            text-align: center;
                            margin-right: 1.3%;
                            img{
                                width: 80*0.4*0.02rem;
                                height: 80*0.4*0.02rem;
                                border-radius: 50%;
                            }
                            .comment-name{
                                line-height: 15px;
                                font-size: 26*0.4*0.02rem;
                                color: #6c63ff;
                            }
                        }
                        .comment-detail{
                            float: left;
                            width: 90%;
                            height: 135*0.4*0.02rem;
                            line-height: 135*0.4*0.02rem;
                            font-size: 35*0.4*0.02rem;
                            color: #3a3a3a;
                            span{
                                color: #6c63ff;
                            }
                        }
                    }
                    
                }
                
            }
            .input-box{
                margin: 20*0.4*0.02rem 0;
                textarea{
                    float: left;
                    min-height: 60*0.4*0.02rem;
                    line-height: 60*0.4*0.02rem;
                    width: calc(~"100% - 75*0.4*0.02rem");
                    border-radius: 4px;
                    border: 1px solid #cfcccc;
                    padding: 0 15*0.4*0.02rem;
                    color: #989898;
                    font-size: 34*0.4*0.02rem;
                }
                a{
                    float: left;
                    width: 75*0.4*0.02rem;
                    text-align: center;
                    min-height: 60*0.4*0.02rem;
                    line-height: 60*0.4*0.02rem;
                    color: #989898;
                    i{
                        font-size: 48*0.4*0.02rem;
                    }
                   
                }
            }
        }
    }
}
</style>