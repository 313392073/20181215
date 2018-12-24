<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">在线测试</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">在线测试学生练习结果</h3>
        <div class="main-box">
            <div class="situation-box">
                <p class="main-title">测试概况:</p>
                <div class="situation-detail clearfix">
                    <div class="item time clearfix"><p class="desc-time">时间: </p><div class="detail-time"><p class="start-time">05-24 14:26</p><p class="end-time">05-24 14:26</p></div></div>
                    <div class="item num">题量: <span class="order">08</span></div>
                    <div class="item submitd">已交: <span class="rights">16/16</span></div>
                    <div class="item score">平均分: <span class="time">14.08分</span></div>
                </div>
            </div>

            <div class="detail-box clearfix">
                <div class="detail-left">
                    <p class="main-title">各小组正确率统计:</p>
                    <div class="echart-box clearfix">
                        <div v-for="(item,index) in 6" :key="item" class="echarts" :id="gernerateId(index)">

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
                            <tr v-for="(item,index) in 5" :key="item">
                                <td><i>{{index+1}}</i><img src="../../assets/images/default.png" class="head-pic" alt="default"><span>流星雨</span></td>
                                <td>100分</td>
                                <td class="use-time">09分45秒</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn-box"><a href="javascript:void(0)" class="cbtn">查看全部</a></div>
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
import echarts from 'echarts'
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {
    charts:'',
    optionX:['基础知识','计算能力','建模能力'],
    optionY:[2.6, 5.9, 9.0]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    gernerateId(index){
        return 'echart'+(index*1+1)
    },
    initEchart(id){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
            title:{
                show:true,
                text:'表面积',
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
                    name:'访问来源',
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
                        {value:92, name:'表面积'},
                        {value:8, name:'默认数据'},
                    ]
                }
            ]
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(function(){
        this.initEchart('echart1')
        this.initEchart('echart2')
        this.initEchart('echart3')
        this.initEchart('echart4')
        this.initEchart('echart5')
        this.initEchart('echart6')
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
                height: 825*0.4*0.02rem;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1);
                .echart-box{
                    width: 100%;
                    height: calc(~"100% - 65*0.4*0.02rem");
                    .echarts{
                        float: left;
                        width: calc(~"50% - 2px");
                        height: 33%;
                        border: 1px solid rgba(0,0,0,0.1);
                    }
                }
            }
            .detail-right{
                float: left;
                width: calc(~"50% - 27*0.02*0.4rem");
                height: 825*0.4*0.02rem;
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