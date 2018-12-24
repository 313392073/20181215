<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
 <div class="left-box">
    <div class="desc-menu">寻找棱锥</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">任务详情</h3>
        <div class="main-box">
            <div class="info-box clearfix">
                <div class="info-left">
                    <p class="desc">任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情</p>
                    <p class="info-list">任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情</p>
                    <p class="info-list">任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情</p>
                    <p class="info-list">任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情任务详情</p>
                </div>
                <div class="info-right">
                    <img src="../../assets/images/group-pic.png" alt="group-pic">
                </div>
            </div>
            <h3 class="title">任务分组</h3>
            <div class="info-group clearfix">
                <div class="item" v-for="item in 4" :key="item">
                    <p class="item-title">A组</p>
                    <div class="item-member clearfix">
                        <div class="tips-item" v-for="subitem in 10" :key="subitem">
                            <i class="iconfont icon-close_icon"></i>
                            <img src="../../assets/images/default.png" alt="">
                            <p>流星雨</p>
                        </div>
                    </div>
                    <div class="item-add"></div>
                </div>
            </div>
            <div class="back-btn"><button class="btn">任务布置</button></div>
        </div>
        <div class="tips-wrapper">
            <div class="tips-box">
                <p class="tips-title">组员管理<i class="iconfont icon-guanbi1"></i></p>
                <div class="tips-main clearfix">
                    <div class="tips-item" v-for="item in 10" :key="item">
                        <i class="iconfont icon-close_icon"></i>
                        <img src="../../assets/images/default.png" alt="">
                        <p>流星雨</p>
                    </div>
                </div>
                <div class="tips-btns">
                    <a href="">清空选择</a>
                    <a href="">确定选择</a>
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
    height: 100%;
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
        .info-box{
            width: 100%;
            .info-left{
                float: left;
                width: 60%;
                margin-right: 3%;
                p{
                    font-size: 0.26rem;
                    color: @fcolor;
                    line-height: 0.52rem;
                }
            }
            .info-right{
                float: right;
                width: 37%;
                padding-top: 0.1rem;
                img{
                    width: 100%;
                    height: auto;
                }
            }
        }
        .info-group{
            width: 100%;
            margin: 0.3rem auto;
            .item{
                float: left;
                width: 23.5%;
                margin-right: 2%;
                box-shadow: 0 0 5px 1px rgba(0,0,0, 0.1);
                position: relative;
                padding-bottom: 0.7rem;
                &:last-child{
                    margin-right: 0;
                }
                .item-title{
                    font-size: 44*0.4*0.02rem;
                    color: #333333;
                    line-height: 60*0.4*0.02rem;
                    height: 60*0.4*0.02rem;
                    text-align: center;
                }
                .item-member{
                    min-height: 1.5rem;
                    padding: 40*0.4*0.02rem 100*0.4*0.02rem;
                    overflow: hidden;
                    .tips-item{
                        float: left;
                        width: 174*0.4*0.02rem;
                        margin: 10*0.4*0.02rem 0; 
                        text-align: center;
                        position: relative;
                        i{
                            position: absolute;
                            right: 30*0.4*0.02rem;
                            font-size: 30*0.4*0.02rem;
                            color: #6c63ff;
                        }
                        img{
                            width: 129*0.4*0.02rem;
                            height: 129*0.4*0.02rem;
                            border-radius: 50%;
                        }
                        p{
                            font-size: 30*0.4*0.02rem;
                        }
                    }
                }
                .item-add{
                    height: 95*0.4*0.02rem;
                    width: 95*0.4*0.02rem;
                    position: absolute;
                    bottom: 0.05rem;
                    left: 50%;
                    margin-left: -95*0.4*0.01rem;
                    border-radius: 50%;
                    background: url("../../assets/images/add-meb.png") no-repeat center;
                    background-size: contain;
                }
            }
        }
        .back-btn{
            width: 100%;
            margin: 0.4rem auto 0.6rem;
            text-align: center;
            .btn{
                display: block;
                width: 340*0.4*0.02rem;
                height: 95*0.4*0.02rem;
                margin: 0 auto;
                line-height:  95*0.4*0.02rem;
                background-color: #6c63ff;
                color: #ffffff;
                font-size: 35*0.4*0.02rem;
                border-radius: 30px;
                border: none;
                outline: none;
            }
        }
    }
}
.tips-wrapper{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    .tips-box{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1245*0.4*0.02rem;
        height: 685*0.4*0.02rem;
        background-color: #ffffff;
        box-shadow: 0 0 5px 2px rgba(0,0,0, 0.2);
        margin: auto;
        padding-bottom: 155*0.4*0.02rem;
        border-radius: 4px;
        overflow: hidden;
        .tips-title{
            text-align: center;
            height: 112*0.4*0.02rem;
            line-height: 112*0.4*0.02rem;
            background-color: #6c63ff;
            color: #ffffff;
            font-size: 40*0.4*0.02rem;
            position: relative;
            i{
                position: absolute;
                top: 0;
                right: 60*0.4*0.02rem;
                font-size: 45*0.4*0.02rem; 
            }
        }
        .tips-main{
            height: 460*0.4*0.02rem;
            padding: 40*0.4*0.02rem 100*0.4*0.02rem;
            overflow: hidden;
            .tips-item{
                float: left;
                width: 174*0.4*0.02rem;
                margin: 10*0.4*0.02rem 0; 
                text-align: center;
                position: relative;
                i{
                    position: absolute;
                    right: 30*0.4*0.02rem;
                    font-size: 30*0.4*0.02rem;
                    color: #6c63ff;
                }
                img{
                    width: 129*0.4*0.02rem;
                    height: 129*0.4*0.02rem;
                    border-radius: 50%;
                }
                p{
                    font-size: 30*0.4*0.02rem;
                }
            }
        }
        
        .tips-btns{
            height: 155*0.4*0.02rem;
            line-height: 455*0.4*0.02rem;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            a{
                float: left;
                width: 340*0.4*0.02rem;
                height: 95*0.4*0.02rem;
                line-height: 95*0.4*0.02rem;
                background-color: #6c63ff;
                color: #ffffff;
                border-radius: 95*0.4*0.02rem;
                text-align: center;
                margin-left: 175*0.4*0.02rem;
                margin-top: 30*0.4*0.02rem;
                font-size: 30*0.4*0.02rem;
            }
        }
    }
    &.active{
        z-index: 999;
        opacity: 1;
    }
}
</style>