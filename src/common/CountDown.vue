<!--  -->
<template>
<div class='time-box'>
    答题时间：<span>{{fmtTime()}}</span>    
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
    timer:'',
    start_time:new Date().getTime(),
    mind:'',
    secd:'',
    timeStamp:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    fmtTime() {
        let dis_time = Math.round(this.getTime())
        let  hours = dis_time % 60
        let mins = Math.round((dis_time - 30)/60);
        
        this.secd = "" +((hours > 9) ? hours : '0'+hours);
        this.mind = "" +((mins > 9) ? mins : '0'+mins);
        console.log(this.mind+":"+this.secd)
        return this.mind+"分"+this.secd+"秒"
    },
    getTime:function() {
        let now_time = new Date();
        this.timeStamp = Math.floor((now_time.getTime() - this.start_time)/1000)
        return ((now_time.getTime() - this.start_time)/1000)
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this
    self.timer = setInterval(function() {
       self.fmtTime()
    },1000)
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {
    if(this.timer) {
        clearInterval(this.timer)
    }
}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.time-box{
    font-size: 16px;
    span{
        font-size: 20px;
    }
}
</style>