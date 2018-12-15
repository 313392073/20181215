<template>
  <div id="app">
    <div class="wrapper">
      <div class="left-wrapper">
        333
      </div>
      <side-bar></side-bar>
    </div>
    <router-view/>
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
#app {
  width: 100%;
  height: 100%;
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    .left-wrapper {
      width: 100%;
      min-height: 100%;
      flex: 1;
      background-color: #ffffff;
      border-right: 1px solid #dddddd;
      position: relative;
      .desc-menu {
        height: 55 * 0.02rem;
        line-height: 55 * 0.02rem;
        border-bottom: 1px solid #dddddd;
        font-size: 0.36rem;
        padding-left: 0.5rem;
        color: #5c5a5a;
      }
      .main-wrapper {
        width: 100%;
        height: calc(~"100% - 1.1rem");
        overflow-y: auto;
      }
    }
  }
}
</style>
