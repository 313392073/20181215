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
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['你的数值','平均数值']
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['基础知识','计算能力','建模能力']
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
                    data:[2.6, 5.9, 9.0],
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