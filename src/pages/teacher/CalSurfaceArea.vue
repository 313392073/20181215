<!--  -->
<template>
<div class="wrapper">
    <div class="left-wrapper">
        <div class="left-box">
            <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>计算表面积</div>
            <!-- 主要内容 -->
            <div class="main-wrapper">
                <h3 class="title"></h3>
                <div class="main-box">
                    <div class="upload-box"><img src="../../assets/images/upload.png" alt="upload" class="default-bg"></div>
                    <div class="btn-box"><a href="javascript:void(0)">保存并推送</a></div>
                </div>
            </div>
        </div>
        <div class="tips">
        <div class="main-tips">
            <p class="tips-title">题库选择 <i class="iconfont icon-guanbi1"></i></p>
            <div class="tips-msg">
                
            </div>
            <div class="tips-btn clearfix">
                <p><button class="cbtn ebtn">清空选择</button></p>
                <p><button class="cbtn qbtn">确定选择</button></p>
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
    goBack(){
        this.$router.go(-1)
    },
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
.tips{
    position: absolute;
    // z-index: -1;
    // opacity: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    .main-tips{
        width: 1230*0.02*0.4rem;
        height: 795*0.4*0.02rem;
        background-color: #ffffff;
        box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
        border-radius: 6px;
        overflow: hidden;
        text-align: center;
        .tips-title{
            text-align: center;
            font-size: 40*0.4*0.02rem;
            height: 112*0.4*0.02rem;
            line-height: 112*0.4*0.02rem;
            background-color: #6c63ff;
            color: #ffffff;
            border-radius: 6px;
            overflow: hidden;
            position: relative;
            i{
                position: absolute;
                right: 55*0.4*0.02rem;
                top: 0;
                font-size: 45*0.4*0.02rem;
            }
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
        p{
            float: left;
            width: 50%;
            button{
                display: block;
                width: 320*0.4*0.02rem;
                height: 95*0.4*0.02rem;
                margin: 0 auto;
                line-height: 95*0.4*0.02rem;
                background-color: #6c63ff;
                color: #ffffff;
                font-size: 0.36rem;
                border-radius: 90*0.4*0.02rem;
                border: none;
                outline: none;
            }
        }
        
    }
    &.active{
        z-index: 999;
        opacity: 1;
    }
}
</style>