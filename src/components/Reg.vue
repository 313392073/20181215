<!--  -->
<template>
<div class='box'>
    <h3>今天天气不错</h3>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    beforetab: {
        title:'课前预习',
        list:[{name:'在线测试',url:''},{name:'寻找棱锥',url:''},{name:'制作棱锥',url:''}]
    },
    lessontab:{
        title:'课堂学习',
         list:[
             {
                name:'作业分享',
                url:'',
             },
             {
                name:'正棱锥表面积',
                url:'',
                tag:false,
                list:[
                   {name:'视频分享',target:'' },
                    {name:'侧面积公式',target:'' },
                    {name:'表面积公式',target:'' },
                    {name:'计算表面积',target:'' },
                ]
            },
            {
                name:'正棱锥体积',
                url:'',
                tag:false,
                list:[
                   {name:'体积公式',target:'' },
                    {name:'计算体积',target:'' },
                ]
            },
            {
                name:'在线关系',
                url:'',
                tag:false,
                list:[
                   {name:'分组讨论',target:'' },
                    {name:'小组汇报',target:'' },
                    {name:'课堂总结',target:'' },
                ]
            },
         ]
    },
    aftertab: {
        title:'课后拓展',
        list:[{name:'课后习题',url:''},{name:'课后实验',url:''},{name:'分享体会',url:''}]
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
    .box{
        background: cadetblue;
        h3{
            color: red;
        }
    }
</style>