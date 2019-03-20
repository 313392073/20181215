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
 
    document.addEventListener('plusready', function() {
        plus.key.addEventListener('backbutton', function() {
          var webview = plus.webview.currentWebview();
            webview.canBack(function(e) {
                if(e.canBack) {
                    webview.back();             
                } else {
                    //webview.close(); //hide,quit
                    //plus.runtime.quit();
                    //首页返回键处理
                    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                    var first = null;
                    plus.key.addEventListener('backbutton', function() {
                        //首次按键，提示‘再按一次退出应用’
                        if (!first) {
                            first = new Date().getTime();
                            plus.nativeUI.toast( "再按一次退出应用");
                            setTimeout(function() {
                                first = null;
                            }, 1000);
                        } else {
                            if (new Date().getTime() - first < 1500) {
                                plus.runtime.quit();
                            }
                        }
                    }, false);
                }
            })
        });
    });


    // document.addEventListener('plusready',function() {
    //   let currentWebview = plus.webview.currentWebview(); 
    //   plus.key.addEventListener('backbutton',function() {
        
    //     plus.nativeUI.confirm('是否要退出？',function(event) {
    //       if(event.index >-1 ) {
    //          self.$router.push('/') 
    //       }else{
    //         self.$router.go(-1)
    //       }
    //     },null,['取消','确定'])
    //   })
    // })
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
     plusReady() {
        let self = this;
       let firstBack = 0;
       var handleBack = function() {
        //  获取当前窗口的WebviewObject对象
          let currentWebview = plus.webview.currentWebview();  
          // 获取应用显示栈顶的WebviewObject窗口对象
          let topWebview = plus.webview.getTopWebview();  
          let now = Date.now || function () {  
              return new Date().getTime();  
          }; 
          
          currentWebview.callback((evt) => {
            if(currentWebview.id === plus.runtime.appid) {
              if(!firstBack) {
                firstBack = now()
                plus.nativeUI.toast('再按一次退出应用')
                  setTimeout((function() {
                      firstBack = 0;
                  },2000))
              }else if(now() - firstBack < 2000) {
                plus.runtime.quit()
              }else{
                if(evt.canBack) {
                  self.$router.go(-1)
                }else{
                  currentWebview.close('auto')
                }
              }
            }
          })
       } 
       plus.key.addEventListener('backbutton', handleBack);
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
