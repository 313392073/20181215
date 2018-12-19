<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">正棱锥表面积检测数据统计</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title"></h3>
        <div class="main-box">
            <div class="echart"></div>
            <div class="detail-box clearfix">
                <div class="item">
                    <p>未作答</p>
                    <h3>3</h3>
                </div>
                 <div class="item">
                    <p>答题正确</p>
                    <h3>8</h3>
                </div>
                 <div class="item">
                    <p>答题错误</p>
                    <h3>5</h3>
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
        width: 90.78%;
        margin: 0 auto 70*0.4*0.02rem;
        .echart{
            width: 80%;
            margin: 0 auto;
            min-height: 870*0.4*0.02rem;
            background-color: antiquewhite;
        }
        .detail-box{
            width: 80%;
            margin: 20*0.4*0.02rem auto;
            .item{
                float: left;
                width: 30%;
                text-align: center;
                border-right: 1px dashed #d6d6d6;
                padding-top: 50*0.4*0.02rem;
                color: #3ad29f;
                p{
                    font-size: 38*0.4*0.02rem;
                    
                }
                h3{
                    font-size: 208*0.4*0.02rem;
                    line-height: 200*0.4*0.02rem;;
                }
                &:nth-child(2){
                    color: #6c63ff;
                }
                &:nth-child(3){
                    color: #ffba36;
                    border-right: 0;
                }
            }
        }
        
    }
}
</style>