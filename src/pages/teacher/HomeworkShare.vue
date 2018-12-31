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
                                <p class="desc-text">{{subitem.tea_comment}}</p>
                            </div>
                        </div>
                        <div class="detail-btns">
                            <a href="" class="share">查看分享</a>
                            <a href=""><i class="iconfont icon-xin"></i>{{subitem.likes_user_num}}</a>
                            <a href=""><i class="iconfont icon-xuanzhong"></i>{{subitem.look_num}}</a>
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
        console.log(obj)
        return obj;
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
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
}
</style>