<!--  -->
<template>
  <div class="box">
    <div v-for="(item,index) in dataList" :key="index">
      <h3 v-for="(subItem,subIndex) in item.gs.arr" :key="subIndex" @click="modelData(index,subIndex)">{{subItem.answer}}</h3>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

let list = [
  {
    gs:{
      arr:[
        {
          answer:11,
        },
        {
          answer:12,
        },
        {
          answer:13,
        }
      ]
    }
  },
  {
    gs:{
      arr:[
        {
          answer:21,
        },
        {
          answer:22,
        },
        {
          answer:23,
        }
      ]
    }
  }
]
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  dataList:''
};
},
//监听属性 类似于data概念
computed: {
  
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  modelData(pindex,index){
    this.$set(this.dataList[pindex].gs.arr[index],'answer','33333'+pindex)
    console.log(pindex,index)
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.dataList = list
    console.log(this.dataList)
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
  width: 800px;
  height: 400px;
  border: 1px solid red;
  margin: 0 auto;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}
</style>