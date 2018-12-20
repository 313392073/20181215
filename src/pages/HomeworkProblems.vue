<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
  <div class="left-box">
    <div class="desc-menu">课后习题</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">表面积公式</h3>
        <div class="list-box">
        <p class="list-req" v-for="(item,index) in 5" :key="item"><span>题目0{{index+1}}</span>：正三棱锥的高为6,底面边长为4,求它的侧面积应该用什么公式？</p>
     
          <p class="list-req answerd-req"><span>答案：</span></p>
          <div class="answerd clearfix">
              <div class="item" v-for="(item,index) in 5" :key="item">
                    <p class="order"><span>0{{index+1}}</span></p>
                    <div class="answerd-box">
                        <input type="text" name="req2" placeholder="请输入答案" class="req2">
                    </div>
              </div>
          </div>
          <div class="ansowerd-btn"><button class="btn">提交答案</button></div>
        </div>
    </div>
    <div class="tips">
        <div class="main-tips" >
          <img class="tip-img" src="../assets/images/send-success.jpg" alt="send-success">
          <p class="tips-title">本轮结束</p>
          <div class="tips-msg">
              <p>恭喜你，本轮答题结束！</p>
              <p>我们根据你的作答情况，智能为你推送了以下联系，请继续答题以巩固所学知识</p>
          </div>
          <div class="tips-btn"><button class="tbtn gbtn">继续答题</button></div>
        </div>
        <div class="main-tips" style="display: none">
          <img class="tip-img" src="../assets/images/answer-over.jpg" alt="">
          <p class="tips-title">答题结束</p>
          <div class="tips-msg">
              <p>恭喜你，已答完所有题目！</p>
              <p>系统已自动帮你计算好分数，快快点击查看吧！</p>
          </div>
          <div class="tips-btn"><button class="cbtn tbtn">查看成绩</button></div>
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
        height: 106*0.4*0.02rem;
        line-height: 106*0.4*0.02rem;
        text-align: center;
        font-size: 0.352rem;
        color: @fcolor;
    }
    .list-box{
        width: 90.8%;
        margin: 0 auto 70*0.4*0.02rem; 
        font-size: 0.26rem;
        color: @fcolor;
        .list-req{
            min-width: 80*0.4*0.02rem;
            line-height: 80*0.4*0.02rem;
            color: @fcolor;
            font-size: 34*0.4*0.02rem;
        }
        .answerd-req{
            margin: 0.2rem 0;
        }
        .answerd{
            width: 100%;
            margin: 0 auto;
            .item{
                float: left;
                width: calc(~"20% - 80*0.4*0.02rem");
                min-height: 0.21rem;
                margin-left: 40*0.4*0.02rem;
                margin-right: 40*0.4*0.02rem;
                border-radius: 4px;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,.1);
                .order{
                    margin-top: 0.2rem;
                    text-align: center;
                    span{
                        display: block;
                        width: 85*0.4*0.02rem;
                        height: 85*0.4*0.02rem;
                        line-height: 85*0.4*0.02rem;
                        border-radius: 50%;
                        color: #ffffff;
                        background-color: #6c63ff;
                        margin: 0.15rem auto;
                        font-size: 0.3rem;
                    }
                }
                .answerd-box{
                    margin: 0.1rem auto 0.3rem;
                    .req2{
                        display: block;
                        width: 70%;
                        margin: 0.7rem auto 0;
                        line-height: 0.5rem;
                        border: none;
                        outline: none;
                        text-align: center;
                        color: @fcolor;
                        border-bottom: 1px solid #676767;
                    }
                }
            }
        }
        .ansowerd-btn{
            width: 100%;
            margin: 82*0.4*0.02rem auto 0.8rem;
            text-align: center;
            .btn{
                display: block;
                width: 346*0.4*0.02rem;
                height: 92*0.4*0.02rem;
                margin: 0 auto;
                line-height: 92*0.4*0.02rem;
                background-color: #6c63ff;
                color: #ffffff;
                font-size: 0.36rem;
                border-radius: 30px;
                border: none;
                outline: none;
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
        width: 1240*0.02*0.4rem;
        height: 830*0.4*0.02rem;
        background-color: #ffffff;
        background: url("../assets/images/send-tipbg.jpg") no-repeat center;
        background-size: contain;
        box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
        text-align: center;
        padding-top: 20*0.4*0.02rem;
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
</style>