<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">作业分享<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <div class="main-box">
            <div class="group-wrapper clearfix">
                <div class="item clearfix" v-for="(item, key, index) in setItem" :key="index">
                    <p class="group-name">{{key == 'undefined'?order(index):key}}组</p>
                    <div class="sub-item" v-for="(subitem,subIndex) in item" :key="subIndex" v-if="subitem.group_id != -1">
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
                            <slot v-if="subitem.upload_net_url">
                                 <img v-if="subitem.upload_net_url.length == 1" :src="subitem.upload_net_url.length" alt="group-pic">
                                 <img v-if="subitem.upload_net_url.length > 1" v-for="(picItem,picIndex) in subitem.upload_net_url.split(',')" :key="picIndex" :src="picItem" alt="group-pic" :class="picIndex >= 4?'imgHide':''">
                            </slot>
                            <slot v-else>
                                <p>暂未上传任何图片</p>
                            </slot>
                        </div>
                    </div>
                    <div v-for="(pitem,index) in item" :key="index+20">
                         <div class="sub-item nosub-item" v-if="pitem['inGroup'] && isInArray">
                            <div class="not-upload"><img  @click="showUpload" src="../../assets/images/noupload.png" alt="noupload"></div>
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
            <div class="tips-btn"><button class="cbtn tbtn" @click="refreshHide">好的</button></div>
            </div>
        </div>
        <!-- 上传时的弹窗 -->
        <div class="upload-wrapper" v-show="uploadTap">
            <div class="main-tips">
                <div class="uploadmain-wrapper">
                    <div class="comment-box">
                        <textarea name="comment" cols="30" rows="10" v-model="commentMsg" placeholder="请输入您的评论..."></textarea>
                    </div>
                    <div class="upload-picbox">
                        <img v-for="(item,index) in picList" :key="index" class="upload-default" :src="item">
                        <img src="../../assets/images/add.png" @click="chooseImg($event)">
                        <input type="file" name="file" accept="image/png,image/jpg,image/jepg,image/gif" ref="filElem" class="upload-file" @change="uploadImg" v-if="isInArray">
                    </div>
                    <div class="tips-btn">
                        <button class="btn" @click="HideUpload">取消</button>
                        <button class="btn active" @click="shareUpload" v-if="isInArray">分享</button>
                    </div>
                </div>
                <!-- 取消是否保存 -->
                <div class="qre-wrapper" v-show="isSave">
                    <h3>将此次编辑保留？</h3>
                    <div class="qre-btn clearfix">
                        <span @click="Save(0)">不保留</span>
                        <span class="active" @click="Save(1)">保留</span>
                    </div>
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
import Axios from 'axios';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
inject:['reload'],
data() {
//这里存放数据
return {
    commentMsg:'',
    picList:[],
    uploadDefault:'',
    uploadTap:false,
    isSave:false,
    batch:'',
    groupList:[],
    toggleTips:false,
    tipsMsg:'',
    isInArray:false
};
},
//监听属性 类似于data概念
computed: {
    setItem(){
        let userLoginname = store.state.user?JSON.parse(store.state.user)['userLoginname']:''
        let obj = this.getAllkey();
        this.groupList.forEach((item,index) => {
            item['inGroup'] = false
            if(item['user_loginname'] == userLoginname) {
                item['inGroup'] = true
            }
            obj[item['groupname']].push(item)
        })
        let newkey = Object.keys(obj).sort();
        let newObj = {};
        for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        console.log(newObj)
        return newObj;
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    order(num) {
        return share.order[num]
    },
    getrefresh(){
        this.reload();
    },
    showTips(){
        this.tipsMsg = '暂无评论，无法查看详情';
        this.toggleTips = true;
    },
    HideTip(){
        this.tipsMsg = '';
        this.toggleTips = false;
    },
    refreshHide() {
        let self = this;
        self.HideTip();
        setTimeout(function() {
            self.reload();
        },1000)
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
        this.$router.push({name:'StuShareDetail',params:{attids:attId,useName:useName,headImage:headImage}})
    },
    showUpload(){
        this.uploadTap = true;
    },
    HideUpload(){
         this.isSave = true;
    },
    Save(tag){
        if(tag == 0) {
          this.commentMsg = '';
          this.picList = [];
        }
        this.uploadTap = false;
        this.isSave = false;
    },
    chooseImg(e){
        if(this.picList.length >= 4) {
            alert('最多支持同时上传4张图片');
            return false;
        }
        this.$refs.filElem.dispatchEvent(new MouseEvent('click')) 
    },
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
            if(formData.get('file') != 'undefined') {
                Axios({
                    method:'post',
                    baseURL:base.baseURL,
                    url:API.allUrl.upload+'?token='+store.state.token+'&batch='+self.batch+'&fileType=11',
                    data:formData,
                }).then((res) => {
                    if(res.data.code == 200 && res.data.success == 1) {
                        self.picList.push(res.data.obj)
                    }else{
                        self.tipsMsg = '网络错误，上传头像失败'
                        self.toggleTips = true;
                        return false;
                    }
                })
            }else{
                self.tipsMsg = '请先选择要上传的图片'
                self.toggleTips = true;
                return false;
            }
        }
    },
    shareUpload(){
        if(this.picList.length < 1 || this.commentMsg == '') {
            this.tipsMsg = '请将评论信息填写完整';
            this.toggleTips = true;
            return false;
        }
         Axios({
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                },
                method:'post',
                baseURL:base.baseURL,
                url:API.allUrl.workShare+'?token='+store.state.token+'&batch='+this.batch+'&content='+this.commentMsg,
                data:this.picList,
         }).then((res) => {
             if(res.data.success == 1 && res.data.code == 200) {
                this.tipsMsg = '分享成功';
                this.toggleTips = true;
                this.uploadTap = false;
                this.commentMsg = '';
                this.picList = [];
                this.isSave = false;
             }
        })
    },
    getInit(params) {
        let self = this;
        base.getUrl(API.allUrl.uploadList,params).then((res) => {
            console.log(res)
            if(res.code == 200 && res.success == 1) {
                self.groupList = res.obj;
            }
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   let self = this;
   let params = {
        token:store.state.token,
        batch:store.state.batch,
        listtype:11*1
    }
    self.batch = store.state.batch
    if(store.state.batch) {
        this.getInit(params)
    }else{
        let param = {
            token:store.state.token
        }
         base.getUrl(API.allUrl.batch,param).then(res => {
            if(res.code == 200 && res.success ==  1) {
                self.batch = res.obj;
                params['batch'] = res.obj
                self.getInit(params)
            }
        })
    }
   
    let num = 4
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
                width: calc(~"23.5% - 4px");
                margin-right: 2%;
                border: 1px solid #6c63ff;
                box-shadow: 0 0 5px 3px rgba(0,0, 0,0.1);
                margin-bottom: 100*0.4*0.02rem;
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
                    &.nosub-item{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .not-upload{
                            width: 100%;
                            height: 100%;
                             display: flex;
                            justify-content: center;
                            align-items: center;
                        img{
                            width: 90*0.4*0.02rem;
                            height: 90*0.4*0.02rem;
                        }
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
                            &.imgHide{
                                display: none;
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
    }
    .upload-wrapper{
        position: absolute;
        z-index: 888;
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
            box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
            text-align: center;
            padding-top: 20*0.4*0.02rem;
            border-radius: 12*0.4*0.02rem;
            position: relative;
            .comment-box{
                width: 96%;
                min-height:400*0.4*0.02rem;
                margin: 20*0.4*0.02rem auto;
                textarea{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ffffff;
                    color: @fcolor;
                }
            }
            .upload-picbox{
                text-align: left;
                padding-left: 30*0.4*0.02rem;
                img{
                    width: 220*0.4*0.02rem;
                    height: 220*0.4*0.02rem;
                    border: 1px solid #ecebeb;
                    margin-right: 10*0.4*0.02rem;
                }
                .upload-file{
                    display: none;
                }
            }
            .qre-wrapper{
                position: absolute;
                top: 30%;
                left: 20%;
                width: 60%;
                border: 1px solid #ececee;
                border-radius: 18*0.4*0.02rem;
                text-align: center;
                 box-shadow: 0 0 5px 3px rgba(0,0, 0,0.1);
                h3{
                    color: @fcolor;
                    font-size: 40*0.4*0.02rem;
                    min-height: 100*0.4*0.02rem;
                    line-height: 100*0.4*0.02rem;
                }
                .qre-btn{
                    border-top: 1px solid #ececec;
                    span{
                        float: left;
                        border-right: 1px solid #ececec;
                        width: calc(~"50% - 1px");
                        min-height: 80*0.4*0.02rem;
                        line-height: 80*0.4*0.02rem;
                        &:nth-child(2){
                            border-right: none;
                        }
                        &.active{
                            color: #6c63ff;
                        }
                    }
                }
            }
        }
        .tips-btn{
            width: 100%;
            text-align: right;
            padding-right: 50*0.4*0.02rem;
            .btn{
                display: inline-block;
                width: 250*0.4*0.02rem;
                height: 90*0.4*0.02rem;
                margin: 0 auto;
                line-height: 90*0.4*0.02rem;
                background-color: #ffffff;
                color: @fcolor;
                font-size: 0.36rem;
                border-radius: 20*0.4*0.02rem;
                border: none;
                outline: none;
                &.active{
                    color: #ffffff;
                    background-color: #6c63ff;
                }
            }
        }
    }
}
</style>