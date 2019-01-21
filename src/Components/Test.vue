<!--  -->
<template>
   <div>
        <div class="weui-cells weui-cells_checkbox font14" v-for="(item,index) in question_item" :key="index">
            <label class="weui-cell weui-check__label">
                <div class="weui-cell__ft width-inherit">
                    <input type="checkbox" class="weui-check" v-on:click="CheckItem(item)" v-model="item.flag" name="checkbox" />
                </div>
            </label>
        </div>
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
    question_item:[
        {
            cand_item:'1',
            text:'今天天气不错0',
            flag:false,
        },
        {
            cand_item:'1',
            text:'今天天气不错1',
            flag:false,
        },
        {
            cand_item:'1',
            text:'今天天气不错2',
            flag:false,
        },
        {
            cand_item:'1',
            text:'今天天气不错3',
            flag:false,
        },
    ],
    checkedValue:[],//一定必须是数组不能是字符串
    answer:[],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    checkedValue:function(new_v,old_v){
        this.answer = this.checkedValue;
    }
},
//方法集合
methods: {
    CheckItem:function(item){
        item.flag = !item.flag;
        console.log(this.question_item);
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