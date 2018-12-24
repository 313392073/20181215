<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">寻找棱锥</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">视频详情</h3>
        <div class="main-box">
            <div class="info-box clearfix">
                <div class="info-left">
                    <img src="/images/default.png" alt="">
                    <span>B组</span>
                </div>
                <div class="info-right">
                    <p class="info-title">王心怡</p>
                    <p class="info-time">上传时间：2018年09月18日 12:23:06</p>
                </div>
            </div>
            <div class="video-box">
                <video src=""></video>
            </div>
            <div class="back-btn"><button class="btn">返回</button></div>
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
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
            background-color: #39cc6c;
            margin-top: 40*0.4*0.02rem;
            video{
                width: 100%;
                height: 100%;
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