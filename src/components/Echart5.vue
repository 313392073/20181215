<!--  -->
<template>
<div class='box'>
    <div id="main1" class="myEchart" style="600px;height:400px"></div>
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
            color:['#7BABED','#32D4EB','#39CC6C','#6AE7A5','#FE8706'],
            legend: {
                orient: 'vertical',
                y:'middle',
                data:['体积1','体积排列1','体积排列2','体积排列3','体积排列4']
            },
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : [30, 100],
                    center : ['25%', '50%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
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
        this.drawPie('main1');
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