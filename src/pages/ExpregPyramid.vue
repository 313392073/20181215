<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">线线关系</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">探索正三棱锥</h3>
        <div class="main-box clearfix">
            <div class="pic-box">
                
            </div>
            <div class="desc-box clearfix">
                <p class="req-title">题目：请说明如图所示的三棱锥每条边线的关系</p>
                <p class="answer-desx">答案：</p>
                <div class="answer-box">
                    <input type="text" placeholder="请输入答案" class="anwer-detail">
                </div>
                <div class="btn-box">
                    <a href="javascript:void(0)">提交答案</a>
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
        width: 87.55%;
        margin: 0 auto 70*0.4*0.02rem;
        .pic-box{
            width: 50%;
            float: left;
            min-height: 995*0.4*0.02rem;
            border-radius: 4*0.4*0.02rem; 
            
        }
        .desc-box{
            width: 50%;
            float: left;
            .req-title,.answer-desx{
                font-size: 40*0.4*0.02rem;
                color: #676767;
                line-height: 110*0.4*0.02rem;
                min-height: 110*0.4*0.02rem;
            }

            .answer-box{
                width: 80%;
                margin: 25*0.4*0.02rem auto;
                min-height: 500*0.4*0.02rem;
                box-shadow: 0 0 3px 3px rgba(0,0,0,0.1);
                position: relative;
                .anwer-detail{
                    width: 90%;
                    position: absolute;
                    bottom: 20%;
                    left: 5%;
                    border: none;
                    border-bottom: 1px solid #a4a4a4;
                    font-size: 40*0.4*0.02rem;
                    color: #676767;
                    text-align: center;
                    line-height: 80*0.4*0.02rem;
                }
            }
            .btn-box{
                text-align: center;
                margin: 80*0.4*0.02rem auto;
                width: 100%;
                text-align: center;
                a{
                    display: block;
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
}

</style>