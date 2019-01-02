<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">寻找棱锥</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <div class="main-box">
            <div class="group-wrapper clearfix">
                <div class="item clearfix" v-for="(item, key, index) in setItem" :key="index">
                    <p class="group-name">{{key}}组</p>
                    <div class="sub-item" v-for="(subitem,subIndex) in item" :key="subIndex">
                        
                        <div class="not-upload"><img src="../../assets/images/noupload.png" alt="noupload"></div>
                        
                        <div class="detail-desc clearfix">
                            <div class="desc-left">
                                 <img :src="subitem.user_head_image" :alt="subitem.user_name">
                                <p>{{subitem.user_name}}</p>
                            </div>
                            <div class="desc-right">
                                <p class="desc-text">{{subitem.att_remark}}</p>
                            </div>
                        </div>
                        <div v-if="subitem.attid" class="detail-btns" @click="goDetail(subitem.attid,subitem.user_name,subitem.user_head_image)">
                            <a href="javascript:void(0)" class="share">查看分享</a>
                            <a href="javascript:void(0)"><i class="iconfont icon-xin"></i>{{subitem.likes_user_num}}</a>
                            <a href="javascript:void(0)"><i class="iconfont icon-xuanzhong"></i>{{subitem.look_num}}</a>
                        </div>
                        <div v-else class="detail-btns" @click="showTips">
                            <a href="javascript:void(0)" class="share">查看分享</a>
                            <a href="javascript:void(0)"><i class="iconfont icon-xin"></i>{{subitem.likes_user_num}}</a>
                            <a href="javascript:void(0)"><i class="iconfont icon-xuanzhong"></i>{{subitem.look_num}}</a>
                        </div>
                        <div class="detail-imgs">
                            <img src="../../assets/images/group-pic.png" alt="group-pic">
                            <img src="../../assets/images/group-pic.png" alt="group-pic">
                            <img src="../../assets/images/group-pic.png" alt="group-pic">
                            <img src="../../assets/images/group-pic.png" alt="group-pic">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tips" v-show="toggleTips">
            <div class="main-tips">
                <i class="iconfont icon-guanbi1" @click="HideTip"></i>
                <img class="tip-img" src="../../assets/images/teaupload.png" alt="send-success">
            <p class="tips-title">温馨提示</p>
            <div class="tips-msg">
                {{tipsMsg}}
            </div>
            <div class="tips-btn"><button class="cbtn tbtn" @click="HideTip">好的</button></div>
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
data() {
//这里存放数据
return {
    groupList:[],
    toggleTips:false,
    tipsMsg:'',
};
},
//监听属性 类似于data概念
computed: {
     setItem(){
        let obj = this.getAllkey();
        this.groupList.forEach((item,index) => {
            obj[item['groupname']].push(item)
        })
        return obj;
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    showTips(){
        this.tipsMsg = '暂无评论，无法查看详情';
        this.toggleTips = true;
    },
    HideTip(){
        this.tipsMsg = '';
        this.toggleTips = false;
    },
     getAllkey(){
        let arr = [];
        for(var i=0;i<this.groupList.length;i++){
            arr.push(this.groupList[i]['groupname'])
        }
        let brr = share.uniqArr(arr);
        let obj = {};
        brr.forEach((item,index)  => {
            obj[item] = [];
        })
        return obj;
    },
    goDetail(attid,useName,headImage){
        let attId = attid; 
        this.$router.push({name:'ShareDetail',params:{attids:attId,useName:useName,headImage:headImage}})
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   let self = this;
   let params = {
        token:store.state.token
    }
    base.getUrl(API.allUrl.batch,params).then(res => {
        if(res.code == 200 && res.success ==  1) {
            let params = {
                token:store.state.token,
                batch:res.obj,
                listtype:11*1
            }
            base.getUrl(API.allUrl.uploadList,params).then((res) => {
                if(res.code == 200 && res.success == 1) {
                    self.groupList = res.obj;
                }
            })
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
    height: 100%;
    width: 100%;
    .main-box{
        width: 92.165%;
        margin: 0 auto 70*0.4*0.02rem;
        .group-wrapper{
            padding-top: 230*0.4*0.02rem;
            width: 100%;
            .item{
                float: left;
                width: calc(~"23.5% - 2px");
                min-height: 10.44rem;
                margin-right: 2%;
                border: 1px solid #6c63ff;
                box-shadow: 0 0 5px 3px rgba(0,0, 0,0.1);
                padding: 100*0.4*0.02rem 20*0.4*0.02rem 20*0.4*0.02rem;
                position: relative;
                .group-name{
                    position: absolute;
                    top: -75*0.4*0.02rem;
                    left: 50%;
                    margin-left: -75*0.4*0.02rem;
                    width: 150*0.4*0.02rem;
                    height: 150*0.4*0.02rem;
                    line-height: 150*0.4*0.02rem;
                    text-align: center;
                    font-size: 42*0.4*0.02rem;
                    color: #6c63ff;
                    border-radius: 50%;
                    border: 1px solid #6c63ff;
                    background-color: #ffffff;
                }
                &:nth-child(2){
                    border-color: #39cc6c;
                    p{
                        color: #39cc6c;
                        border-color: #39cc6c;
                    }
                }
                &:nth-child(3){
                    border-color: #eb1e1e;
                    p{
                        color: #eb1e1e;
                        border-color: #eb1e1e;
                    }
                }
                &:last-child{
                    border-color: #f37d7d;
                    margin-right: 0;
                    p{
                        color: #f37d7d;
                        border-color: #f37d7d;
                    }
                }
                .sub-item{
                    width: 100%;
                    border: 1px solid #dddddd;
                    border-radius: 4px;
                    min-height: 2.2rem;
                    margin-bottom: 20*0.4*0.02rem;
                    padding: 10*0.4*0.02rem;
                    .not-upload{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        display: none;
                        img{
                            width: 90*0.4*0.02rem;
                            height: 90*0.4*0.02rem;
                            position: absolute;
                            left: 0;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            margin: auto;
                        }
                    }
                    .detail-desc{
                        p{
                            font-size: 12px!important;
                            color: @fcolor;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                        }
                        .desc-left{
                            width: 30%;
                            float: left;
                            margin-right: 2%;
                            text-align: center;
                            img{
                                width: 64*0.4*0.02rem;
                                height: 64*0.4*0.02rem;
                                margin: 6*0.4*0.02rem auto;
                                border-radius: 50%;
                            }
                        }
                        .desc-right{
                            float: left;
                            width: 68%;
                            padding-right: 7.24%;
                            
                        }
                    }
                    .detail-btns{
                        margin: 5*0.4*0.02rem 0;
                        text-align: center;
                        display: flex;
                        a{
                            flex: 1;
                            font-size: 12px!important;
                            color: #6c63ff;
                            &.share{
                                flex: 1.5;
                            }
                        }
                    }
                    .detail-imgs{
                        text-align: center;
                        img{
                            width: 62*0.4*0.02rem;
                            height: 62*0.4*0.02rem;
                        }
                    }
                    
                }
                
            }
        }
    }
     .tips{
        position: absolute;
        z-index: 999;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
    .main-tips{
            width: 1240*0.02*0.4rem;
            height: 830*0.4*0.02rem;
            background-color: #ffffff;
            background: url("../../assets/images/send-tipbg.jpg") no-repeat center;
            background-size: contain;
            box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
            text-align: center;
            padding-top: 20*0.4*0.02rem;
            position: relative;
            &>i{
                position: absolute;
                width: 80*0.4*0.02rem;
                height: 80*0.4*0.02rem;
                top: 60*0.4*0.02rem;
                right: 60*0.4*0.02rem;
                font-size: 0.4rem;
                color: #8e8e8e;
                border-radius: 50%;
                box-shadow: 0 0 2px 2px rgba(0, 0, 0,0.2);
                padding: 3px;
                cursor: pointer;
            }
            .tip-img{
                margin-top: 30*0.4*0.02rem;
                max-width: 2.5rem;
            }
            .tips-title{
                text-align: center;
                color: #f32d2d;
                font-size: 0.36rem;
                margin: 0.4rem auto;
            }
            .tips-msg{
                font-size: 0.24rem;
                color: @fcolor;
                line-height: 26*0.02rem;
            }
        }
        .tips-btn{
            width: 100%;
            margin: 0.6rem auto 0;
            text-align: center;
            .tbtn{
                display: block;
                width: 320*0.4*0.02rem;
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
        &.active{
            z-index: 999;
            opacity: 1;
        }
    }
}
</style>