<template>
<div class="wrapper">
<div class="left-wrapper">
 <div class="left-box">
    <div class="desc-menu">寻找棱锥</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">侧面积公式</h3>
        <div class="list-box">
              <div class="list" v-for="(item,index) in questList" :key="index">
                <div class="list-req">
                    <span>题目{{index+1}}</span>：
                    <!-- 有info -->
                    <p v-if="JSON.parse(item.course_item).info">{{JSON.parse(item.course_item).info}}</p>
                     <!-- 题目 -->
                    <span v-if="JSON.parse(item.course_item).q" v-for="(req,rindex) in JSON.parse(item.course_item).q" :key="rindex">{{req}}
                        <input type="text" class="answer-input" :maxlength="JSON.parse(item.course_item).c?'1':20" @keyup="getValue($event,index,rindex,JSON.parse(item.answer).a[rindex],item.item_score,item.course_id)"/>; 
                    </span>
                    <!-- bmj -->
                    <p v-if="JSON.parse(item.course_item).bmj" v-for="(breq,bindex) in JSON.parse(item.course_item).bmj" :key="bindex">
                        {{JSON.parse(item.course_item).bmj}}
                        <input type="text" class="answer-input" :maxlength="JSON.parse(item.course_item).c?'1':20" @focus="goWriteFormula" @keyup="getValue($event,index,rindex,JSON.parse(item.answer).a[rindex],item.item_score,item.course_id)"/>; 
                    </p>
                    <!-- 体积  -->
                    <p v-if="JSON.parse(item.course_item).tj" v-for="(treq,tindex) in JSON.parse(item.course_item).tj" :key="tindex">
                        {{treq}}
                        <input type="text" class="answer-input" :maxlength="JSON.parse(item.course_item).c?'1':20" @focus="goWriteFormula"  @keyup="getValue($event,index,rindex,JSON.parse(item.answer).a[rindex],item.item_score,item.course_id)"/>; 
                    </p>

                     <!-- 公式  -->
                    <p v-if="JSON.parse(item.course_item).gs" v-for="(greq,gindex) in JSON.parse(item.course_item).gs" :class="getChangeClass" :key="gindex" v-html="greq">  
                        <input type="text" class="answer-input" :maxlength="JSON.parse(item.course_item).c?'1':20" @focus="goWriteFormula"  @keyup="getValue($event,index,rindex,JSON.parse(item.answer).a[rindex],item.item_score,item.course_id)"/>; 
                    </p>
                </div>
                <div class="answer-box clearfix">
                    <div class="answerlist-box" style="width:60%;float:left">
                        <div class="answerlist" v-if="JSON.parse(item.course_item)" v-for="(answer,aindex) in JSON.parse(item.course_item).c" :key="aindex" ><span class="answer-num">{{order[aindex]}}</span> :{{answer}}</div>
                    </div>
                    <div class="pic" style="width:40%;float:right;text-align:right">
                        <img :src="item.course_pic_path?item.course_pic_path:''" alt="">
                    </div>
                </div>
            </div>
          <p class="list-req answerd-req"><span>答案：</span></p>
          <div class="answerd clearfix">
              <div class="item">
                  <p class="order"><span>01</span></p>
                  <div class="answerd-box clearfix">
                      <label class="choose">
                          <input type="radio" name="req1" value="A" checked>
                          <span></span>A
                        </label>
                        <label class="choose">
                          <input type="radio" name="req1" value="B">
                          <span></span>B
                        </label>
                        <label class="choose">
                          <input type="radio" name="req1" value="C">
                          <span></span>C
                        </label>
                        <label class="choose">
                          <input type="radio" name="req1" value="D">
                          <span></span>D
                        </label>
                  </div>
              </div>
              <div class="item">
                  <p class="order"><span>02</span></p>
                  <div class="answerd-box">
                      <input type="text" name="req2" placeholder="请输入答案" class="req2">
                  </div>
              </div>
          </div>
          <div class="ansowerd-btn"><button class="btn" @click="subForm">提交答案</button></div>
        </div>
    </div>
    <div class="tips" v-show="toggleTips">
        <div class="main-tips" style="display: none">
          <img class="tip-img" src="/images/default.png" alt="">
          <p class="tips-title">本轮结束</p>
          <div class="tips-msg">
              {{tipsMsg}}
          </div>
          <div class="tips-btn"><button class="tbtn gbtn" @click="HideTip">继续答题</button></div>
        </div>
        <div class="main-tips">
          <img class="tip-img" src="/images/default.png" alt="">
          <p class="tips-title">答题结束</p>
          <div class="tips-msg">
              {{tipsMsg}}
              <!-- <p>恭喜你，已答完所有题目！</p>
              <p>系统已自动帮你计算好分数，快快点击查看吧！</p> -->
          </div>
          <div class="tips-btn"><button class="cbtn tbtn" @click="HideTip">查看成绩</button></div>
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
import share from '../../router/http/share.js';
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
import * as types from '../../store/types.js';
import Axios from 'axios';
import fs from 'fs';

export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {
    toggleTips:false,
    tipsMsg:'我们根据你的作答情况，智能为你推送了以下联系，请继续答题以巩固所学知识',
    classBatch:'',
    order:share.order,
    questList:[],
    classNames:'gs-box'
};
},
//监听属性 类似于data概念
computed: {
    value1:function(){
        return this.value1.toUpperCase();
    },
    list:function() {
        var obj = {};
        this.questList.forEach((item,index) => {
            obj[index] = {};
            obj[index].arr = [];  //具体的答案和得分情况
        })
        return obj;
    },
    getChangeClass(){
        return this.classNames;
    }
},
//监控data中的数据变化
watch: {
    questList(){
         this.$nextTick(() => {
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
        })
    }
},
//方法集合
methods: {
    goWriteFormula(){
        this.$router.push('/stuwriteformula')
    },
    getValue(e,index,nowIndex,rightAnswer,rightScore,courseItemId){
        let rAnswer = rightAnswer;
        let rScore = rightScore;
        let nowValue = e.currentTarget.value;
        let obj = {
            answer:nowValue.toUpperCase(),
            isRight:rightAnswer == nowValue.toUpperCase()?true:false,
            score:rightAnswer == nowValue.toUpperCase()?rightScore:0,
            courseItemId : courseItemId
        }
        this.list[index].arr[nowIndex] = obj;
    },
    HideTip(){
        this.toggleTips = false
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
            let answers = {a:[]};
            let answerscore = 0;
            obj.isRight = 0;
            obj.classBatch = this.classBatch;
            this.list[item].arr.forEach((subitem,subindex) => {
                answers.a.push(subitem.answer);
                answerscore += subitem.score;
                obj.courseItemId = subitem.courseItemId;
            })
            obj.answer=JSON.stringify(answers)
            obj.score = JSON.stringify(answerscore);
            obj.useTime = 0;
            JSON.stringify(obj)
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
                type:7*1
            }
            Axios.all([self.getMenu(params1)],self.getCourseList(params2))
        }
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(() => {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
    })
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {
    // console.log(document.getElementsByClassName('gs-box'))
    // window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
@fcolor:#5c5a5a;
//@import url(); 引入公共css类
.left-box{
    width: 100%;
    height: 100%;
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
        .list{
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
            .answer-input{
                width: 80px;
                border:none;
                border-bottom: 1px solid @fcolor;
                text-align: center;
                font-size: 40*0.40*0.02rem;
                color: #333;
                background-color: transparent;
            }
        }
        .answerd-req{
            margin: 0.2rem 0;
            
        }
        .answerd{
            width: 100%;
            margin: 0 auto;
            .item{
                float: left;
                width: 47.8%;
                min-height: 0.21rem;
                margin-right: 4.4%;
                border-radius: 4px;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,.1);
                &:nth-child(2n){
                    margin-right: 0;
                }
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
                    .choose{
                        float: left;
                        width: 50%;
                        min-height: 15*0.02rem;
                        line-height: 15*0.02rem;
                        vertical-align: middle;
                        font-size: 16px;
                        cursor: pointer;
                        text-align: center;
                        margin-top: 0.2rem;
                        input[type="radio"] {
                            appearance: none;
                            -webkit-appearance: none;
                            outline: none;
                            display: none;
                        }
                        span{
                            border-radius: 50%;
                            margin-right: 0.2rem;
                            vertical-align: middle;
                        }
                        input[type="radio"]+span {
                            width: 0.3rem;
                            height: 0.3rem;
                            display: inline-block;
                            background-color: transparent;
                            border: 1px solid #dddddd;
                        }
    
                        input[type="radio"]:checked+span {
                            background-color: #6c63ff;
                            border: 1px solid #6c63ff;
                        }
    
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
        box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
        border-top: 2px solid #6c63ff;
        text-align: center;
        .tip-img{
            max-width: 2rem;
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