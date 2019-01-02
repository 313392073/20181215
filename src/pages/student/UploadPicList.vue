<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">寻找棱锥</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
         <h3 class="title">图片上传列表</h3>
        <div class="main-box">
            <div class="group-wrapper clearfix">
                <div class="item" v-for="(item, key, index) in setItem" :key="index">
                    <p class="group-name">{{key}}组</p>
                    <div class="sub-item clearfix" v-for="(subitem,subIndex) in item" :key="subIndex" @click="goDetail(subitem['attid'],key,subitem['user_head_image'])">
                        <div class="left-img">
                            <img :src="subitem.upload_net_url" :alt="subitem.user_name">
                        </div>
                        <div class="right-desc">
                            <div class="header-box"><img :src="subitem.user_head_image" :alt="subitem.user_name"></div>
                            <p class="desc-name">{{subitem.user_name}}</p>
                            <div class="go-detail">
                                <span><i class="iconfont icon-xin"></i>{{subitem.likes_user_num}} <input type="hidden" :value="sumZan(subitem.likes_user_num)"/></span>
                            </div>
                        </div>
                    </div>
                    <div class="desc">共获得 <span>{{totalZan}}</span>个赞</div>
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
    groupList:[],
    totalZan:0
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
        console.log(obj)
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
        this.$router.push({name:'PicDetail',params:{attids:attId,groupInfo:group,headImage:headImage}})
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
                listtype:1*1
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
                width: calc(~"23.5% - 2px");
                margin-right: 2%;
                border: 1px solid #6c63ff;
                box-shadow: 0 0 5px 3px rgba(0,0, 0,0.1);
                padding: 100*0.4*0.02rem 20*0.4*0.02rem 20*0.4*0.02rem;
                position: relative;
                .desc{
                    text-align: center;
                    span{
                        font-size: 40*0.4*0.02rem;
                        color: #6c63ff;
                    }
                }
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
                    .desc{
                        span{
                            color: #39cc6c;
                        }
                    }
                }
                &:nth-child(3){
                    border-color: #eb1e1e;
                    p{
                        color: #eb1e1e;
                        border-color: #eb1e1e;
                    }
                    .desc{
                        span{
                            color: #eb1e1e;
                        }
                    }
                }
                &:last-child{
                    border-color: #f37d7d;
                    margin-right: 0;
                    p{
                        color: #f37d7d;
                        border-color: #f37d7d;
                    }
                    .desc{
                        span{
                            color: #f37d7d;
                        }
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
                        img{
                            min-height: 180*0.4*0.02rem;
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
                            span{
                                i{
                                    color: #fc4d3e;
                                    font-size: 34*0.4*0.02rem;
                                    margin-right: 5*0.4*0.02rem;
                                }
                            }
                        }
                    }
                }
                
            }
        }
    }
}
</style>