<!--  -->
<template>
<div id='box'>
  <span class="gs-box">$v = \frac{1}{3}sh$</span>
  <span class="gs-box">$s = \frac{1}{2} a h *9$</span>


  <!-- $\frac{1}{3}sh$
$v = \frac{1}{3}sh$   
$\alpha+\beta=\gamma$
$$\alpha+\beta=\gamma$$ -->
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import share from '../router/http/share.js';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  str:'',
  aa:'$v = \frac{1}{3}sh$'
};
},
//监听属性 类似于data概念
computed: {
  strs(){
    return this.str = '<span class="gs-box">$v = \frac{1}{3}sh$</span>'
  }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  if (share.isMathjaxConfig === false) { // 如果：没有配置MathJax
    share.initMathjaxConfig();
  }
  // let s = "经过本堂课的学习，<gs>s = \frac{1}{2} a h *9</gs>我们认识了棱锥，学习了正三棱锥的侧面积、表面积及提交的计算公式，那斜棱锥的体积该怎么计算呢？请根据正三棱锥提交的计算公式结合应用GGB软件探究思考斜棱锥的体积公式。<br/>正三棱锥的体积公式：<gs>v = rac{1}{3}sh</gs>";
  // let str = "aaa<gs>jjjjj<gs>aaa";
  // console.log(s.replace(/<gs>([\s\S]*?)<\/gs>/g,'<input />'))
  // // console.log(s.replace(/<gs>([\s\S]*?)<\/gs>/))
  // console.log(s.match(/<gs>([\s\S]*?)<\/gs>/g))
  // console.log(s.match(/<gs>([\s\S]*?)<\/gs>/g)[0])
  // console.log(s.match(/<gs>([\s\S]*?)<\/gs>/g)[1])
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('box')]);
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
#box{
  width: 800px;
  height: 400px;
  border: 1px solid red;
  margin: 0 auto;
}
.mjx-chtml {
  outline: 0;
}
.MJXc-display {
  overflow-x: auto;
  overflow-y: hidden;
}
</style>