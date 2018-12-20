<!--  -->
<template>
<div class="course-wrapper">
    <p class="title">课程安排设置</p>
    <div class="main-wrapper">
        <div class="slider-box clearfix">
            <div class="item" v-for="item in 5" :key="item">
                <div class="sub-item"></div>
            </div>
        </div>
        <div class="step-box">
            <p class="step1">第 <span class="step-order">01</span> 步：选择课程内容<span class="step-desc">(可滑动或点击箭头选择课程内容)</span></p>
        </div>
        <div class="step-wrapper clearfix">
            <div class="step-item">
                <div class="step-detail"></div>
                <p class="step1">第 <span class="step-order">02</span> 步：选择课程模块<span class="step-desc">(点击增加模块，再点击取消模块)</span></p>
            </div>
            <div class="step-item">
                <div class="step-detail"></div>
                <p class="step1">第 <span class="step-order">03</span> 步：调整模块顺序<span class="step-desc">(按住拖动可调整模块顺序)</span></p>
            </div>
        </div>
        <div class="btn-box"><a href="javascript:void(0)" class="cbtn">确认提交</a></div>
    </div>
    <div class="tips">
        <div class="main-tips">
          <i class="iconfont icon-guanbi1"></i>
          <img class="tip-img" src="../assets/images/submit.png" alt="submit">
          <p class="tips-title">提交确认</p>
          <div class="tips-msg">
              <p>已完成课程设置，提交后不可修改！</p>
          </div>
          <div class="tips-btn"><button class="tbtn gbtn">确认</button></div>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
//import引入的组件需要注入到对象中才能使用
components: {

},
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
.course-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    .title{
        height: 1.6rem;
        line-height: 1.6rem;
        border-bottom: 1px solid #dddddd;
        font-size: 0.352rem;
        text-align: center;
        color: #5c5a5a;
    }
    .main-wrapper{
        width: 92%;
        margin: 0 auto;
        height: calc(~"100% - 1.6rem");
        overflow-y: auto;
        .slider-box{
            width: 100%;
            height: 500*0.4*0.02rem;
            background-color: #dddddd;
            padding: 25*0.4*0.02rem 0;
            .item{
                height: 100%;
                width: 20%;
                float: left;
                padding: 0 25*0.4*0.02rem;
                .sub-item{
                    width: 100%;
                    height: 100%;
                    background-color: red;
                }
            }
            
        }
        .step-box{
            font-size: 40*0.4*0.02rem;
            color: #5c5a5a;
            text-align: center;
            height: 145*0.4*0.02rem;
            line-height: 145*0.4*0.02rem;
            .step-order{
                display: inline-block;
                width: 70*0.4*0.02rem;
                height: 70*0.4*0.02rem;
                line-height: 70*0.4*0.02rem;
                text-align: center;
                background-color: #6c63ff;
                color: #ffffff;
                font-size: 48*0.4*0.02rem;
                border-radius: 50%;
            }
            .step-desc{
                font-size: 30*0.4*0.02rem;
            }
        }
        .step-wrapper{
            width: 100%;
            .step-item{
                float: left;
                width: 48.5%;
                margin-right: 3%;
                font-size: 40*0.4*0.02rem;
                color: #5c5a5a;
                text-align: center;
                &:nth-child(2n){
                    margin-right: 0;
                }
                .step-detail{
                    width: 100%;
                    min-height: 425*0.4*0.02rem;
                    background-color: #ffffff;
                }
                .step-order{
                    display: inline-block;
                    width: 70*0.4*0.02rem;
                    height: 70*0.4*0.02rem;
                    line-height: 70*0.4*0.02rem;
                    text-align: center;
                    background-color: #6c63ff;
                    color: #ffffff;
                    font-size: 48*0.4*0.02rem;
                    border-radius: 50%;
                }
                .step-desc{
                    font-size: 30*0.4*0.02rem;
                }
            }
        }
        .btn-box{
            width: 100%;
            margin: 75*0.4*0.02rem auto;
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
            width: 1240*0.02*0.4rem;
            height: 830*0.4*0.02rem;
            background-color: #ffffff;
            background: url("../assets/images/send-tipbg.jpg") no-repeat center;
            background-size: contain;
            box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
            text-align: center;
            padding-top: 20*0.4*0.02rem;
            position: relative;
            .icon-guanbi1{
                width: 80*0.4*0.02rem;
                height: 80*0.4*0.02rem;
                line-height: 80*0.4*0.02rem;
                position: absolute;
                top: 80*0.4*0.02rem;
                right: 85*0.4*0.02rem;
                font-size: 60*0.4*0.02rem;
                background-color: #ffffff;
                border-radius: 50%;
                box-shadow: 0 0 5px 3px rgba(0,0,0,.1);
            }
            .tip-img{
                margin-top: 30*0.4*0.02rem;
                max-width: 2.5rem;
            }
            .tips-title{
                text-align: center;
                color: #f32d2d;
                font-size: 0.36rem;
                margin: 0.4rem auto;
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
            .tbtn{
                display: block;
                width: 320*0.4*0.02rem;
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
        &.active{
            z-index: 999;
            opacity: 1;
        }
    }
}
</style>