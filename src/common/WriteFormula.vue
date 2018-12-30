<!--  -->
<template>
<div class="write-wrapper">
    <div class="main-wrapper">
        <h3 class="title">注意：请在白色框内书写您的答案</h3>
        <div class="main-box">
            <div class="canvas-box">
                <canvas class="canvas" id="canvas" width="800" height="400"></canvas>
            </div>
        </div>
        <div class="btn-box">
            <button class="btn" @click="closeTap">关闭画板</button>
            <button class="btn" @click="resetAnswer">重置画板</button>
            <button class="btn" @click="submitAnswer">解析答案</button>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import base from '../router/http/base.js'
import API from '../router/http/api.js';
import store from '../store/store.js';
import share from '../router/http/share.js';
import Axios from 'axios';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:['msg'],
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
    },
    gsMsg(){
        console.log(this.msg)
        return this.msg;
    }
},
//监控data中的数据变化
watch: {
},
//方法集合
methods: {
    resetAnswer(){
        this.retArr = [],
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
		this.preDrawAry = [],
		this.nextDrawAry = [],
		this.middleAry = [this.middleAry[0]]
    },
    submitAnswer(){ //提交绘制的答案
        let self = this;
        Axios({
            method:'POST',
            baseURL:base.baseURL,
            url:API.allUrl.gsAnalysis+'?token='+store.state.token,
            data:JSON.parse(self.arrToStr(self.retArr)),
        }).then((res) => {
            // 写了公式返回上一步的页面  每个返回上一步的页面都有可能接受到数据
            if(res.data.success == 1 && res.data.code == 200){
                let obj = {
                    datas:res.data.obj,
                    isWrite:false,
                    gsMsg:self.gsMsg
                }
                self.asyncResult(obj);
                // this.$router.push({name:this.urlName,params:{datas:res.data.obj}})
            }
        })
    },
    asyncResult(res){
        this.$emit('onsub',res)
    },
    closeTap(){
        this.$emit('closeTap')
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
        document.getElementById('canvas').addEventListener('mousemove',this.onMouseMove,false);
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
    },
    arrToStr(t) {
		var e = "";
		e += "[";
		for (var r = 0,
		n = t.length; r < n; r++) if (t[r].length > 0) {
			e += "[";
			for (var i = 0,
			o = t[r].length; i < o; i++) t[r][i].length > 0 && (e += "[" + t[r][i][0] + "," + t[r][i][1] + "]", i < o - 1 && (e += ","));
			e += "]",
			r < n - 1 && (e += ",")
		}
		return e += "]"
	}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this;
    let params = {
        token:store.state.token
    }
    base.getUrl(API.allUrl.batch,params).then(res => {
        if(res.code == 200 && res.success ==  1) {
            let params1 = {
                token:store.state.token,
                userType:store.state.userType*1,
                batch:res.obj
            }
        }
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
	this.context.lineWidth=1;	
    this.context.strokeStyle="#000000";
    this.initDraw();
    if(this.IsPC()){
        document.getElementById('canvas').addEventListener('mousedown',this.onMouseStart,false);
		
		document.getElementById('canvas').addEventListener('mouseup',this.onMouseEnd,false);
    }else{
        document.getElementById('canvas').addEventListener('touchstart',this.onTouchStart,false);
		document.getElementById('canvas').addEventListener('touchmove',this.onTouchMove,false);
		document.getElementById('canvas').addEventListener('touchend',this.onTouchEnd,false);
    }
}
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@fcolor:#5c5a5a;
.write-wrapper{
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top:0;
    z-index: 888;
    background-color:rgba(0,0,0,0.7);
    .main-wrapper{
        width: 100%;
        margin: 8% auto 70*0.4*0.02rem;
        .title{
            height: 106*0.4*0.02rem;
            line-height: 106*0.4*0.02rem;
            text-align: center;
            font-size:40*0.4*0.02rem;
            color: red;
            font-weight: bold;
        }
        .canvas-box{
            width: 800px;
            min-width: 400px;
            margin: 0 auto;
            background-color: #ffffff;
            .canvas{
                width: 800px;
                height: 400px;
            }
        }
    }
    .btn-box{
        width: 100%;
        margin: 0.6rem auto 0;
        text-align: center;
        .btn{
            display: inline-block;
            width: 320*0.4*0.02rem;
            height: 90*0.4*0.02rem;
            margin: 0 50*0.4*0.02rem;
            line-height: 90*0.4*0.02rem;
            background-color: #6c63ff;
            color: #ffffff;
            font-size: 0.36rem;
            border-radius: 90*0.4*0.02rem;
            border: none;
            outline: none;
        }
    }
}
</style>