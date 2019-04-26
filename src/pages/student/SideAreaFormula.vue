<template>
<div class="wrapper">
    <div class="left-wrapper">
        <div class="left-box">
            <div class="desc-menu">正棱锥侧面积<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
            <!-- 主要内容 -->
            <div class="main-wrapper">
                <h3 class="title">侧面积公式</h3>
                <p class="answer-desc">注：请直接在答题框内答题或者修改答案</p>
                <div class="list-box">
                    <div class="list" v-for="(item,index) in questList" :key="index+10">
                        <div class="list-req">
                            <span>题目{{index+1}}</span>：
                            <!-- 有info -->
                            <p v-if="JSON.parse(item.course_item).info && JSON.parse(item.course_item).info.length>0" v-for="(info,infoindex) in JSON.parse(item.course_item).info" :key="infoindex+70">
                                {{info}}
                            </p>
                            <!-- 题目q -->
                            <span v-if="JSON.parse(item.course_item).q" v-for="(req,rindex) in JSON.parse(item.course_item).q" :key="rindex+30">{{req}}
                                <input v-if="item.if_handle == -1" type="text" class="answer-input"  :ref="index+'_q_'+rindex"/>
                                <input v-else type="text" class="answer-input" :ref="index+'_q_'+rindex" v-model="JSON.parse(item.handled_answer).q[rindex]">
                            </span>
                            <!-- bmj -->
                            <p class="bmj" v-if="JSON.parse(item.course_item).bmj" v-for="(breq,bindex) in JSON.parse(item.course_item).bmj" :key="bindex+50">
                                {{breq}}
                                <input v-if="item.if_handle == -1" type="text" class="answer-input" :ref="index+'_bmj_'+bindex"/>
                                <input v-else type="text" class="answer-input" v-model="JSON.parse(item.handled_answer).bmj[bindex]" :ref="index+'_bmj_'+bindex">
                            </p>
                            <!-- 体积  -->
                            <p class="tj" v-if="JSON.parse(item.course_item).tj" v-for="(treq,tindex) in JSON.parse(item.course_item).tj" :key="tindex">
                                {{treq}}
                                <input v-if="item.if_handle == -1" type="text" class="answer-input"  :ref="index+'_tj_'+tindex"/>
                                <input v-else type="text" class="answer-input" v-model="JSON.parse(item.handled_answer).tj[tindex]" :ref="index+'_tj_'+tindex">
                            </p>

                            <!-- 公式  -->
                            <div class="gs" :class="getChangeClass" v-if="JSON.parse(item.course_item).gs" v-for="(greq,gindex) in JSON.parse(item.course_item).gs" :key="gindex+80">
                                <span v-html="greq"></span>
                                <div class="answer-div" v-if="item.if_handle == -1">
                                    <input class="answer-btn" type="button" value="作答" @focus="showWriteFormula($event,index,gindex,JSON.parse(item.answer).gs[gindex],item.item_score,item.course_id)" />
                                    <textarea class="answer-boxed" v-show="list[index]['gs']['arr'][gindex] && list[index]['gs']['arr'][gindex]['answer']" cols="60" rows="1" :ref="index+'_gs_'+gindex" :value="(list[index]['gs']['arr'][gindex]&&list[index]['gs']['arr'][gindex]['answer'])?list[index]['gs']['arr'][gindex]['answer']:''"></textarea>
                                    <div class="answerd-wrapper">
                                        您的答案：
                                        <p v-show="list[index]['gs']['arr'][gindex] && list[index]['gs']['arr'][gindex]['answer']">
                                            <span :class="getChangeClass" v-html="toAsync((list[index]['gs']['arr'][gindex] && list[index]['gs']['arr'][gindex]['answer'])?list[index]['gs']['arr'][gindex]['answer']:'')"></span>
                                        </p>
                                        <input type="hidden" :value="test">
                                    </div>
                                </div>
                                <div class="answer-div" v-if="item.if_handle == 0">
                                    <input class="answer-btn" type="button" value="修改" @focus="showWriteFormula($event,index,gindex,JSON.parse(item.answer).gs[gindex],item.item_score,item.course_id)"/>
                                    <textarea class="answer-boxed" v-show="list[index]['gs']['arr'][gindex] && list[index]['gs']['arr'][gindex]['answer']" cols="60" rows="1" :ref="index+'_gs_'+gindex" :value="(list[index]['gs']['arr'][gindex]&&list[index]['gs']['arr'][gindex]['answer'])?list[index]['gs']['arr'][gindex]['answer']:''" ></textarea>
                                    <div class="answerd-wrapper">
                                        您的答案：
                                        <p>
                                            <span :class="getChangeClass" v-html="toAsync((list[index]['gs']['arr'][gindex] && list[index]['gs']['arr'][gindex]['answer'])?list[index]['gs']['arr'][gindex]['answer']:(item.handled_answer?JSON.parse(item.handled_answer).gs[gindex]:''))"></span>
                                        </p>
                                        <input type="hidden" :value="test">
                                    </div>
                                </div>
                            </div>

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
                    <div class="ansowerd-btn">
                        <button class="btn" v-if="isInArray" @click="subForm">提交答案</button>
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
                    </div>
                    <div class="tips-btn"><button class="cbtn tbtn" @click="lookReport">查看成绩</button></div>
                </div>
            </div>
        </div>
        <write-formula v-if="isWrite" @onsub="childsub($event)" :msg="gsMsg" @closeTap="closePtap"></write-formula>
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
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar,WriteFormula},
inject:['reload'],
data() {
//这里存放数据
return {
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
    list:{},
    test:'',
    isInArray:false
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
    toAsync(str){
        if(str){
            return '$'+str+'$';
        }else{
            return ''
        }
        
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
    lookReport(){
        this.toggleTips = false
        this.getrefresh()
    },
    HideTip(){
        this.tipsMsg = '';
        this.toggleTips = false
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
        self.$set(self.list[index].gs.arr[nowIndex],'answer',nowValue)
        self.test = nowValue
        this.$nextTick(() => {
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
        })
    },
    getCourseList(params){ //获取题型
        base.getUrl(API.allUrl.course_list,params).then(res => {
            if(res.code == 200 && res.success == 1){
                res.obj.forEach((item,index) => {
                  this.questList.push(item)
                })
                this.$nextTick(() => {
                    window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
                })
            }else{
                self.tipsMsg = '网络错误，请稍后再试'
                self.toggleTips = true;
                return false;
            }
        })
    },
     getAllkey(drr){
        let arr = [];
        for(var i=0;i<drr.length;i++){
            let str = drr[i]['key'].split("_")[0]
            arr.push(str)
        }
        let brr = share.uniqArr(arr);
        let obj = {};
        brr.forEach((item,index)  => {
            obj[item] = {}
             obj[item]['gs'] = []
             obj[item]['bmj'] = []
             obj[item]['tj'] = []
             obj[item]['q'] = []
        })
        return obj;
    },
    subForm(){ //提交数据
        var dataArr = this.$refs;
        var drr = [];
        for(var attr in dataArr) {
            let obj = {
                key:attr,
                value:dataArr[attr]
            }
            drr.push(obj)
        }
        let keyObj = this.getAllkey(drr)
        drr.forEach((item,index) => {
            let num = item['key'].split("_")[0];  //第几题
            let type = item['key'].split("_")[1] //题型
            if(type == 'q') {
                keyObj[num][type].push(item['value'][0].value.toUpperCase())
            }else{
                keyObj[num][type].push(item['value'][0].value)
            }
        })
        let arr = []
        this.questList.forEach((item,index) => {
            let obj = {};
            obj.useTime = 0;
            let answers = {};
            answers['gs'] = [];
            answers['bmj'] = [];
            answers['tj'] = [];
            answers['q'] = [];
            answers['gs'] = keyObj[index]['gs']
            answers['bmj'] =  keyObj[index]['bmj']
            answers['tj'] =  keyObj[index]['tj']
            answers['q'] =  keyObj[index]['q']
            obj['answer'] = JSON.stringify(answers);
            let answerscore = 0;
            obj.isRight = -1;
            obj.score = 0;
            obj.classBatch = this.classBatch;
            arr.push(obj);
        })
        for(var i=0;i<this.questList.length;++i){
            let user_loginname = this.questList[i]['user_loginname']
            arr[i]['userLoginname'] = JSON.parse(store.state.user).userLoginname;
            arr[i]['courseItemId'] = this.questList[i]['course_item_id'];
            if(this.questList[i].answer == arr[i].answer){
                arr[i].isRight = 0;
                arr[i].score = this.questList[i]['item_score']?this.questList[i]['item_score']:0
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
            if(res.data.code = 200 && res.data.success == 1){
                this.toggleTips = true;
                this.tipsMsg = '本轮结束';
            }
        })
    },
    getrefresh(){
        this.reload()
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    if (share.isMathjaxConfig === false) { // 如果：没有配置MathJax
        share.initMathjaxConfig();
    }
    let self = this;
    self.classBatch = store.state.batch
    let params = {
        token:store.state.token
    }
    
    if(store.state.batch) {
        let params2 = {
                token:store.state.token,
                batch:store.state.batch,
                type:2*1
            }
            self.getCourseList(params2)
    }else{
        base.getUrl(API.allUrl.batch,params).then(res => {
            if(res.code == 200 && res.success == 1){
                this.classBatch = res.obj;
                let params2 = {
                    token:store.state.token,
                    batch:res.obj,
                    type:2*1
                }
                self.getCourseList(params2)
            }
        })
    }
    let num = 5
    base.getMenuStep().then((res) => {
        self.isInArray = base.arrContain(res,num)
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(() => {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
    })
}
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
    .answer-desc{
        color: #f32d2d;
        font-size: 30*0.4*0.02rem;
        text-align: center;
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
                outline: none;
                &:focus{
                    border-bottom: 1px solid #6c63ff;
                }
            }
        }
        .answerd-req{
            margin: 0.2rem 0;
        }
        .gs{
            position: relative;
            .answer-div{
                margin: 10px auto;
                .answer-btn{
                    border:2px solid #6c63ff;
                    border-radius: 4px;
                    background-color: #6c63ff;
                    color: #ffffff;
                }
                .answer-boxed{
                    border: 1px solid #dddddd;
                    border-radius: 4px;
                    &:focus{
                        border: 1px solid #6c63ff;
                    }
                }
            }
            .answerd-wrapper{
                min-height: 80px;
                &>p{
                    min-height: 50px;
                }
            }
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
    &.active{
        z-index: 999;
        opacity: 1;
    }
}
</style>