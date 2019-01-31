<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>视频分享<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
         <h3 class="title">视频上传列表</h3>
        <div class="main-box">
            <div class="group-wrapper clearfix">
                <div class="item clearfix" v-for="(item, key, index) in setItem" :key="index">
                    <p class="group-name">{{key}}组</p>
                    <div class="sub-item clearfix" v-for="(subitem,subIndex) in item" :key="subIndex">
                        <div class="left-img">
                            <video v-if="subitem.upload_net_url" :src="subitem.upload_net_url"></video>
                            <div v-else class="video-desc">暂未上传</div>
                        </div>
                        <div class="right-desc" v-if="subitem.upload_net_url"  @click="goDetail(subitem['attid'],key,subitem['user_head_image'])">
                            <div class="header-box">
                                <img :src="subitem.user_head_image" :alt="subitem.user_name">
                            </div>
                            <p class="desc-name">{{subitem.user_name}}</p>
                            <div class="go-detail">
                                <a href="javascript:void(0)">详情</a>
                            </div>
                        </div>
                        <div class="right-desc" v-else @click="showTips">
                            <div class="header-box">
                                <img :src="subitem.user_head_image" :alt="subitem.user_name">
                            </div>
                            <p class="desc-name">{{subitem.user_name}}</p>
                            <div class="go-detail">
                                <a href="javascript:void(0)">详情</a>
                            </div>
                        </div>
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
data() {
//这里存放数据
return {
    toggleTips:false,
    tipsMsg:'',
    groupList:[]
};
},
//监听属性 类似于data概念
computed: {
     setItem(){
        let obj = this.getAllkey();
        this.groupList.forEach((item,index) => {
            obj[item['groupname']].push(item)
        })
        let newkey = Object.keys(obj).sort();
        let newObj = {};
        for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj;
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getrefresh(){
        this.reload();
    },
    goBack(){
        this.$router.go(-1)
    },
    showTips(){
        this.tipsMsg = '暂未上传图片，无法查看详情';
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
    sumZan(num){
        let sum = 0;
            sum += num;
            this.totalZan = sum;
            return sum;
    },
    goDetail(attid,group,headImage){
        let attId = attid; 
        this.$router.push({name:'VideDetail',params:{attids:attId,groupInfo:group,headImage:headImage}})
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
                listtype:6*1
            }
            base.getUrl(API.allUrl.uploadList,params).then((res) => {
                 console.log(res)
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
    .title{
        height: 160*0.4*0.02rem;
        line-height: 160*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 92.165%;
        margin: 0 auto 70*0.4*0.02rem;
        .group-wrapper{
            padding-top: 80*0.4*0.02rem;
            width: 100%;
            .item{
                float: left;
                width: calc(~"23.5% - 4px");
                min-height: 8.2rem;
                margin-right: 2%;
                border: 1px solid #6c63ff;
                box-shadow: 0 0 5px 3px rgba(0,0, 0,0.1);
                padding: 100*0.4*0.02rem 20*0.4*0.02rem 20*0.4*0.02rem;
                margin-bottom: 100*0.4*0.02rem;
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
                    min-height: 200*0.4*0.02rem;
                    margin-bottom: 20*0.4*0.02rem;
                    .left-img{
                        padding: 10*0.4*0.02rem;
                        float: left;
                        border-right: 1px solid #dddddd;
                        width: calc(~"60% - 1px");
                        video{
                            max-width: 100%;
                            min-height: 175*0.4*0.02rem;
                        }
                        .video-desc{
                            max-width: 100%;
                            min-height: 175*0.4*0.02rem;
                            display: flex;
                            justify-content:center;
                            align-items: center;
                        }
                    }
                    .right-desc{
                        float: right;
                        width: 40%;
                        text-align: center;
                        padding: 10*0.4*0.02rem;
                        .header-box{
                            img{
                                width: 60*0.4*0.02rem;
                                height: 60*0.4*0.02rem;
                            }
                        }
                        .desc-name{
                            font-size: 12px!important;
                            color: @fcolor;
                            margin: 10*0.4*0.02rem auto;
                        }
                        .go-detail{
                            text-align: center;
                            a{
                                display: inline-block;
                                padding: 5*0.4*0.02rem 15*0.4*0.02rem;
                                background-color: #6c63ff;
                                color: #ffffff;
                                border-radius: 4px;
                                font-size: 34*0.4*0.02rem;
                            }
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