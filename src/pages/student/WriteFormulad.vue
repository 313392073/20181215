<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
 <div class="left-box">
    <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>在线测试<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">请写出您的答案</h3>
        <div class="main-box">
            <div class="canvas-box">
                <canvas class="canvas" id="canvas"></canvas>
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
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
import share from '../../router/http/share.js';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
inject:['reload'],
data() {
//这里存放数据
return {
    canvasMoveUse:'!1',
    preDrawAry:[],
    nextDrawAry:[],
    middleAry:[],
    retArr: [],
    tmpArr:[],
    trashArr:[],
    canvas:'',
    context:''
};
},
//监听属性 类似于data概念
computed: {
    totalScore:function(){
        var score = 0;
        this.scoreDetail.forEach((item,index) => {
            score += item.score*1;
        })
        return score;
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getrefresh(){
        this.reload();
    },
     goBack(){
        this.$router.go(-1)
    },
    initDraw() { //初始化画布
		var t = this.context.getImageData(0, 0, 800, 400);
		this.middleAry.push(t)
    },
    IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
    },
    onMouseStart(t){
        this.tmpArr = [],
        this.canvasMoveUse = !0;
        var e = t.clientX - t.target.parentNode.offsetLeft,
        r = t.clientY - t.target.parentNode.offsetTop;
        this.context.beginPath(),
        this.context.moveTo(e, r);
        var n = this.context.getImageData(0, 0, 800, 400);
        this.preDrawAry.push(n)
    },
    onMouseMove(t){
        if (this.canvasMoveUse) {
            var e = t.target,
            r = t.clientX - e.parentNode.offsetLeft,
            n = t.clientY - e.parentNode.offsetTop;
            this.tmpArr.push([r, n]),
            this.context.lineTo(r, n),
            this.context.stroke()
        }
    },
    onMouseEnd(){
        var e = this.context.getImageData(0, 0, 800, 400);
        this.retArr.push(this.tmpArr),
        this.trashArr = [],
        this.nextDrawAry.length ? (this.middleAry = [],this.middleAry = this.middleAry.concat(this.preDrawAry), this.middleAry.push(e), this.nextDrawAry = []) : this.middleAry.push(e),
        this.canvasMoveUse = !1
    },
    onTouchStart(t){
        this.tmpArr = [],
        this.canvasMoveUse = !0;
        var e = t.targetTouches[0].clientX - t.target.parentNode.offsetLeft,
        r = t.targetTouches[0].clientY - t.target.parentNode.offsetTop;
        this.context.beginPath(),
        this.context.moveTo(e, r);
        var n = this.context.getImageData(0, 0, 800, 400);
        this.preDrawAry.push(n)
    },
    onTouchMove(t){
        if (this.canvasMoveUse) {
            var e = t.target,
            r = t.targetTouches[0].clientX - e.parentNode.offsetLeft,
            n = t.targetTouches[0].clientY - e.parentNode.offsetTop;
            this.tmpArr.push([r, n]),
            this.context.lineTo(r, n),
            this.context.stroke()
        }
        t.preventDefault()
    },
    onTouchEnd(){
        var e = this.context.getImageData(0, 0, 800, 400);
        this.retArr.push(this.tmpArr),
        this.trashArr = [],
        this.nextDrawAry.length ? (this.middleAry = [], this.middleAry = this.middleAry.concat(this.preDrawAry), this.middleAry.push(e), this.nextDrawAry = []) : this.middleAry.push(e),
        this.canvasMoveUse = !1
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this;
    let params = {
        token:store.state.token
    }
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.shadowBlur=1;
	this.context.lineWidth=1;	
	this.context.shadowColor="#000000";
    this.context.strokeStyle="#000000";
    this.initDraw();
    if(this.IsPC()){
        document.getElementById('canvas').addEventListener('mousedown',this.onMouseStart,false);
		document.getElementById('canvas').addEventListener('mousemove',this.onMouseMove,false);
		document.getElementById('canvas').addEventListener('mouseup',this.onMouseEnd,false);
    }else{
        document.getElementById('canvas').addEventListener('touchstart',this.onTouchStart,false);
		document.getElementById('canvas').addEventListener('touchmove',this.onTouchMove,false);
		document.getElementById('canvas').addEventListener('touchend',this.onTouchEnd,false);
    }
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
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 100%;
        margin: 0 auto 70*0.4*0.02rem;
        .canvas-box{
            width: 100%;
            min-width: 80%;
            .canvas{
                width: 800px;
                height: 400px;
                border:1px solid red;
            }
        }
    }
}
</style>