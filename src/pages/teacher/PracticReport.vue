<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">在线测试<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">在线测试学生练习结果</h3>
        <div class="main-box">
            <div class="situation-box">
                <p class="main-title">测试概况:</p>
                <div class="situation-detail clearfix">
                    <div class="item time clearfix"><p class="desc-time">时间: </p><div class="detail-time"><p class="start-time">{{timestampToTime(resSituation.min_time)}}</p><p class="end-time">{{timestampToTime(resSituation.max_time)}}</p></div></div>
                    <div class="item num">题量: <span class="order">{{resSituation.course_num}}题</span></div>
                    <div class="item submitd">已交: <span class="rights">{{resSituation.answered}}人</span></div>
                    <div class="item score">平均分: <span class="time">{{resSituation.average}}分</span></div>
                </div>
            </div>

            <div class="detail-box clearfix">
                <div class="detail-left">
                    <p class="main-title">各小组正确率统计:</p>
                    <div class="echart-box clearfix">
                        <div v-for="(item,index) in allTestUser" :key="item" class="echarts" :id="gernerateId(index)">

                        </div>
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
                            <tr v-for="(item,index) in scoreDetail" :key="index" :class="index>4?trHide:''">
                                <td><i>{{index+1}}</i><img :src="item.user_head_image" class="head-pic" :alt="item.user_name"><span>{{item.user_name}}</span></td>
                                <td>{{item.sum_score}}分</td>
                                <td class="use-time">{{getMinute(item.sum_usetime)}}</td>
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
import share from '../../router/http/share.js'
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
inject:['reload'],
data() {
//这里存放数据
return {
    charts:'',
    optionX:['基础知识','计算能力','建模能力'],
    optionY:[2.6, 5.9, 9.0],
    btnMsg:'查看全部',
    trHide:'tr-hide',
    allTestUser:0,
    allTestInfo:'',
    resSituation:{
        max_time:'',
        min_time:'',
        course_num:'',
        answered:'',
        average:''
    },
    dataArr:[],
    scoreDetail:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getrefresh(){
        this.reload();
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
    timestampToTime(time){
        return share.timestampToTime(time/1000);
    },
    gernerateId(index){
        return 'echart'+(index*1+1)
    },
    initEchart(id,titles,datas){
        this.charts = echarts.init(document.getElementById(id))
        let options = {
             title:{
                show:true,
                text:titles,
                x:'center',
                y:'0',
                textStyle:{
                    color:'#696767',
                    align:'center',
                    verticalAlign:'middle',
                    fontWeight:'normal',
                    fontSize:8
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable : true,
            series : [
                {
                    type:'pie',
                    legendHoverLink:false,
                    hoverAnimation :false,
                    radius : ['40%', '55%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            },
                            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                                    offset: 0,
                                    color: '#E3F7E9'
                                },{
                                    offset: 1,
                                    color: '#33CB67'
                                }])
                        },
                        emphasis : {
                            label : {
                                show : false
                            }
                        }
                    },
                    data:[
                        { value:datas },
                        { value:this.allTestUser },
                    ]
                }
            ]
        }
        if (options && typeof options === "object") {
            this.charts.setOption(options, true);
        }
    }
    
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
                self.resSituation.max_time = res.obj.class_report[0]?res.obj.class_report[0]['max_time']:new Date();
                self.resSituation.min_time = res.obj.class_report[0]?res.obj.class_report[0]['min_time']:new Date();
                self.resSituation.course_num = res.obj.class_report[0]?res.obj.class_report[0]['sum_course_num']:0;
                self.resSituation.answered = res.obj.class_report[0]?res.obj.class_report[0]['test_usernum']:0+'/'+res.obj.score_rank.length;
                self.resSituation.average = res.obj.class_report[0]?res.obj.class_report[0]['sum_score']*1:0/res.obj.class_report[0]?res.obj.class_report[0]['test_usernum']:0;
                self.scoreDetail = res.obj.score_rank;
                self.allTestUser = res.obj.alltest_item.length;
                self.allTestInfo = res.obj.alltest_item;
                this.allTestInfo.forEach((item,index) => {
                    let obj = {
                        name:'',
                        value:''
                    };
                    obj.name = '第'+(index*1+1)+'题';
                    obj.value = JSON.parse(item.course_item).num/this.allTestUser;
                    this.dataArr.push(obj)
                })
                
            }else{
                console.log(res)
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
                    console.log(res)
                    if(res.code == 200 && res.success == 1) {
                        self.resSituation.max_time = res.obj.class_report[0]?res.obj.class_report['max_time']:new Date();
                        self.resSituation.min_time = res.obj.class_report[0]?res.obj.class_report['min_time']:new Date();
                        self.resSituation.course_num = res.obj.class_report[0]?res.obj.class_report[0]['sum_course_num']:0;
                        self.resSituation.answered = res.obj.class_report[0]?res.obj.class_report[0]['test_usernum']:0+'/'+res.obj.score_rank.length;
                        self.resSituation.average = res.obj.class_report[0]?res.obj.class_report[0]['sum_score']*1:0/res.obj.class_report[0]?res.obj.class_report[0]['test_usernum']:0;
                        self.scoreDetail = res.obj.score_rank;
                        self.allTestUser = res.obj.alltest_item.length;
                        self.allTestInfo = res.obj.alltest_item;
                        this.allTestInfo.forEach((item,index) => {
                            let obj = {
                                name:'',
                                value:''
                            };
                            obj.name = '第'+(index*1+1)+'题';
                            obj.value = JSON.parse(item.course_item).num/this.allTestUser;
                            this.dataArr.push(obj)
                        })
                        
                    }else{
                        console.log(res)
                    }
                })
            }
        })
    }
    
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    console.log(store.state)
   let self = this;
    this.$nextTick(function(){
        setTimeout(function(){
            for(var i=0;i<self.allTestUser;i++){
                self.initEchart('echart'+(i*1+1),self.dataArr[i]['name'],self.dataArr[i]['value'])
            }
        },500)
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
                    &.time{
                        color: #7062ff;
                        .desc-time{
                            float: left;
                            width: 40%;
                            text-align: right;
                        }
                        .detail-time{
                            float: left;
                            width: 60%;
                        }
                    }
                    &.num{
                        color: #f7df1f;
                    }
                    &.submitd{
                        color: #39cc6c;
                    }
                    &.score{
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
                min-height: 825*0.4*0.02rem;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1);
                padding-bottom: 50*0.4*0.02rem;
                .echart-box{
                    width: 100%;
                    height: calc(~"100% - 65*0.4*0.02rem");
                    .echarts{
                        float: left;
                        width: 50%;
                        min-height: 200*0.4*0.02rem;
                        border: 1px solid rgba(0,0,0,0.1);
                    }
                }
            }
            .detail-right{
                float: left;
                width: calc(~"50% - 27*0.02*0.4rem");
                height: 825*0.4*0.02rem;
                overflow-y: scroll;
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
