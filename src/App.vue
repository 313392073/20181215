<template>
  <div id="app">
    <div class="wrapper">
      <div class="left-wrapper">
       <router-view/>
      </div>
      <side-bar></side-bar>
    </div>
  </div>
</template>
<script>
import SideBar from "@/common/SideBar";
export default {
  name: "App",
  components: { SideBar }
};
</script>

<style lang="less">
 @fcolor:#5c5a5a;
#app {
  width: 100%;
  height: 100%;
  .wrapper{
      width: 100%;
      height: 100%;
      display: flex;
      .left-wrapper{
          width: 100%;
          height: 100%;
          flex: 1;
          background-color: #ffffff;
          border-right: 1px solid #dddddd;
          position: relative;
          .desc-menu{
              height: 200*0.4*0.02rem;
              line-height: 200*0.4*0.02rem;
              border-bottom: 1px solid #dddddd;
              font-size: 44*0.4*0.02rem;
              padding-left: 0.5rem;
              color: @fcolor;
          }
          .main-wrapper{
              width: 100%;
              height: calc(~"100% - 1.6rem");
              overflow: auto;
          }
      }
  }
}
</style>
