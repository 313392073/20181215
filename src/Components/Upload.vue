<!--  -->
<template>
<div class='box'>
    <!-- 调用手机的相机  capture 表示的是系统所捕获的默认设备  camera: 照相机  camcorder: 摄像机  micorophone: 录音 -->
   <input type="file" accept="image/*" capture="camera">
   <!-- 调用相册或者相机  这个因浏览器不同和表现不同  可以试一试当我们用input 选择完图片后  我们就可以在这上面看到我们选择图片的名称了  接下来酒剩下如何传送给后台文件了 -->
    <input type="file" accept="image/*" >
    <div>
        <el-date-picker
        v-model="valuestart"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="请选择开始时间">
        </el-date-picker>
        <span>~</span>
        <el-date-picker
        v-model="valueend"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="请选择结束时间">
        </el-date-picker>
    </div>
    <button @click="getDate">选中</button>
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
    valuestart:'',
    valueend:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    upload(){
        //实例化一个空对象
        var data = new FormData();
        //获取file 文件
        var file = document.getElementById('input')[0].files[0];
        //将文件加入到data中  一般FormData 对象中添加使用append()方法
        data.append(file)
        //创建一个HTTP请求
        var request = new XMLHttpRequest();
        //然后使用open 方法  选择传送的method 和后台的url
        request.open('post|get',URL);
        //最后  向后台发送我们的数据
        request.send(data)
    },
    getDate() {
        console.log(this.valuestart)
        console.log(this.valueend)
        if(this.valuestart > this.valueend) {
            console.log(1)
        }else if(this.valuestart == this.valueend){
            console.log(2)
        }else{
            console.log(3)
        }
    }
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

</style>