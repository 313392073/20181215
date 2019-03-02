<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">线线关系<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">探索正三棱锥</h3>
        <div class="main-box clearfix">
            <div class="pic-box" id="pic-box">
                <div class="container" id="container"></div>
            </div>
            <div class="desc-box clearfix">
                <div class="req-title" v-for="(item,index) in questList" :key="index+10">
                    <div class="list-req">
                        <span>题目{{index+1}}</span>：
                        <!-- 有info -->
                        <p v-if="JSON.parse(item.course_item).info && JSON.parse(item.course_item).info.length>0" v-for="(info,infoindex) in JSON.parse(item.course_item).info" :key="infoindex+70">
                            {{info}}
                        </p>
                        <!-- 题目q -->
                       <span v-if="JSON.parse(item.course_item).q" v-for="(req,rindex) in JSON.parse(item.course_item).q" :key="rindex+30">{{req}}
                            <input v-if="item.if_handle == -1" type="text" class="answer-input"  @keyup="getValue($event,index,rindex,JSON.parse(item.answer).q[rindex],item.item_score,item.course_id,'q')"/>
                            <input v-else type="text" class="answer-input"  @keyup="getValue($event,index,rindex,JSON.parse(item.answer).q[rindex],item.item_score,item.course_id,'q')" :value="item.handled_answer?JSON.parse(item.handled_answer).q[rindex]:''">
                        </span>
                    </div>
                </div>
                <div class="btn-box">
                    <button v-if="tag" class="btn" @click="showTips">提交答案0</button>
                    <button v-else class="btn" @click="subForm">提交答案</button>
                </div>
            </div>
        </div>
    </div>
    <div class="tips" v-show="toggleTips">
        <div class="main-tips">
            <i class="iconfont icon-guanbi1" @click="HideTip"></i> 
            <img class="tip-img" src="../../assets/images/teaupload.png" alt="send-success">
            <p class="tips-title">答题结束</p>
            <div class="tips-msg">
                {{tipsMsg}}
                <!-- <p>恭喜你，已答完所有题目！</p>
                <p>系统已自动帮你计算好分数，快快点击查看吧！</p> -->
            </div>
            <div class="tips-btn"><button class="cbtn tbtn" @click="lookReport">查看成绩</button></div>
        </div>
    </div>
    <write-formula v-if="isWrite" @onsub="childsub($event)" :msg="gsMsg" @closeTap="closePtap"></write-formula>
  </div>
  </div>
<side-bar></side-bar>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import SideBar from "@/common/SideBar";
import WriteFormula from "@/common/WriteFormula";
import share from '../../router/http/share.js';
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
import Axios from 'axios';

import * as THREE from 'three'
import { OrbitControls } from '../../assets/js/OrbitControls.js'
import { CSS2DObject,CSS2DRenderer } from '../../assets/js/CSS2DRenderer.js'
import { WEBGL } from '../../assets/js/WebGL.js'
var container = '', clock = '', camera = '', scene = '', renderer = '', controls = '', labelRenderer = '';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
inject:['reload'],
data() {
//这里存放数据
return {
    tag:false,
    isWrite:false,
    toggleTips:false,
    tipsMsg:'我们根据你的作答情况，智能为你推送了以下联系，请继续答题以巩固所学知识',
    classBatch:'',
    order:share.order,
    questList:[],
    classNames:'gs-box',
    gsMsg:{
        rightAnswer:'',
        index:'',
        rindex:'',
        answer:'',
        score:'',
        courseItemId:'',
        type:''
    },
    list:{}
};
},
//监听属性 类似于data概念
computed: {
    value1(){
        return this.value1.toUpperCase();
    },
    getChangeClass(){
        return this.classNames;
    }
},
//监控data中的数据变化
watch: {
    questList(){
        var obj = {};
        this.questList.forEach((item,index) => {
            obj[index] = {
                q:{},
                bmj:{},
                tj:{},
                gs:{},
            };
            obj[index]['q'].arr = [];  //具体的答案和得分情况
            obj[index]['bmj'].arr = [];  //具体的答案和得分情况
            obj[index]['tj'].arr = [];  //具体的答案和得分情况
            obj[index]['gs'].arr = [];  //具体的答案和得分情况
        })
        this.list = obj;
    },
},
//方法集合
methods: {
    getrefresh(){
        this.reload();
    },
    init() {			
        container = document.getElementById("container");

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); 
        scene.add( new THREE.AmbientLight(0x888888) );
        //scene.add( new THREE.DirectionalLight( 0xffffff ,1.5) );
        
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( container.clientWidth, container.clientHeight );
        container.appendChild( renderer.domElement );
        
        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize( container.clientWidth, container.clientHeight );
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = 0;
        container.appendChild( labelRenderer.domElement );

        this.Draw(10,'A','B','C','D','E','F','R','r','a');//棱长，前六个点标注，后三个线标注
        
        //var textureLoader=new THREE.TextureLoader();  
        
        // var axesHelper = new THREE.AxesHelper( 10 );
        // scene.add( axesHelper );

        window.addEventListener( 'resize', this.onWindowResize, false );

    },
    Draw (a,h,i,j,k,l,m,R,r,t) {
				if(isStr(h) && isStr(i) && isStr(j) && isStr(k) && isStr(l) && isStr(m) && isStr(R) && isStr(r) && isStr(t) && isNaN(a)==!true){}else return;
			
				var center = new THREE.Vector3(0,(a*Math.sqrt(6))/6,-(a*Math.sqrt(3))/6);
				var posZ = -(a/2)*Math.sqrt(3);
				
				camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 9999999 );     
				camera.position.set(a,a,-a-a/2);
				
				var geom = new THREE.Geometry();
				
				var vertices = [
					
					new THREE.Vector3( a/2, 0, 0), 
					new THREE.Vector3(-a/2, 0, 0), 
					new THREE.Vector3(0, 0, posZ),
					new THREE.Vector3(0, center.y*2, center.z)
					
				];
				
				geom.vertices = vertices;
				
				var faces = [
				
					new THREE.Face3(0,1,2),
					new THREE.Face3(0,3,1),
					new THREE.Face3(0,2,3),
					new THREE.Face3(2,1,3)
					
				];

				geom.faces = faces;
				
				geom.computeFaceNormals();
				
				var mat = new THREE.MeshLambertMaterial({
				
					color: 0x000000,
					side: THREE.DoubleSide,
					wireframe: true
					
				});
				
				var mesh = new THREE.Mesh(geom, mat);
				
				scene.add(mesh);
				
				lineText(mesh,0,center.y,center.z*2,t);
				
				var sphereMaterial = new THREE.MeshLambertMaterial({
					
					side: THREE.DoubleSide,
					transparent: true,
					opacity: 0.05,
					wireframe: true
					
				});
				
				var inSphere = new THREE.Mesh(new THREE.SphereBufferGeometry(center.y/2,50,50),sphereMaterial);
				inSphere.position.set(0,center.y/2,center.z);
				scene.add(inSphere);
				
				var outSphere = new THREE.Mesh(new THREE.SphereBufferGeometry(center.y*3/2,50,50),sphereMaterial);
				outSphere.position.set(0,center.y/2,center.z);
				scene.add(outSphere);
				
				var geom2 = new THREE.Geometry();
				
				var vertices2 = [
				
					new THREE.Vector3(0, 0, 0),
					new THREE.Vector3(0, 0, center.z),
					new THREE.Vector3(0, center.y*2, center.z)
					
				];
				
				geom2.vertices = vertices2;
				
				var faces2 = [
				
					new THREE.Face3(0,1,2),
					
				];

				geom2.faces = faces2;
				
				geom2.computeFaceNormals();
				
				var mat2 = new THREE.MeshLambertMaterial({
				
					color: 0xffff00,
					side: THREE.DoubleSide,
					transparent: true,
					opacity: 0.5,
					
				});
				
				var mesh2 = new THREE.Mesh(geom2, mat2);
				
				lineText(mesh2,0,center.y/4,center.z,r);
				
				var mesh3 = new THREE.Mesh(geom2, mat);
				
				lineText(mesh3,0,center.y,center.z,R);
				
				scene.add(mesh2);
				scene.add(mesh3);
				
				point(a/2, 0, 0, h, !true);
				point(-a/2, 0, 0, i, !true);
				point(0, 0, posZ, j, !true);
				point(0, center.y*2, center.z, k, true);
				
				point(0, 0, 0, l,!true);
				point(0, 0, center.z, m,!true);
				point(0, center.y/2, center.z);

				controls = new OrbitControls( camera, container );
				controls.target.set(center.x,center.y,center.z);
				controls.enablePan = !true;
				clock = new THREE.Clock();
				
				function point (x,y,z,str,istop) {
					var mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(a/100,a,a),new THREE.MeshBasicMaterial({color: 0xff0000}));
					mesh.position.set(x,y,z);
					scene.add(mesh);
					
					if(str){
						
						var pointDiv = document.createElement( 'div' );
						pointDiv.className = 'label';
						pointDiv.textContent = str;
						
						if (istop) {
							
							pointDiv.style.marginTop = '-1em';
						
						} else {
							
							pointDiv.style.marginTop = '1.5em';
							
						}
						
						var pointLabel = new CSS2DObject( pointDiv );
						pointLabel.position.set( 0, a/100, 0 );
						mesh.add( pointLabel );
						
					}
					
				}
				
				function lineText(obj,x,y,z,str){
					
					var lineDiv = document.createElement( 'div' );
					lineDiv.className = 'label';
					lineDiv.textContent = str;
					var lineLabel = new CSS2DObject( lineDiv );
					lineLabel.position.set( x, y, z );
					obj.add( lineLabel );
					
				}
				
				function isStr(value){
			
					if(typeof value=='string'&&value.constructor==String) return true;
					else return false;
					
				}
				
			},
        onWindowResize() {
            renderer.setSize( container.clientWidth, container.clientHeight);
            labelRenderer.setSize( container.clientWidth, container.clientHeight );

            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();

        },
        animate: function() {
            requestAnimationFrame( this.animate );
            this.render();
        },
        render() {
            controls.update( clock.getDelta() );
            renderer.render( scene, camera );
            labelRenderer.render( scene, camera );  
        },
        toAsync(str){
        return '$'+str+'$';
    },
    closePtap(){
        this.isWrite = false;
    },
    HideTip(){
        this.toggleTips = false
        this.$router.push('/stutestreport')
    },
    alreadySubmit(){
        this.tipsMsg = '此题目已经做过了';
        this.toggleTips = true
    },
    showTips(){
        this.tipsMsg = '答题结束，不可重复提交答案';
        this.toggleTips = true
    },
    getValue(e,index,nowIndex,rightAnswer,rightScore,courseItemId,type){ //边写答案边存数据
        let rAnswer = rightAnswer;
        let rScore = rightScore;
        let nowValue = e.currentTarget.value;
        let obj = {
            answer:nowValue.toUpperCase(),
            isRight:rightAnswer == nowValue.toUpperCase()?true:false,
            score:rightAnswer == nowValue.toUpperCase()?rightScore:0,
            courseItemId : courseItemId
        }
        switch(type) {
            case 'q':
                this.list[index].q.arr[nowIndex] = obj;
                break;
             case 'bmj':
                this.list[index].bmj.arr[nowIndex] = obj;
                break;
            case 'tj':
                this.list[index].tj.arr[nowIndex] = obj;
                break;
            case 'gs':
                this.list[index].gs.arr[nowIndex] = obj;
                break;
            default:
                return;
        }
    },
    getCourseList(params){ //获取题型
        base.getUrl(API.allUrl.course_list,params).then(res => {
            console.log(res)
            if(res.code == 200 && res.success == 1){
                res.obj.forEach((item,index) => {
                  this.questList.push(item)
                })
            }else{
                self.tipsMsg = '网络错误，请稍后再试'
                self.toggleTips = true;
                return false;
            }
        })
    },
    lookReport(){
        this.toggleTips = false
        this.$router.push('/stutestreport')
    },
    subForm(){ //提交数据
        // this.list //所有的答案和得分情况
        let arr = []
        Object.keys(this.list).forEach((item,index) => {
            var obj = {};
            obj.answer = '';
            let type = item['type'];
            let answers = {};
            answers['q'] = [];
            let answerscore = 0;
            obj.isRight = 0;
            obj.classBatch = this.classBatch;
            if(this.list[item].q.arr.length>0){
                this.list[item].q.arr.forEach((subitem,subindex) => {
                    answers['q'].push(subitem.answer);
                    answerscore += subitem.score;
                    obj.courseItemId = subitem.courseItemId;
                })
                obj.answer=JSON.stringify(answers)
                obj.score = JSON.stringify(answerscore);
                obj.useTime = 0;
                JSON.stringify(obj)
            }
            
            arr.push(obj)
        })
        for(var i=0;i<this.questList.length;++i){
            let user_loginname = this.questList[i]['user_loginname']
            arr[i]['userLoginname'] = JSON.parse(store.state.user).userLoginname;
            arr[i]['courseItemId'] = this.questList[i]['course_item_id'];
            if(this.questList[i].answer == arr[i].answer){
                arr[i].isRight = 1;
            }
        }
        Axios({
            method:'post',
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            baseURL:base.baseURL,
            url:API.allUrl.courseSubmit+'?token='+store.state.token+'&batch='+this.classBatch,
            data:JSON.stringify(arr),
        }).then((res) => {
             console.log(res)
            if(res.data.code = 200 && res.data.success == 1){
                this.toggleTips = true;
                this.tipsMsg = '本轮结束';
                this.tag = true;
            }
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    if (share.isMathjaxConfig === false) { // 如果：没有配置MathJax
        share.initMathjaxConfig();
    }
    let self = this;
    let params = {
        token:store.state.token
    }
    if(store.state.batch) {
        let params2 = {
                token:store.state.token,
                batch:store.state.batch,
                type:5*1
            }
            self.getCourseList(params2)
    }else{
        base.getUrl(API.allUrl.batch,params).then(res => {
            if(res.code == 200 && res.success == 1){
                this.classBatch = res.obj;
                let params2 = {
                    token:store.state.token,
                    batch:res.obj,
                    type:5*1
                }
                self.getCourseList(params2)
            }
        })
    }
    
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(() => {
        this.init();
        this.animate()
    })
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
        text-indent: 120px;
    }
    .main-box{
        width: 87.55%;
        margin: 0 auto 70*0.4*0.02rem;
        .pic-box{
            width: 50%;
            float: left;
            min-height: 995*0.4*0.02rem;
            border-radius: 4*0.4*0.02rem;
            position: relative;
            .container{
                width: 100%;
                height: 100%;
                min-height: 800*0.4*0.02rem;
                margin-top: -20%;
                position: relative;
                z-index: 0;
            }
        }
        .desc-box{
            width: 50%;
            float: left;
            .req-title{
                font-size: 40*0.4*0.02rem;
                color: #676767;
                line-height: 110*0.4*0.02rem;
                min-height: 110*0.4*0.02rem;
            }
             .answer-input{
                width: 80px;
                border:none;
                border-bottom: 1px solid @fcolor;
                text-align: center;
                font-size: 40*0.40*0.02rem;
                color: #333;
                background-color: transparent;
                &:focus{
                    border-bottom: 1px solid #6c63ff;
                }
            }
            .answer-box{
                .answerlist{
                    text-indent: 0.8rem;
                    line-height: 0.8rem;
                    .answer-num{
                        text-indent: 0;
                        display: inline-block;
                        width: 40*0.4*0.02rem;
                        height: 40*0.4*0.02rem;
                        line-height: 40*0.4*0.02rem;
                        border-radius: 50%;
                        text-align: center;
                        font-size: 12px!important;
                        border: 1px solid #6c63ff;
                        &.active{
                            color: #ffffff;
                            background-color: #6c63ff;
                        }
                    }
                }
            }
            .btn-box{
                text-align: center;
                margin: 80*0.4*0.02rem auto;
                width: 100%;
                text-align: center;
                button{
                    display: inline-block;
                    width: 330*0.4*0.02rem;
                    height: 104*0.4*0.02rem;
                    line-height: 104*0.4*0.02rem;
                    background-color: #6c63ff;
                    color: #ffffff;
                    font-size: 35*0.4*0.02rem;
                    text-align: center;
                    border: none;
                    outline: none;
                    margin: auto;
                    border-radius: 104*0.4*0.02rem;
                }
            }
        }
    }
}

.tips{
    position: absolute;
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
        background: url("../../assets/images/send-tipbg.jpg") no-repeat center;
        background-size: contain;
        box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
        text-align: center;
        padding-top: 20*0.4*0.02rem;
        position: relative;
        &>i{
            position: absolute;
            width: 80*0.4*0.02rem;
            height: 80*0.4*0.02rem;
            top: 60*0.4*0.02rem;
            right: 60*0.4*0.02rem;
            font-size: 0.4rem;
            color: #8e8e8e;
            border-radius: 50%;
            box-shadow: 0 0 2px 2px rgba(0, 0, 0,0.2);
            padding: 3px;
            cursor: pointer;
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
}
</style>