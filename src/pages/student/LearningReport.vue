<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
 <div class="left-box">
    <div class="desc-menu">课堂总结<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">课堂总结成绩报告单</h3>
        <div class="main-box">
            <div class="situation-box">
                <p class="main-title">成绩概况:</p>
                <div class="situation-detail clearfix">
                    <div class="item">分数: <span class="score">{{resSituation.score}}</span></div>
                    <div class="item">班级排名: <span class="order">{{resSituation.rank}}</span></div>
                    <div class="item">正确率: <span class="rights">{{resSituation.rightPercent?(resSituation.rightPercent.toFixed(2)*100):0}}%</span></div>
                    <div class="item">用时: <span class="time">{{getMinute(resSituation.useTime)}}</span></div>
                </div>
            </div>

            <div class="detail-box clearfix">
                <div class="detail-left">
                    <p class="main-title">能力评估:</p>
                    <div class="echart" ref="myEchart" id="echart">

                    </div>
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
                            <tr v-for="(item,index) in scoreRank" :key="index" :class="index>5?trHide:''">
                                <td class="td-left">
                                    <i>{{index+1}}</i>
                                    <img :src="item.user_head_image" class="head-pic" alt="default">
                                    <span>{{item.user_name}}</span>
                                </td>
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
import echarts from 'echarts';
import base from '../../router/http/base.js';
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
    scoreRank:[],
    scoreReport:'',
    btnMsg:'查看全部',
    trHide:'tr-hide',
    charts:'',
    optionX:['基础知识','计算能力','建模能力'],
    optionY:[2.6, 5.9, 9.0],
    resSituation:{
        score:0,
        rightPercent:0,
        useTime:0,
        rank:0
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
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
        return min?share.getMinute(min):'0分0秒';
    },
    initEchart(id){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['你的数值','平均数值']
            },
            xAxis : [
                {
                    type : 'category',
                    data : this.optionX
                }
            ],
            yAxis : [
                {
                    name:'能力指数',
                    max:10,
                    type : 'value',
                    axisLine: {//线
                        show: false
                    },
                    axisTick: {//刻度
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'red',//坐标值得具体的颜色
                        }
                    },
                     splitLine: {
                        lineStyle: {
                            color: ['#eeeeee'],//分割线的颜色
                        }
                    }
                }
            ],
            series : [
                {
                    name:'你的数值',
                    type:'bar',
                    data:[2.0, 4.9, 7.0],
                    barWidth: 15,
                    itemStyle:{
                        barBorderRadius:8,
                    },
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                        offset: 0,
                        color: '#EF59A7'
                    },{
                        offset: 1,
                        color: '#F466F5'
                    }])
                },
                {
                    name:'平均数值',
                    type:'bar',
                    data:this.optionY,
                    barWidth: 15,
                    itemStyle:{
                        barBorderRadius:8,
                    },
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                        offset: 0,
                        color: '#F466F5'
                    },{
                        offset: 1,
                        color: '#763BFE'
                    }])
                }
            ]
        })
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
    let rightNum = 0;
    if(store.state.batch) {
        let params = {
            token:store.state.token,
            batch:store.state.batch
        }
        base.getUrl(API.allUrl.stuClassTest,params).then((res) => {
            console.log(res)
            if(res.code == 200 && res.success == 1) {
                if(res.obj.score_rank.length > 0) {
                    let user_loginname = JSON.parse(store.state.user)['userLoginname']
                    res.obj.score_rank.forEach((item,index) => {
                         rightNum += item['test_user_rightnum'];
                        if(item['user_loginname'] == user_loginname) {
                            this.resSituation.score = item['sum_score']?item['sum_score']:0
                            this.resSituation.useTime = item['avg_usetime']?item['avg_usetime']:0
                            this.resSituation.rank = index+1
                        }
                    })
                    this.resSituation.rightPercent = rightNum/res.obj.score_rank.length;
                }
                self.scoreRank = res.obj.score_rank;
                self.scoreReport = res.obj.score_report;
            }
        })
    }else{
         base.getUrl(API.allUrl.batch,params).then(res => {
            if(res.code == 200 && res.success ==  1) {
                let params = {
                    token:store.state.token,
                    batch:res.obj
                }
                base.getUrl(API.allUrl.stuClassTest,params).then((res) => {
                    if(res.code == 200 && res.success == 1) {
                        if(res.obj.score_rank.length > 0) {
                            let user_loginname = JSON.parse(store.state.user)['userLoginname']
                            res.obj.score_rank.forEach((item,index) => {
                                rightNum += item['test_user_rightnum'];
                                if(item['user_loginname'] == user_loginname) {
                                    this.resSituation.score = item['sum_score']?item['sum_score']:0
                                    this.resSituation.useTime = item['avg_usetime']?item['avg_usetime']:0
                                    this.resSituation.rank = index+1
                                }
                            })
                            this.resSituation.rightPercent = rightNum/res.obj.score_rank.length;
                        }
                        self.scoreRank = res.obj.score_rank;
                        self.scoreReport = res.obj.score_report;
                    }
                })
            }
        })
    }
   
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(function(){
        this.initEchart('echart')
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
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
                .echart{
                    width: 100%;
                    height: calc(~"100% - 65*0.4*0.02rem");
                    
                }
            }
            .detail-right{
                float: left;
                width: calc(~"50% - 27*0.02*0.4rem");
                height: 825*0.4*0.02rem;
                overflow-y: auto;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
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