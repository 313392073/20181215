<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">线线关系</div>
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
                            <input v-if="item.if_handle == -1" type="text" class="answer-input" :maxlength="JSON.parse(item.course_item).c?'1':20" @keyup="getValue($event,index,rindex,JSON.parse(item.answer).q[rindex],item.item_score,item.course_id,'q')"/>
                            <input v-else type="text" class="answer-input" @blur="alreadySubmit" readonly :value="JSON.parse(item.answer).q[rindex]">
                        </span>
                        <!-- bmj -->
                        <p class="bmj" v-if="JSON.parse(item.course_item).bmj" v-for="(breq,bindex) in JSON.parse(item.course_item).bmj" :key="bindex+50">
                            {{breq}}
                            <input v-if="item.if_handle == -1" type="text" class="answer-input" :maxlength="JSON.parse(item.course_item).c?'1':20" @keyup="getValue($event,index,bindex,JSON.parse(item.answer).bmj[bindex],item.item_score,item.course_id,'bmj')"/>
                            <input v-else type="text" class="answer-input" @blur="alreadySubmit" readonly :value="JSON.parse(item.answer).bmj[bindex]">
                        </p>
                        <!-- 体积  -->
                        <p class="tj" v-if="JSON.parse(item.course_item).tj" v-for="(treq,tindex) in JSON.parse(item.course_item).tj" :key="tindex">
                            {{treq}}
                            <input v-if="item.if_handle == -1" type="text" class="answer-input" :maxlength="JSON.parse(item.course_item).c?'1':20"  @keyup="getValue($event,index,tindex,JSON.parse(item.answer).tj[tindex],item.item_score,item.course_id,'tj')"/>
                            <input v-else type="text" class="answer-input" @blur="alreadySubmit" readonly :value="JSON.parse(item.answer).tj[tindex]">
                        </p>

                        <!-- 公式  -->
                        <p class="gs" :class="getChangeClass" v-if="JSON.parse(item.course_item).gs" v-for="(greq,gindex) in JSON.parse(item.course_item).gs" :key="gindex+80">
                            <span v-html="greq"></span>
                            <input v-if="item.if_handle == -1" type="button" value="作答" :maxlength="JSON.parse(item.course_item).c?'1':20" @focus="showWriteFormula($event,index,gindex,JSON.parse(item.answer).gs[gindex],item.item_score,item.course_id)"/>
                            <input type="text" class="answer-input"  @keyup="getGsValue($event,index,gindex,JSON.parse(item.answer).gs[gindex],item.item_score,item.course_id)" :value="(list[index]['gs']['arr'][gindex]&&list[index]['gs']['arr'][gindex]['answer'])?list[index]['gs']['arr'][gindex]['answer']:''" />
                            <span v-show="list[index]['gs']['arr'][gindex] && list[index]['gs']['arr'][gindex]['answer']" >
                                您的答案：
                                <span :class="getChangeClass"  v-html="toAsync((list[index]['gs']['arr'][gindex] && list[index]['gs']['arr'][gindex]['answer'])?list[index]['gs']['arr'][gindex]['answer']:'')"></span>
                                <!-- <input :class="getChangeClass" type="text" readonly :value="toAsync((list[index]['gs']['arr'][gindex]&&list[index]['gs']['arr'][gindex]['answer'])?list[index]['gs']['arr'][gindex]['answer']:'')" /> -->
                            </span>
                            <input v-if="item.if_handle == 0" type="text" class="answer-input" @blur="alreadySubmit" readonly :value="JSON.parse(item.answer).gs[gindex]">
                        </p>
                    </div>
                    <div class="answer-box clearfix">
                        <div class="answerlist-box" style="width:60%;float:left">
                            <div class="answerlist" v-if="JSON.parse(item.course_item)" v-for="(answer,aindex) in JSON.parse(item.course_item).c" :key="aindex+100" ><span class="answer-num">{{order[aindex]}}</span> :{{answer}}</div>
                        </div>
                        <div class="pic" style="width:40%;float:right;text-align:right">
                            <img :src="item.course_pic_path?item.course_pic_path:''" alt="">
                        </div>
                    </div>
                </div>
                <!-- <p class="req-title">题目：请说明如图所示的三棱锥每条边线的关系</p> -->
                <p class="answer-desx">答案：{{answers}}</p>
                <div class="answer-box">
                    <input type="text" placeholder="请输入答案" class="anwer-detail" v-model="answers">
                </div>
                <div class="btn-box">
                    <a href="javascript:void(0)">提交答案</a>
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
var scene = ''
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {
    container: null,
    clock: null,
    camera: null,
    renderer: null,
    controls: null,
    labelRenderer: null,
    answers:'AAAAAAAAAA',
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
        this.$nextTick(() => {
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
        })
    },
},
//方法集合
methods: {
    init: function() {
        this.container = document.getElementById("container");
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); 
        scene.add(new THREE.AmbientLight(0x888888) );
        //scene.add( new THREE.DirectionalLight( 0xffffff ,1.5) );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth/4, window.innerHeight/4);
        this.container.appendChild( this.renderer.domElement );
        
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize( window.innerWidth/4, window.innerHeight/4 );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.zIndex = '0';
        this.labelRenderer.domElement.style.top = 0;
        this.container.appendChild( this.labelRenderer.domElement );

        this.Draw(10,'A','B','C','D','E','F','R','r','a');//棱长，前六个点标注，后三个线标注
        var textureLoader=new THREE.TextureLoader();  
        window.addEventListener( 'resize', this.onWindowResize, false );
 
    },
    Draw(a,h,i,j,k,l,m,R,r,t) {
				
            if(isStr(h) && isStr(i) && isStr(j) && isStr(k) && isStr(l) && isStr(m) && isStr(R) && isStr(r) && isStr(t) && isNaN(a)==!true){}else return;
        
            var center = new THREE.Vector3(0,(a*Math.sqrt(6))/6,-(a*Math.sqrt(3))/6);
            var posZ = -(a/2)*Math.sqrt(3);
            
            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.0001, 9999999 );
            this.camera.position.set(a,a,-a-a/2);
            
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

            this.controls = new OrbitControls( this.camera );
            this.controls.target.set(center.x,center.y,center.z);
            this.controls.enablePan = !true;
            this.clock = new THREE.Clock();
            let self = this;
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
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

        },
        animate: function() {
            requestAnimationFrame( this.animate );
            this.render();
        },
        render() {
            this.controls.update( this.clock.getDelta() );
            this.renderer.render( scene, this.camera );
            this.labelRenderer.render( scene, this.camera );
        },
        toAsync(str){
        return '$'+str+'$';
    },
    closePtap(){
        this.isWrite = false;
    },
    childsub(e){ //写了公式传递回来的数据
        let self = this;
        self.gsMsg = e.gsMsg;
        self.gsMsg.rightAnswer = e.datas.data
        self.isWrite = e.isRight;
        /**答案开始 */
        let rAnswer = self.gsMsg.rightAnswer;
        let rScore = self.gsMsg.rightScore;
        let nowValue = self.gsMsg.rightAnswer;
        let obj = {
            answer:nowValue,
            isRight:self.gsMsg.rightScore == nowValue?true:false,
            score:self.gsMsg.answer == nowValue?self.gsMsg.rightScore:0,
            courseItemId : self.gsMsg.courseItemId
        }
        let num = self.gsMsg.rindex;
        self.list[self.gsMsg.index].gs.arr[num] = obj;
        this.$nextTick(() => {
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
        })
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
    showWriteFormula(e,index,nowIndex,rightAnswer,rightScore,courseItemId,type){ //打开手写板  写公式
        this.gsMsg.index = index;
        this.gsMsg.rindex = nowIndex;
        this.gsMsg.answer = rightAnswer;
        this.gsMsg.score = rightScore;
        this.gsMsg.courseItemId = courseItemId;
        this.gsMsg.type = 'gs';
        this.isWrite = true;
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
    getGsValue(e,index,nowIndex,rightAnswer,rightScore,courseItemId,type){
        let self = this;
        let rAnswer = rightAnswer;
        let rScore = rightScore;
        let nowValue = e.currentTarget.value;
        let obj = {
            answer:nowValue,
            isRight:rightAnswer == nowValue?true:false,
            score:rightAnswer == nowValue?rightScore:0,
            courseItemId : courseItemId
        }
        this.$set(self.list[index].gs.arr[nowIndex],'answer',nowValue)
        console.log(self.list[index].gs.arr[nowIndex]['answer'])
        this.$nextTick(() => {
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
        })
    },
    getMenu(params) { //获取menu
        base.getUrl(API.allUrl.course_m_info,params).then(res => {
            console.log(res)
        })
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
    subForm(){ //提交数据
        // this.list //所有的答案和得分情况
        let arr = []
        Object.keys(this.list).forEach((item,index) => {
            var obj = {};
            obj.answer = '';
            let type = item['type'];
            let answers = {};
            answers['q'] = [];
            answers['tj'] = [];
            answers['bmj'] = [];
            answers['gs'] = [];
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
            if(this.list[item].bmj.arr.length>0){
                this.list[item].bmj.arr.forEach((subitem,subindex) => {
                    answers['bmj'].push(subitem.answer);
                    answerscore += subitem.score;
                    obj.courseItemId = subitem.courseItemId;
                })
                obj.answer=JSON.stringify(answers)
                obj.score = JSON.stringify(answerscore);
                obj.useTime = 0;
                JSON.stringify(obj)
            }
            if(this.list[item].tj.arr.length>0){
                this.list[item].tj.arr.forEach((subitem,subindex) => {
                    answers['tj'].push(subitem.answer);
                    answerscore += subitem.score;
                    obj.courseItemId = subitem.courseItemId;
                })
                obj.answer=JSON.stringify(answers)
                obj.score = JSON.stringify(answerscore);
                obj.useTime = 0;
                JSON.stringify(obj)
            }
            if(this.list[item].gs.arr.length>0){
                this.list[item].gs.arr.forEach((subitem,subindex) => {
                    answers['gs'].push(subitem.answer);
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
    base.getUrl(API.allUrl.batch,params).then(res => {
        if(res.code == 200 && res.success == 1){
            this.classBatch = res.obj;
            let params1 = {
                token:store.state.token,
                batch:res.obj
            }
            let params2 = {
                token:store.state.token,
                batch:res.obj,
                type:5*1
            }
            Axios.all([self.getMenu(params1)],self.getCourseList(params2))
        }
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(() => {
        this.init();
        this.animate()
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
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
            }
        }
        .desc-box{
            width: 50%;
            float: left;
            position: relative;
            z-index: 2;
            .req-title,.answer-desx{
                font-size: 40*0.4*0.02rem;
                color: #676767;
                line-height: 110*0.4*0.02rem;
                min-height: 110*0.4*0.02rem;
            }

            .answer-box{
                width: 80%;
                margin: 25*0.4*0.02rem auto;
                min-height: 500*0.4*0.02rem;
                box-shadow: 0 0 3px 3px rgba(0,0,0,0.1);
                position: relative;
                .anwer-detail{
                    width: 90%;
                    position: absolute;
                    bottom: 20%;
                    left: 5%;
                    border: none;
                    border-bottom: 1px solid #a4a4a4;
                    font-size: 40*0.4*0.02rem;
                    color: #676767;
                    text-align: center;
                    line-height: 80*0.4*0.02rem;
                }
            }
            .btn-box{
                text-align: center;
                margin: 80*0.4*0.02rem auto;
                width: 100%;
                text-align: center;
                a{
                    display: block;
                    width: 330*0.4*0.02rem;
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
}

</style>