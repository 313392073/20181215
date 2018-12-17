<!--  -->
<template>
<div class='box'>
    <div id="main" style="width: 600px;height: 400px;" ref="myEchart"></div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import echarts from 'echarts'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    charts: '',
    opinionx:['A组', 'B组', 'C组', 'D组'],
    opinionY:[
        {value:10,'name':'A组'},
        {value:20,'name':'B组'},
        {value:30,'name':'C组'},
        {value:18,'name':'D组'}
    ]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    drawPie(id){
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

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    //在数据变化要执行的某个操作  这个操作需要使用随数据改变而改变dom结构的失衡 这个操作都应该放在Vue.nextTick()的回调函数中
    /**
     * vue异步执行dom更新  只要观察到数据变化 vue将开启一个队列 并缓冲在同一事件循环中发生的所有数据改变  如果同一个watcher被多次触发 
     * 只会被推入到队列中一次 这种在缓冲时去除重复数据予以避免不必要的
     */
    this.$nextTick(function() {
        this.drawPie('main');
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

</style>