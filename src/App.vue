<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
// import RegPage from "@/pages/RegPage";
export default {
  name: "App",
  components: { },
  provide (){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive: true
      // isLogin:localStorage.getItem('loginInfo')?true:false
    }
  },
  created(){
    // plus.screen.lockOrientation( 'landscape-primary');
      // this.$router.push('/reg')
  },
  mounted() {
    //添加事件
    let self = this;
    //取消选中
    document.addEventListener('touchstart',function() {
      document.oncontextmenu = false
    },false)

    document.addEventListener('plusready',function() {
      plus.key.addEventListener('backbutton',function() {
        plus.nativeUI.confirm('是否要退出？',function(event) {
          if(event.index) {
            plus.runtime.quit()
          }
        },null,['取消','确定'])
      })
    })
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
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
              position: relative;
              i{
                position: relative;
                color: #6c63ff;
                font-size: 0.32rem;
                font-weight: bold;
                top: -1px;
                margin-right: 5px;
              }
              .refresh-btn{
                  position: absolute;
                  right: 10px;
                  top: 65*0.4*0.02rem;
                  color: #6c63ff;
                  border: 1px solid #6c63ff;
                  height: 80*0.4*0.02rem;
                  line-height: 80*0.4*0.02rem;
                  padding: 0 20*0.4*0.02rem;
                  border-radius: 6px;
                  img{
                    max-width: 20px;
                    margin-right: 20*0.4*0.02rem;
                    vertical-align: middle;
                    margin-top: -8*0.4*0.02rem;
                  }
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
