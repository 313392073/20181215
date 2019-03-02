<!--  -->
<template>
<div class="wrapper">
    <div class="left-wrapper">
    <div class="left-box">
        <div class="desc-menu">寻找棱锥<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
        <!-- 主要内容 -->
        <div class="main-wrapper">
            <h3 class="title">小组分配情况</h3>
            <div class="main-box">
                <div class="group-wrapper">
                    <div class="item" v-for="(item,index) in groupList" :key="index">
                        <div class="item-title">{{item.groupname}}组</div>
                        <div class="item-detail">
                            <div class="groupers-box clearfix">
                                <div class="sub-item" v-for="(subitem,subIndex) in item.groupuser_names.split(',')" :key="subIndex">
                                    <img :src="item.groupuser_headimages.split(',')[subIndex]">
                                    <p>{{item.groupuser_names.split(',')[subIndex]}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-box"><a href="javascript:void(0)" class="cbtn" @click="goNext">下一步</a></div>
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
    groupList:[]
};
},
//监听属性 类似于data概念
computed: {
   
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getrefresh(){
        this.reload();
    },
    goNext(){
        this.$router.push('/stuuploadpic')
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
            let params1 = {
                token:store.state.token,
                batch:res.obj
            }
            base.getUrl(API.allUrl.findPyramid,params1).then((res) => {
                console.log(res)
                if(res.code == 200 && res.success == 1) {
                    this.groupList = res.obj;
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
        height: 142*0.4*0.02rem;
        line-height: 142*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 86%;
        margin: 0 auto 70*0.4*0.02rem;
        .group-wrapper{
            width: 100%;
            .item{
                float: left;
                width: calc(~"48.3% - 2px");
                margin-right: 3.4%;
                margin-bottom: 50*0.4*0.02rem;
                border: 1px solid #e6e6e6;
                box-shadow: 0 0 5px 1px rgba(0, 0, 0,0.1);
                &:nth-child(2n){
                    margin-right: 0;
                }
                .item-title{
                    width: 100%;
                    line-height: 120*0.4*0.02rem;
                    height: 120*0.4*0.02rem;
                    border-bottom: 1px dashed #e6e6e6;
                    font-size: 48*0.4*0.02rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #6c63ff;
                }
                .item-detail{
                    text-align: center;
                    font-size: 34*0.4*0.02rem;
                    padding: 40*0.4*0.02rem 20*0.4*0.02rem;
                    img{
                        width: 140*0.4*0.02rem;
                        height: 140*0.4*0.02rem;
                        margin-bottom: 15*0.4*0.02rem;
                    }
                    .sub-item{
                        float: left;
                        width: 25%;
                        margin-bottom: 30*0.4*0.02rem;
                        img{
                            border-radius: 50%;
                        }
                    }
                }
                &:nth-child(2){
                    .item-title{
                        color: #22b14c;
                    }
                }
                 &:nth-child(3){
                    .item-title{
                        color: #ea1e1e;
                    }
                }
                 &:nth-child(4){
                    .item-title{
                        color: #f7a9a9;
                    }
                }
            }
        }
        .btn-box{
            width: 100%;
            margin: 25*0.4*0.02rem auto;
            display: flex;
            justify-content: center;
            align-items: center;
            a{
                width: 280*0.4*0.02rem;
                height: 84*0.4*0.02rem;
                line-height: 84*0.4*0.02rem;
                background-color: #6c63ff;
                color: #ffffff;
                font-size: 34*0.4*0.02rem;
                text-align: center;
                margin: auto;
                border-radius: 104*0.4*0.02rem;
            }
        }
    }
}
</style>