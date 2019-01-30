<template>
  <div class="box">
    <div v-for="(item,index) in colors" :key="index" class="item">
      <div class="drag-div">
        <draggable :clone="getdata" :options="{item:item,group:'prople',animation:500}" @end="datadragEnd" v-model="colors[index]" class="draggle">
          <div v-for="(element,subIndex) in item" :key="subIndex" @dragstart="nohasDrag(subIndex)">{{element}}</div>
        </draggable>
      </div>
    </div>
    </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      msg: "这是测试组件",
      colors: [
          ['apple','banana','orage'],
          ['linzhil','cjk','bdyjy'],
          ['linzhil0011','cjk0011','bdyjy0011'],
      ],
    };
  },
  components: {
    draggable
  },
  methods: {
    getdata(evt) {
      console.log(evt);
    },
    datadragEnd(evt) {
      evt.preventDefault();
    },
    nohasDrag(index){
      console.log(index)
    },
    getIndex(index){
      console.log(index)
    }
  },
  mounted() {
    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
  }
};
</script>

<style lang="less" scoped>
.box{
  overflow: hidden;
}
.drag-div{
  padding:60px 0;
  float: left;
  width: 33.33%;
  border: 1px solid red;
  .draggle{
    line-height: 50px;
    min-height: 500px;
    border: 1px solid #cccccc;
    div{
      line-height: 50px;
      height: 50px;
      border: 1px solid #cccccc;
    }
  }
}
.test {
  border: 1px solid #ccc;
}
.drag-item {
  width: 200px;
  height: 50px;
  line-height: 50px;
  margin: auto;
  position: relative;
  background: #ddd;
  margin-top: 20px;
}
.ghostClass {
  opacity: 1;
}
.bottom {
  width: 200px;
  height: 50px;
  position: relative;
  background: blue;
  top: 2px;
  left: 2px;
  transition: all 0.5s linear;
}
</style>