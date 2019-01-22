<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// import RegPage from "@/pages/RegPage";
export default {
  name: "App",
  components: { },
  data(){
    return {
      // isLogin:localStorage.getItem('loginInfo')?true:false
    }
    
  },
  created(){
    // plus.screen.lockOrientation( 'landscape-primary');
      // this.$router.push('/reg')
  }
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
              i{
                position: relative;
                color: #6c63ff;
                font-size: 0.32rem;
                font-weight: bold;
                top: -1px;
                margin-right: 5px;
              }
          }
          .main-wrapper{
              width: 100%;
              height: calc(~"100% - 1.6rem");
              overflow: auto;
          }
      }
  }
  .mjx-chtml {
    outline: 0;
  }
  .MJXc-display {
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>
