<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">寻找棱锥</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">探索正三棱锥</h3>
        <div class="main-box">
            <div class="pic-bpx">
                
            </div>
            <div class="btn-box clearfix">
                <a href="javascript:void(0)">正视图</a>
                <a href="javascript:void(0)">俯视图</a>
                <a href="javascript:void(0)">左视图</a>
                <a href="javascript:void(0)">左视图</a>
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
        width: 81.79%;
        margin: 0 auto 70*0.4*0.02rem;
        .pic-bpx{
            width: 100%;
            height: 995*0.4*0.02rem;
            border-radius: 4*0.4*0.02rem; 
            box-shadow: 0 0 3px 3px rgba(0,0,0,0.1);
        }
        .btn-box{
            width: 100%;
            margin: 45*0.4*0.02rem auto;
            display: flex;
            justify-content: center;
            align-items: center;
            a{
                width: 330*0.4*0.02rem;
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