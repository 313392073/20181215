<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">课堂学习</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">课堂学习测试结果统计报告</h3>
        <div class="main-box">
            <div class="mark-box">
                <p class="mark-title">学生成绩</p>
                <div id="bechart" class="bechart"></div>
            </div>
            <div class="detail-box clearfix">
                <div class="detail-left">
                    <p class="main-title">班级正确率:</p>
                    <div class="right-box">
                        <div class="line-box clearfix">
                            <div class="line-item" id="rechart1"></div>
                            <div class="line-item" id="rechart2"></div>
                            <div class="line-item last-item" id="rechart3"></div>
                        </div>
                        <p class="right-title">各小题正确率：</p>
                        <div class="detail-table clearfix">
                            <div class="table-left">
                                <table>
                                    <tr>
                                        <td class="td-title">题号</td>
                                        <td>1(1)</td>
                                        <td>1(2)</td>
                                        <td>2(1)</td>
                                        <td>2(2)</td>
                                        <td>2(3)</td>
                                    </tr>
                                    <tr>
                                        <td class="td-title">正确率</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                    </tr>
                                </table>
                                <p class="desc">表面积检测</p>
                            </div>
                            <div class="table-right">
                                <table>
                                    <tr>
                                        <td class="td-title">题号</td>
                                        <td>1(1)</td>
                                        <td>1(2)</td>
                                        <td>2(1)</td>
                                        <td>2(2)</td>
                                        <td>2(3)</td>
                                    </tr>
                                    <tr>
                                        <td class="td-title">正确率</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                    </tr>
                                </table>
                                <p class="desc">体积检测</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-right">
                    <p class="main-title">答错分布:</p>
                    <div class="wrong-box" id="echart1"></div>
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
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {
    echarts:'',
    opinionx:['A组', 'B组', 'C组', 'D组'],
    opinionY:[
        {value:10,'name':'A组'},
        {value:20,'name':'B组'},
        {value:30,'name':'C组'},
        {value:18,'name':'D组'}
    ],
    info:'',
    alltest_error:[],
    alltest_item:[],
    alltest_user:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    pieEchart(id){
        this.echarts = echarts.init(document.getElementById(id));
        this.echarts.setOption({
            color:['#7BABED','#32D4EB','#39CC6C','#6AE7A5','#FE8706'],
            legend: {
                orient: 'horizontal',
                top:'auto',
                itemWidth:12,
                itemHeight:8,
                data:['体积1','体积排列1','体积排列2','体积排列3','体积排列4']
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : [20, 60],
                    center : ['50%', '60%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            position: 'outside',
                        }
                    },
                    labelLine:{
                        length:0,
                        length2:0,
                    },
                    data:[
                        {value:40, name:'体积1'},
                        {value:20, name:'体积排列1'},
                        {value:8, name:'体积排列2'},
                        {value:10, name:'体积排列3'},
                        {value:12, name:'体积排列4'}
                    ]
                }
            ]
        })
    },
    rightEchart(id){
        this.echarts = echarts.init(document.getElementById(id));
        this.echarts.setOption({
            title:{
                show:true,
                text:'表面积',
                x:'center',
                y:'100px',
                textStyle:{
                    color:'#696767',
                    align:'center',
                    verticalAlign:'middle'
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
                    radius : ['40%', '65%'],
                    itemStyle : {
                        normal : {
                           label:{
                                position: 'outside',
                                fontStyle:'normal',
                                fontWeight:'lighter'
                            },
                            labelLine:{
                                length:0,
                                length2:0,
                            },
                            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                                    offset: 0,
                                    color: '#E3F7E9'
                                },{
                                    offset: 1,
                                    color: '#33CB67'
                                }])
                        }
                    },
                    data:[
                        {value:92, name:'表面积'},
                        {value:8, name:'默认数据'},
                    ]
                }
            ]
        })
    },
    barEchart(id){
        this.echarts = echarts.init(document.getElementById(id))
        this.echarts.setOption({
            legend: {//图例
                show:false,
                data: ['学生成绩'],//与series的name对应
                left: '75%',//图例的位置，可以用像素，可以用百分比，也可以用center，right等
                top: 12.5,//图例的位置
                itemWidth: 10,//图例图标的宽
                itemHeight: 10,//图例图标的高
                textStyle: {
                    color: '#878787',//值的具体的颜色
                }
            },
            xAxis: {//x轴
                    type: 'category',
                    data: this.opinionx,//x轴的数据
                    splitLine: {show: false},//去除网格分割线
                    // splitArea: {show: true},//保留网格区域
                    axisLine: {//坐标线
                        lineStyle: {
                            type: 'solid',
                            color: '#d8d8d8',//轴线的颜色
                            width:'1'//坐标线的宽度
                        }
                    },
                    axisTick: {//刻度
                        show: false//不显示刻度线
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#878787',//坐标值的具体的颜色
                        }
                    },
                    splitLine: {
                        show: false//去掉分割线
                    },
                },
                backgroundColor: '#fff',//图得背景色
                yAxis: {
                    name: '被找次数',//轴的名字，默认位置在y轴上方显示
                    max: 50,//最大刻度
                    type: 'value',
                    axisLine: {//线
                        show: false
                    },
                    axisTick: {//刻度
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#878787',//坐标值得具体的颜色
                        }
                    },
                    minInterval: 5,//标值的最小间隔
                    splitLine: {
                        lineStyle: {
                            color: ['#f6f6f6'],//分割线的颜色
                        }
                    }
                },
                series: [{
                    name: '被找次数',//每组数据的名字，与图例对应
                    data: this.opinionY,//数据
                    type: 'bar',//柱状图
                    itemStyle: {
                        normal: {
                            //设置柱子颜色
                            //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                                offset: 0,
                                color: '#FF77B0'
                            },{
                                offset: 1,
                                color: '#F6C56F'
                            }]),
                            barBorderRadius:8,
                            label: {
                                show: true,//柱子上显示值
                                position: 'top',//值在柱子上方显示
                                textStyle: {
                                    color: '#FD6B71'//值得颜色
                                }
                            }
                        },
                        
                    },
                    barWidth: 15,//设置柱子宽度，单位为px
                }]
           
        })
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
            let params = {
                token:store.state.token,
                batch:res.obj
            }
            base.getUrl(API.allUrl.classTest,params).then((res) => {
                console.log(res)
                if(res.code == 200 && res.success == 1) {
                    self.info = res.obj;
                }
            })
        }
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(function(){
        this.barEchart('bechart')
        this.pieEchart('echart1')
        this.rightEchart('rechart1')
        this.rightEchart('rechart2')
        this.rightEchart('rechart3')
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
        height: 142*0.4*0.02rem;
        line-height: 142*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 93.087%;
        margin: 0 auto 70*0.4*0.02rem;
        .mark-box{
            width: 100%;
            height: 575*0.4*0.02rem;
            padding: 0 45*0.4*0.02rem;
            box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1);
            position: relative;
            .mark-title{
                position: absolute;
                left: 45*0.4*0.02rem;
                top: 15*0.4*0.02rem;
                font-size: 38*0.4*0.02rem;
                color: #333333;
            }
            .bechart{
                width: 100%;
                margin-top: 15*0.4*0.02rem;
                height: calc(~"100% - 15*0.4*0.02rem");
            }
        }
        .detail-box{
            width: 100%;
            margin: 50*0.4*0.02rem auto;
            .main-title{
                font-size: 38*0.02*0.4rem;
                color: @fcolor;
                height: 105*0.4*0.02rem;
                line-height: 105*0.4*0.02rem;
                text-indent: 50*0.4*0.02rem;
            }
            .detail-left{
                float: left;
                margin-right: 54*0.02*0.4rem;
                width: 62.8%;
                height: 620*0.4*0.02rem;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1);
                margin-right: 3.2%;
                .right-box{
                    .line-box {
                        border-bottom: 1px solid #f3f3f3;
                        .line-item{
                            float: left;
                            width: calc(~"33.3% - 1px");
                            border-right: 1px solid #f3f3f3;
                            height: 220*0.4*0.02rem;
                            &.last-item{
                                border-right: none;
                            }
                        }
                    }
                    
                    .right-title{
                        font-size: 34*0.4*0.02rem;
                        color: @fcolor;
                        height: 70*0.4*0.02rem;
                        line-height: 70*0.4*0.02rem;
                        text-indent: 50*0.4*0.02rem;
                    }
                    .detail-table{
                        padding: 0 50*0.4*0.02rem;
                        &>div{
                            float: left;
                            width: 49%;
                            margin-right: 2%;
                            text-align: center;
                            &:last-child{
                                margin-right: 0;
                            }
                            table{
                                width: 100%;
                                tr{
                                    height: 65*0.4*0.02rem;
                                    line-height: 65*0.4*0.02rem;
                                    td{
                                        border: 1px solid #f3f3f3;
                                        font-size: 12px!important;
                                        color: @fcolor;
                                       
                                    }
                                }
                            }
                            .desc{
                                height: 80*0.4*0.02rem;
                                line-height: 80*0.4*0.02rem;
                            }
                        }
                    }
                }
            }
            .detail-right{
                float: left;
                width: 34%;
                height: 620*0.4*0.02rem;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
                .wrong-box{
                    width: 100%;
                    height: calc(~"100% - 105*0.4*0.02rem");
                }
            }
        }
        
    }
}
</style>