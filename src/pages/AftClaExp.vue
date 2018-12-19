<!--  -->
<template>
<div class="wrapper">
    <div class="left-wrapper">
    <div class="left-box">
    <div class="desc-menu">课后实验</div>
    <div class="main-wrapper">
        <h3 class="title">任务详情</h3>
        <div class="main-box">
            <div class="main-top-box clearfix">
                <div class="req-box">
                    <p>经过本堂课的学习，我们认识了棱锥，学习了正三棱锥的侧面积、表面积以及
                            体积的计算公式，那斜棱锥的体积该如何计算呢？请根据正三棱锥的体积计算
                            公式结合应用GGB软件探究思考斜棱锥的体积公式。
                    </p>
                    <p class="formula">正三棱锥的体积公式：</p>
                </div>
                <div class="req-img"><img src="/images/group-pic.png" alt=""></div>
            </div>
            <div class="answer-box">
                <p class="answer-title">答案：</p>
                <div class="answer-input"><input type="text" placeholder="请输入答案"></div>
            </div>
            <div class="btn-box"><a href="javascript:void(0)">提交答案</a></div>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@fcolor: #5c5a5a;
.left-box {
  height: 100%;
  width: 100%;
  .title {
    height: 160 * 0.4 * 0.02rem;
    line-height: 160 * 0.4 * 0.02rem;
    text-align: center;
    font-size: 44 * 0.4 * 0.02rem;
    color: @fcolor;
  }
  .main-box {
    width: 86.175%;
    margin: 0 auto 70 * 0.4 * 0.02rem;
    .main-top-box {
      width: 100%;
      min-height: 625 * 0.4 * 0.02rem;
      .req-box {
        float: left;
        width: 63%;
        padding: 0 40 * 0.4 * 0.02rem;
        font-size: 30 * 0.4 * 0.02rem;
        color: @fcolor;
        line-height: 50 * 0.4 * 0.02rem;
        .formula {
          margin-top: 50 * 0.4 * 0.02rem;
        }
      }
      .req-img {
        float: left;
        width: 37%;
        img {
          max-width: 90%;
          height: auto;
        }
      }
    }
    .answer-box {
      font-size: 30 * 0.4 * 0.02rem;
      color: @fcolor;
      .answer-input {
        width: 80%;
        margin: 30 * 0.4 * 0.02rem auto;
        height: 80 * 0.4 * 0.02rem;
        line-height: 80 * 0.4 * 0.02rem;
        border-bottom: 1px solid #b7c0cd;
        input {
          display: block;
          width: 100%;
          padding: 10 * 0.4 * 0.02rem;
          text-align: center;
          border: none;
          outline: none;
          font-size: 30 * 0.4 * 0.02rem;
          color: @fcolor;
        }
      }
    }

    .btn-box {
      width: 100%;
      margin: 100 * 0.4 * 0.02rem auto;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        width: 330 * 0.4 * 0.02rem;
        height: 104 * 0.4 * 0.02rem;
        line-height: 104 * 0.4 * 0.02rem;
        background-color: #6c63ff;
        color: #ffffff;
        font-size: 35 * 0.4 * 0.02rem;
        text-align: center;
        margin: auto;
        border-radius: 104 * 0.4 * 0.02rem;
      }
    }
  }
}
</style>