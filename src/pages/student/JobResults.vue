<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">作业分享</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">作业结果</h3>
        <div class="main-box">
            <div class="situation-box">
                <p class="main-title">小组排名:</p>
                <div class="situation-detail clearfix">
                    <div class="item" v-for="(item,index) in groupScore" :key="index">
                        <p class="item-title first">第{{index*1 + 1}}名 {{item.groupname}}组</p>
                        <div class="detail-box clearfix">
                            <div v-for="(subItem,subIndex) in item.groupuser_loginnames.split(',')" :key="subIndex">
                                <img :src="item.groupuser_headimages.split(',')[subIndex]" alt="default.png">
                                <p>{{subItem}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="detail-box clearfix">
                <div class="detail-left">
                    <p class="main-title">寻找棱锥:</p>
                    <div class="find-box" id="barechart"></div>
                </div>
                <div class="detail-right">
                    <p class="main-title">制作棱锥:</p>
                    <div class="make-box" id="linechart"></div>
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
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {
    charts:'',
    optionX:['A组', 'B组', 'C组', 'D组'],
    optionY:[
        {value:10,'name':'A组'},
        {value:20,'name':'B组'},
        {value:30,'name':'C组'},
        {value:18,'name':'D组'}
    ],
    groupScore:'',
    groupResult:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    barEchart(id){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
            legend: {//图例
                show:false,
                data: ['被找次数'],//与series的name对应
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
                    data: this.optionX,//x轴的数据
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
                    data: this.optionY,//数据
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
    },
    lineEchart(id,datax,tj,bmj){{
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['体积','表面积']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : datax
                }
            ],
            yAxis : [
                {
                    name:'测量结果和实际值的误差（%）',
                    type : 'value',
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
                    splitLine: {
                        lineStyle: {
                            color: ['#f6f6f6'],//分割线的颜色
                        }
                    }
                }
            ],
            series : [
                {
                    name:'体积',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:tj,
                    symbol:'circle',
                    symbolSize:8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                        offset: 0,
                        color: '#2ECE68'
                    },{
                        offset: 1,
                        color: '#ffffff'
                    }]),
                },
                {
                    name:'表面积',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    symbol:'circle',
                    symbolSize:8,
                    data:bmj,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                        offset: 0,
                        color: '#77ABEB'
                    },{
                        offset: 1,
                        color: '#ffffff'
                    }]),
                }
            ]
        })
    }}
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
            console.log(params)
            base.getUrl(API.allUrl.courseSummary,params).then((res) => {
                console.log(res)
                if(res.code == 200 && res.success == 1) {
                    self.groupScore = res.obj.group_score;
                    self.groupResult = res.obj.group_result;
                    let optionx = [];
                    let optiont = [];
                    let optionb = [];

                    if(self.groupResult && self.groupResult.length > 0) {
                        self.groupResult.forEach((item) => {
                            optionx.push(item['group_name']+'组')
                            optiont.push(item['group_bmj_range']*100)
                            optionb.push(item['group_tj_range'])
                        })
                    }
                    this.lineEchart('linechart',optionx,optiont,optionb)
                }
            })
        }
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(function(){
        this.barEchart('barechart')
        
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
            height: 3rem;
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
                    .item-title{
                        font-size: 42*0.4*0.02rem;
                    }
                    .first{
                        color: #fe0302;
                    }
                    .second{
                        color: #fe75b0;
                    }
                    .third{
                        color: #79aaef;
                    }
                    .fouth{
                        color: #f9cf97;
                    }
                    .detail-box{
                        margin: 20*0.4*0.02rem;
                        padding: 0 30*0.4*0.02rem; 
                        &>div{
                            float: left;
                            width: 25%;
                            text-align: center;
                            font-size: 12px!important;
                            img{
                                width: 75*0.4*0.02rem;
                                height: 75*0.4*0.02rem;
                                border-radius: 50%;
                            }
                        }
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
                .find-box{
                    width: 100%;
                    height: calc(~"100% - 65*0.4*0.02rem");
                }
            }
            .detail-right{
                float: left;
                width: calc(~"50% - 27*0.02*0.4rem");
                height: 825*0.4*0.02rem;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
                .make-box{
                    width: 100%;
                    height: calc(~"100% - 65*0.4*0.02rem");
                }
            }
        }
        
    }
}
</style>