<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">视频分享</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">视频上传</h3>
        <div class="main-box">
            <p class="main-title">美美的包装盒做好啦~上传属于你的包装盒制作过程的视频，和同学们一起探讨棱锥的奥秘吧！</p>
            <div class="upload-box"><img src="../../assets/images/upload.png" alt="upload" class="default-bg"></div>
            <div class="btn-box"><a href="javascript:void(0)">保存并上传</a></div>
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
        width: 91.24%;
        margin: 0 auto 70*0.4*0.02rem;
        .main-title{
            font-size: 35*0.4*0.02rem;
            color: @fcolor;
            height: 100*0.4*0.02rem;
            line-height: 100*0.4*0.02rem;
        }
        .upload-box{
            width: 100%;
            height: 1000*0.4*0.02rem;
            padding: 55*0.47*0.02rem 0;
            border: 1px dashed #cdcdcd;
            text-align: center;
            .default-bg{
                width: 1140*0.4*0.02rem;
                height: auto;
            }
        }
      
        .btn-box{
            width: 100%;
            margin: 100*0.4*0.02rem auto ;
            display: flex;
            justify-content: center;
            align-items: center;
            a{
                width: 500*0.4*0.02rem;
                height: 104*0.4*0.02rem;
                line-height: 104*0.4*0.02rem;
                background-color: #6c63ff;
                color: #ffffff;
                font-size: 35*0.4*0.02rem;
                text-align: center;
                margin: auto;
                border-radius: 104*0.4*0.02rem;
            }
        }
    }
}
</style>