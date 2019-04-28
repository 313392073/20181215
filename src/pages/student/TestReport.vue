<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
 <div class="left-box">
    <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>在线测试<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">在线测试成绩报告单</h3>
        <div class="main-box">
            <div class="situation-box">
                <p class="main-title">成绩概况:</p>
                <div class="situation-detail clearfix">
                    <div class="item">分数: <span class="score">{{resSituation.score}}分</span></div>
                    <div class="item">班级排名: <span class="order">{{resSituation.rank}}</span></div>
                    <div class="item">正确率: <span class="rights">{{resSituation.rightPercent?(resSituation.rightPercent.toFixed(2)*100):0}}%</span></div>
                    <div class="item">用时: <span class="time">{{getMinute(resSituation.useTime)}}</span></div>
                </div>
            </div>

            <div class="detail-box clearfix">
                <div class="detail-left">
                    <p class="main-title">得分详情:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>你的答案</th>
                                <!-- <th>正确答案</th> -->
                                <th>得分</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in scoreDetail" :key="index" :class="index>4?trHide:''">
                                <td class="td-left" v-if="item.my_answer">
                                    <i>{{index+1}}</i>
                                    <span v-for="(subItem,subIndex) in JSON.parse(item.my_answer).q" :key="subIndex+5">{{subItem}}</span>
                                    <span v-for="(subItem,subIndex) in JSON.parse(item.my_answer).bmj" :key="subIndex+10">{{subItem}}</span>
                                    <span v-for="(subItem,subIndex) in JSON.parse(item.my_answer).tj" :key="subIndex+15">{{subItem}}</span>
                                    <span class="gs-box" v-for="(subItem,subIndex) in JSON.parse(item.my_answer).gs" :key="subIndex+25">{{toAsync(subItem)}}</span>
                                </td>
                                <td v-else class="td-left"> 
                                    <i>{{index+1}}</i>
                                </td>
                                <!-- <td v-if="item.right_answer"> 
                                    <span v-for="(rsubItem,rsubIndex) in JSON.parse(item.right_answer).q" :key="rsubIndex+10">{{rsubItem}}</span>
                                    <span v-for="(rsubItem,rsubIndex) in JSON.parse(item.right_answer).bmj" :key="rsubIndex+20">{{rsubItem}}</span>
                                    <span v-for="(rsubItem,rsubIndex) in JSON.parse(item.right_answer).tj" :key="rsubIndex+30">{{rsubItem}}</span>
                                    <span class="gs-box" v-for="(rsubItem,rsubIndex) in JSON.parse(item.right_answer).gs" :key="rsubIndex+40">{{toAsync(rsubItem)}}</span>
                                </td>
                                <td v-else class="td-left">
                                    
                                </td> -->
                                <td class="use-time">{{item.score}}分</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="total">总得分: <span>{{totalScore}}</span>分</div>
                </div>
                <div class="detail-right">
                    <p class="main-title">成绩排行榜:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>分数</th>
                                <th>答题用时</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in scoreRank" :key="index" :class="index>4?trHide:''">
                                <td class="td-left"><i>{{index+1}}</i><img :src="item.user_head_image" class="head-pic" :alt="item.user_name"><span>{{item.user_name}}</span></td>
                                <td>{{item.sum_score}}分</td>
                                <td class="use-time">{{getMinute(item.avg_usetime)}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn-box"><a href="javascript:void(0)" class="cbtn" @click="showAlltr">{{btnMsg}}</a></div>
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
    resSituation:{
        score:'',
        rank:'',
        rightPercent:'',
        useTime:''
    },
    btnMsg:'查看全部',
    trHide:'tr-hide',
    scoreDetail:[],
    scoreRank:[]
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
    goBack(){
        this.$router.go(-1)
    },
     toAsync(str){
        if(str){
            return '$'+str+'$';
        }else{
            return ''
        }
    },
    showAlltr(){ //查看更多
        if(this.trHide == 'tr-hide'){
            this.trHide = 'tag';
            this.btnMsg = '隐藏'
        }else{
            this.trHide = 'tr-hide';
            this.btnMsg = '查看全部'
        }
    },
    getMinute(min){
        return share.getMinute(min);
    },
    getrefresh(){
        this.reload();
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this;
    let params = {
        token:store.state.token
    }
    if(store.state.batch) {
        let params1 = {
            token:store.state.token,
            userType:store.state.userType*1,
            batch:store.state.batch
        }
        base.getUrl(API.allUrl.onlineTest,params1).then((res) => {
            console.log(res)
            if(res.code == 200 && res.success == 1) {
                if(res.obj.score_rank.length > 0) {
                    let user_loginname = JSON.parse(store.state.user)['userLoginname']
                    res.obj.score_rank.forEach((item,index) =>{
                        if(item['user_loginname'] == user_loginname) {
                            this.resSituation.score = item['sum_score']?item['sum_score']:0
                            this.resSituation.rank = index+1
                            this.resSituation.useTime = item['avg_usetime']?item['avg_usetime']:0
                        }
                    })
                }
                this.scoreDetail = res.obj.score_report
                if(res.obj.score_report.length>0) {
                    let num = 0;
                    res.obj.score_report.forEach((item,index) => {
                        if(item.is_right == 0) {
                            num++;
                        }
                    })
                     this.resSituation.rightPercent = num/res.obj.score_report.length;
                }
                this.scoreRank = res.obj.score_rank
                this.$nextTick(() => {
                    window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
                })
            }
        })
    }else{
        base.getUrl(API.allUrl.batch,params).then(res => {
            if(res.code == 200 && res.success ==  1) {
                let params1 = {
                    token:store.state.token,
                    userType:store.state.userType*1,
                    batch:res.obj
                }
                
                base.getUrl(API.allUrl.onlineTest,params1).then((res) => {
                    if(res.code == 200 && res.success == 1) {
                        if(res.obj.score_rank.length > 0) {
                            let user_loginname = JSON.parse(store.state.user)['userLoginname']
                            res.obj.score_rank.forEach((item,index) =>{
                                 rightNum += item['test_user_rightnum'];
                                if(item['user_loginname'] == user_loginname) {
                                    this.resSituation.score = item['sum_score']?item['sum_score']:0
                                    this.resSituation.rank = index+1
                                    this.resSituation.useTime = item['avg_usetime']?item['avg_usetime']:0
                                }
                            })
                            this.resSituation.rightPercent = rightNum/res.obj.score_rank.length;
                        }
                        this.scoreDetail = res.obj.score_report
                        this.scoreRank = res.obj.score_rank
                        this.$nextTick(() => {
                            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
                        })
                    }
                })
            }
        })
    }
    
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(() => {
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
        height: 106*0.4*0.02rem;
        line-height: 106*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 90.78%;
        margin: 0 auto 70*0.4*0.02rem;
        .situation-box{
            width: 100%;
            height: 300*0.4*0.02rem;
            box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
            .main-title{
                font-size: 34*0.02*0.4rem;
                color: @fcolor;
                height: 105*0.4*0.02rem;
                line-height: 105*0.4*0.02rem;
                text-indent: 85*0.4*0.02rem;
            }
            .situation-detail{
                margin: 40*0.4*0.02rem 40*0.4*0.02rem 40*0.4*0.02rem 0;
                font-size: 34*0.4*0.02rem;
                color: @fcolor;
                .item{
                    float: left;
                    width: 25%;
                    text-align: center;
                    span{
                        font-size: 60*0.4*0.02rem;
                    }
                    .score{
                        color: #7062ff;
                    }
                    .order{
                        color: #f7df1f;
                    }
                    .rights{
                        color: #39cc6c;
                    }
                    .time{
                        color: #ff748e;
                    }
                }
            }
        }
        .detail-box{
            width: 100%;
            margin: 55*0.4*0.02rem auto;
            .main-title{
                font-size: 34*0.02*0.4rem;
                color: @fcolor;
                height: 105*0.4*0.02rem;
                line-height: 105*0.4*0.02rem;
                text-indent: 65*0.4*0.02rem;
            }
            .detail-left{
                float: left;
                margin-right: 54*0.02*0.4rem;
                width: calc(~"50% - 27*0.02*0.4rem");
                height: 825*0.4*0.02rem;
                overflow: auto;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1);
                table{
                    width: 100%;
                    thead{
                        tr{
                            line-height: 40*0.4*0.02rem;
                            height: 40*0.4*0.04rem;
                            color: @fcolor;
                            font-size: 34*0.4*0.02rem;
                            th{
                                min-width: 120*0.4*0.02rem;
                            }
                        }
                    }
                    tbody{
                        tr{
                            height: 100*0.4*0.02rem;
                            line-height: 100*0.4*0.02rem;
                            td{
                                text-align: center;
                                font-size: 34*0.4*0.02rem;
                                border-bottom: 1px solid #eeeeee;
                                .head-pic{
                                    width: 85*0.4*0.02rem;
                                    height: 85*0.4*0.02rem;
                                    margin: 0 30*0.02*0.4rem;
                                }
                                i{
                                    display: inline-block;
                                    width: 60*0.4*0.02rem;
                                    height: 60*0.4*0.02rem;
                                    line-height: 60*0.4*0.02rem;
                                    font-size: 36*0.4*0.02rem;
                                    color: #fb0f1c;
                                    vertical-align: middle;
                                    border-radius: 50%;
                                    background-color: #fc8628;
                                    color: #ffffff;
                                    margin-right: 10*0.4*0.02rem; 
                                    text-align: center;
                                }
                                &.use-time{
                                    color: #6c63ff;
                                }
                                span{
                                    margin-left: 5*0.4*0.02rem;
                                }
                                &.td-left{
                                    padding-left: 50*0.4*0.02rem;
                                    text-align: left;
                                    border-right: 1px solid #eeeeee;
                                    i{
                                        text-align: center;
                                    }
                                }
                            }
                            &.tr-hide{
                                display: none;
                            }
                        }
                    }
                }
                .total{
                    font-size: 34*0.4*0.02rem;
                    color: #6c63ff;
                    text-align: center;
                    margin: 45*0.4*0.02rem auto;
                } 
            }
            .detail-right{
                float: left;
                width: calc(~"50% - 27*0.02*0.4rem");
                height: 825*0.4*0.02rem;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
                overflow-y: auto;
                table{
                    width: 100%;
                    thead{
                        tr{
                            line-height: 40*0.4*0.02rem;
                            height: 40*0.4*0.04rem;
                            color: @fcolor;
                            font-size: 34*0.4*0.02rem;
                        }
                    }
                    tbody{
                        tr{
                            height: 100*0.4*0.02rem;
                            line-height: 100*0.4*0.02rem;
                            td{
                                text-align: center;
                                font-size: 34*0.4*0.02rem;
                                .head-pic{
                                    width: 85*0.4*0.02rem;
                                    height: 85*0.4*0.02rem;
                                    margin: 0 30*0.02*0.4rem;
                                    border-radius: 50%;
                                }
                                i{
                                    display: inline-block;
                                    width: 60*0.4*0.02rem;
                                    height: 60*0.4*0.02rem;
                                    line-height: 60*0.4*0.02rem;
                                    font-size: 36*0.4*0.02rem;
                                    color: #fb0f1c;
                                    vertical-align: middle;
                                    border-radius: 50%;
                                    background-color: #fc8628;
                                    color: #ffffff; 
                                }
                                &.use-time{
                                    color: #6c63ff;
                                }
                                &.td-left{
                                    padding-left: 50*0.4*0.02rem;
                                    text-align: left;
                                    i{
                                        text-align: center;
                                    }
                                }
                            }
                            &.tr-hide{
                                display: none;
                            }
                        }
                    }
                }
                .btn-box{
                    width: 100%;
                    margin: 25*0.4*0.02rem auto;
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
        }
        
    }
}
</style>