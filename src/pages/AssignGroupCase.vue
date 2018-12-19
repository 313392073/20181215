<!--  -->
<template>
<div class="wrapper">
    <div class="left-wrapper">
    <div class="left-box">
        <div class="desc-menu">寻找棱锥</div>
        <!-- 主要内容 -->
        <div class="main-wrapper">
            <h3 class="title">分配小组</h3>
            <div class="main-box">
                <div class="group-wrapper clearfix">
                    <div class="item clearfix" v-for="item in 4" :key="item">
                        <div class="item-left">A组</div>
                        <div class="item-right">
                            <div class="grouper">
                                <img src="../assets/images/default.png" alt="default">
                                <p><span>组长</span>流星雨</p>
                            </div>
                        
                            <div class="groupers-box clearfix">
                                <div class="sub-item" v-for="subitem in 3" :key="subitem">
                                    <img src="../assets/images/default.png" alt="default">
                                    <p>流星雨</p>
                                </div>
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
                .item-left{
                    float: left;
                    width: calc(~"26.56% - 1px");
                    height: 100%;
                    border-right: 1px dashed #e6e6e6;
                    font-size: 48*0.4*0.02rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 490*0.4*0.02rem;
                }
                .item-right{
                    float: right;
                    width: 73.44%;
                    text-align: center;
                    font-size: 34*0.4*0.02rem;
                    padding: 40*0.4*0.02rem 20*0.4*0.02rem;
                    .grouper{
                        width: 100%;
                        margin-bottom: 30*0.4*0.02rem;
                        span{
                            position: relative;
                            left: -40*0.4*0.02rem;
                        }
                    }
                    img{
                        width: 140*0.4*0.02rem;
                        height: 140*0.4*0.02rem;
                        margin-bottom: 15*0.4*0.02rem;
                    }
                    .sub-item{
                        float: left;
                        width: 33%;
                        margin-bottom: 30*0.4*0.02rem;
                    }
                }
            }
        }
    }
}
</style>