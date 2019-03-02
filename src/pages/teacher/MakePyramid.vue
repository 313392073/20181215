<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
 <div class="left-box">
    <div class="desc-menu">制作棱锥<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">任务详情</h3>
        <div class="main-box">
            <div class="info-box">
                <div class="info-left clearfix" v-for="(item,index) in questList" :key="index+10">
                    <div class="desc">
                        <span>题目{{index+1}}</span>：
                        <!-- 有info -->
                        <p class="info-list" v-if="JSON.parse(item.course_item).info && JSON.parse(item.course_item).info.length>0" v-for="(info,infoindex) in JSON.parse(item.course_item).info" :key="infoindex+70">
                            {{info}}
                        </p>
                        <!-- 题目q -->
                        <span class="info-list" v-if="JSON.parse(item.course_item).q" v-for="(req,rindex) in JSON.parse(item.course_item).q" :key="rindex+30">{{req}}</span>
                        <!-- bmj -->
                        <p class="bmj info-list" v-if="JSON.parse(item.course_item).bmj" v-for="(breq,bindex) in JSON.parse(item.course_item).bmj" :key="bindex+50">{{breq}}</p>
                        <!-- 体积  -->
                        <p class="tj info-list" v-if="JSON.parse(item.course_item).tj" v-for="(treq,tindex) in JSON.parse(item.course_item).tj" :key="tindex">{{treq}}</p>

                        <!-- 公式  -->
                        <p class="gs gs-box" :class="getChangeClass" v-if="JSON.parse(item.course_item).gs" v-for="(greq,gindex) in JSON.parse(item.course_item).gs" :key="gindex+80">
                            <span class="gs-box" v-html="greq"></span>
                        </p>
                    </div>
                    <div class="info-right">
                        <img :src="item.course_pic_path?item.course_pic_path:''" alt="">
                    </div>
                </div>              
            </div>
            <h3 class="title">任务分组</h3>
            <div class="info-group clearfix">
                <div class="item" v-for="(item,index) in groupList" :key="index">
                    <p class="item-title">{{orderd(index)}}组</p>
                    <div class="item-member clearfix">
                        <div v-if="item" class="tips-item" v-for="(subitem,subIndex) in item" :key="subIndex">
                            <img :src="subitem.userHeadImage"  :alt="item.userName">
                            <p>{{item.userName}}</p>
                        </div>
                    </div>
                    <div class="item-add" @click="showAddList(index)"></div>
                </div>
            </div>
            <div class="back-btn" v-if="isInArray"><button class="btn" @click="setTask">任务布置</button></div>
        </div>
        <div class="tips-wrapper" v-show="isaddList">
            <div class="tips-box">
                <p class="tips-title">组员管理<i class="iconfont icon-guanbi1" @click="hideAddList"></i></p>
                <div class="tips-main clearfix">
                    <div class="tips-item" v-for="(item,index) in chooseList" :key="index">
                        <div v-if="item['cgroupId'] == checkUsers.order" @click="removeUser(index,checkUsers.order)">
                            <i class="iconfont icon-close_icon" ></i>
                            <img :src="item.userHeadImage" :alt="item.userName">
                            <p>{{item.userName}}</p>
                            <p style="color:red;">移除</p>
                        </div>
                        <div v-else @click="addUser(item['gorder'],checkUsers.order)">
                            <img :src="item.userHeadImage" :alt="item.userName">
                            <p>{{item.userName}}</p>
                            <p style="color:#6c63ff;">加入</p>
                        </div>
                        
                    </div>
                </div>
                <div class="tips-btns">
                    <a href="javascript:void(0)" @click="emptyList">清空选择</a>
                    <a href="javascript:void(0)" @click="hideAddList">确定选择</a>
                </div>
            </div>
        </div>
    </div>
    <div class="tips" v-show="toggleTips">
        <div class="main-tips">
            <i class="iconfont icon-guanbi1" @click="HideTip"></i>
            <img class="tip-img" src="../../assets/images/teaupload.png" alt="send-success">
          <p class="tips-title">温馨提示</p>
          <div class="tips-msg">
              {{tipsMsg}}
          </div>
          <div class="tips-btn"><button class="cbtn tbtn" @click="HideTip">好的</button></div>
        </div>
    </div>
  </div>
  </div>
<side-bar></side-bar>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import SideBar from "@/common/SideBar";
import share from "../../router/http/share.js";
import base from "../../router/http/base.js";
import API from "../../router/http/api.js";
import store from "../../store/store.js";
import Axios from 'axios';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { SideBar },
  inject:['reload'],
  data() {
    //这里存放数据
    return {
        questList:[],
        toggleTips:false,
        tipsMsg:'',
        isaddList:false,
        userList: [],
        checkUsers:{
            list:[],
            order:''
        },
        unCheckUsers:[],
        isInArray:false
    };
  },
  //监听属性 类似于data概念
  computed: {
      groupList(){
            let flag = 0;
            let arr = [];        
            for(var i = 0; i< this.userList.length; i++) {
                var az = '';
                for (var j = 0; j < arr.length; j++) {
                    if(arr[j][0].groupId == this.userList[i].groupId) {
                        flag = 1;
                        az = j;
                        break;
                    }
                }
                if(flag == 1){
                    arr[az].push(this.userList[i]);
                    flag = 0;
                } else if (flag == 0) {
                    let brr = new Array();
                    brr.push(this.userList[i]);
                    arr.push(brr);
                }
            }
            let len = 4;
            let list = [];
            for(var i=0;i<len;i++){
                list[i] = [];
                list[i] = arr[i]?arr[i]:[]
            }
            list.forEach((item,index) => {
                if(item){
                    for(var k=0;k<item.length;k++){
                        list[index][k]['cgroupId'] = index;
                    }
                }
            })
            return list;
      },
      chooseList(){
          return this.checkUsers.list.concat(this.unCheckUsers)
      }
  },
  //监控data中的数据变化
  watch: {
  },
  //方法集合
  methods: {
      orderd(num) {
          return share.order[num] 
      },
      getrefresh(){
        this.reload();
      },
      setTask(){
          if(this.unCheckUsers.length > 0){
               this.tipsMsg = '请将组员分配完成'
               this.toggleTips = true
               return false;
          }
          let list = [];
          this.groupList.forEach((item,index) => {
              for(var i=0;i<item.length;i++){
                  let obj = {};
                  obj['userLoginname'] = '';
                  obj['groupId'] = index;
                  obj['userLoginname'] = item[i]['userLoginname'];
                  list.push(obj)
              }
          })
          Axios({
              method:'POST',
              baseURL:base.baseURL,
              url:API.allUrl.taskSubmit+"?token="+store.state.token,
              data:list
          }).then((res) => {
               this.tipsMsg = '分组完成'
               this.toggleTips = true
          })
         
      },
      HideTip(){
            this.tipsMsg = ''
            this.toggleTips = false
      },
      changeState(){
           var arr = this.unCheckUsers;
           for(var i=0;i<arr.length;i++){
               arr[i]['cgroupId'] = 'uncheck';
               arr[i]['gorder'] = i;
            }
          return arr
      },
      emptyList(){
          this.checkUsers.list.forEach((item,index) => {
            this.unCheckUsers.push(item);
          })
          this.checkUsers.list.splice(0,this.checkUsers.list.length);
          this.checkUsers.order = '';
          this.changeState()
      },
      hideAddList(){
        this.isaddList = false;
      },
      showAddList(index){
          this.checkUsers.list = this.groupList[index]?this.groupList[index]:[];
          this.checkUsers.order = index;
          this.isaddList = true;
      },
      removeUser(index,pindex){
          /**pindex 所在组的序号  index 当前组的第几个 */
          this.unCheckUsers.push(this.checkUsers.list[index])
          this.checkUsers.list.splice(index,1);
          this.changeState()
      },
      addUser(index,pindex){
          /**index 没被选中的第几个 pindex  当前点击的第几个 */
          this.unCheckUsers[index]['cgroupId'] = pindex;
          this.checkUsers.list.push(this.unCheckUsers[index]);
          this.unCheckUsers.splice(index,1);
          this.changeState()
      },
      getUserList(params){
        base.getUrl(API.allUrl.userList, params).then(res => {
            console.log(res);
            if (res.code == 200 && res.success == 1) {
                this.userList = res.obj;
            }
      });
      },
      getCourseList(params){ //获取题型
        base.getUrl(API.allUrl.course_list,params).then(res => {
            if(res.code == 200 && res.success == 1){
                res.obj.forEach((item,index) => {
                  this.questList.push(item)
                })
            }else{
                self.tipsMsg = '网络错误，请稍后再试'
                self.toggleTips = true;
                return false;
            }
        })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let self = this;
    let params = {
      token: store.state.token
    };
    base.getUrl(API.allUrl.batch, params).then(res => {
      if (res.code == 200 && res.success == 1) {
        self.batch = res.obj;
      }
      let params1 = {
        token: store.state.token,
        batch: res.obj
      };
      let params2 = {
          token: store.state.token,
          batch: res.obj,
          type:1
      }
      console.log(params)
      Axios.all([self.getUserList(params1)],self.getCourseList(params2))
    });
    let num = 3
    base.getMenuStep().then((res) => {
        self.isInArray = base.arrContain(res,num)
    })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
        this.$nextTick(() => {
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('gs-box')]);
        })
    },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@fcolor: #5c5a5a;
.left-box {
  height: 100%;
  height: 100%;
  .title {
    height: 160 * 0.4 * 0.02rem;
    line-height: 160 * 0.4 * 0.02rem;
    text-align: center;
    font-size: 44 * 0.4 * 0.02rem;
    color: @fcolor;
  }
  .main-box {
    width: 90.78%;
    margin: 0 auto 70 * 0.4 * 0.02rem;
    .info-box {
      width: 100%;
      .info-left {
          width: 100%;
        .desc{
            float: left;
            width: 60%;
             margin-right: 3%;
        }
        .info-right {
            float: right;
            width: 37%;
            padding-top: 0.1rem;
            img {
            width: 100%;
            height: auto;
            }
        }
        p {
          font-size: 0.26rem;
          color: @fcolor;
          line-height: 0.52rem;
        }
      }
      
    }
    
    .info-group {
      width: 100%;
      margin: 0.3rem auto;
      .item {
        float: left;
        width: 23.5%;
        margin-right: 2%;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        position: relative;
        padding-bottom: 0.7rem;
        &:last-child {
          margin-right: 0;
        }
        .item-title {
          font-size: 44 * 0.4 * 0.02rem;
          color: #333333;
          line-height: 80 * 0.4 * 0.02rem;
          height: 80 * 0.4 * 0.02rem;
          text-align: center;
        }
        .item-member {
          min-height: 1.5rem;
          overflow: hidden;
          .tips-item {
            float: left;
            width: 25%;
            margin-bottom: 20 * 0.4 * 0.02rem;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-webkit: line clamp 1;
            -moz-webkit: line clamp 1;
            -ms-webkit: line clamp 1;
            -o-webkit: line clamp 1;
            webkit: line clamp 1;
            display: -moz-box;
            display: block;
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            img {
              width: 80 * 0.4 * 0.02rem;
              height: 80 * 0.4 * 0.02rem;
              border-radius: 50%;
            }
            p {
              font-size: 28 * 0.4 * 0.02rem;
              color: @fcolor;
            }
          }
        }
        .item-add {
          height: 95 * 0.4 * 0.02rem;
          width: 95 * 0.4 * 0.02rem;
          position: absolute;
          bottom: 0.05rem;
          left: 50%;
          margin-left: -95 * 0.4 * 0.01rem;
          border-radius: 50%;
          background: url("../../assets/images/add-meb.png") no-repeat center;
          background-size: contain;
        }
      }
    }
    .back-btn {
      width: 100%;
      margin: 0.4rem auto 0.6rem;
      text-align: center;
      .btn {
        display: block;
        width: 340 * 0.4 * 0.02rem;
        height: 95 * 0.4 * 0.02rem;
        margin: 0 auto;
        line-height: 95 * 0.4 * 0.02rem;
        background-color: #6c63ff;
        color: #ffffff;
        font-size: 35 * 0.4 * 0.02rem;
        border-radius: 30px;
        border: none;
        outline: none;
      }
    }
  }
}
.tips-wrapper {
  position: absolute;
  z-index: 888;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  .tips-box {
    width: 9rem;
    min-height: 685 * 0.4 * 0.02rem;
    background-color: #ffffff;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    margin: 30% auto;
    padding-bottom: 155 * 0.4 * 0.02rem;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    .tips-title {
      text-align: center;
      height: 112 * 0.4 * 0.02rem;
      line-height: 112 * 0.4 * 0.02rem;
      background-color: #6c63ff;
      color: #ffffff;
      font-size: 40 * 0.4 * 0.02rem;
      position: relative;
      i {
        position: absolute;
        top: 0;
        right: 60 * 0.4 * 0.02rem;
        font-size: 45 * 0.4 * 0.02rem;
      }
    }
    .tips-main {
      min-height: 460 * 0.4 * 0.02rem;
      padding: 40 * 0.4 * 0.02rem 40 * 0.4 * 0.02rem 155 * 0.4 * 0.02rem;
      overflow: hidden;
      .tips-item {
        float: left;
        width: 174 * 0.4 * 0.02rem;
        margin: 10 * 0.4 * 0.02rem 0;
        text-align: center;
        position: relative;
        i {
          position: absolute;
          right: 30 * 0.4 * 0.02rem;
          font-size: 30 * 0.4 * 0.02rem;
          color: #6c63ff;
        }
        img {
          width: 100 * 0.4 * 0.02rem;
          height: 100 * 0.4 * 0.02rem;
          border-radius: 50%;
        }
        p {
          font-size: 30 * 0.4 * 0.02rem;
        }
      }
    }

    .tips-btns {
      height: 155 * 0.4 * 0.02rem;
      line-height: 455 * 0.4 * 0.02rem;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      a {
        float: left;
        width: 340 * 0.4 * 0.02rem;
        height: 95 * 0.4 * 0.02rem;
        line-height: 95 * 0.4 * 0.02rem;
        background-color: #6c63ff;
        color: #ffffff;
        border-radius: 95 * 0.4 * 0.02rem;
        text-align: center;
        margin-left: 175 * 0.4 * 0.02rem;
        margin-top: 30 * 0.4 * 0.02rem;
        font-size: 30 * 0.4 * 0.02rem;
      }
    }
  }
  &.active {
    z-index: 999;
    opacity: 1;
  }
}
.tips{
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
   .main-tips{
        width: 1240*0.02*0.4rem;
        height: 830*0.4*0.02rem;
        background-color: #ffffff;
        background: url("../../assets/images/send-tipbg.jpg") no-repeat center;
        background-size: contain;
        box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
        text-align: center;
        padding-top: 20*0.4*0.02rem;
        position: relative;
        &>i{
            position: absolute;
            width: 80*0.4*0.02rem;
            height: 80*0.4*0.02rem;
            top: 60*0.4*0.02rem;
            right: 60*0.4*0.02rem;
            font-size: 0.4rem;
            color: #8e8e8e;
            border-radius: 50%;
            box-shadow: 0 0 2px 2px rgba(0, 0, 0,0.2);
            padding: 3px;
            cursor: pointer;
        }
        .tip-img{
            margin-top: 30*0.4*0.02rem;
            max-width: 2.5rem;
        }
        .tips-title{
            text-align: center;
            color: #f32d2d;
            font-size: 0.36rem;
            margin: 0.4rem auto;
        }
        .tips-msg{
            font-size: 0.24rem;
            color: @fcolor;
            line-height: 26*0.02rem;
        }
    }
    .tips-btn{
        width: 100%;
        margin: 0.6rem auto 0;
        text-align: center;
        .tbtn{
            display: block;
            width: 320*0.4*0.02rem;
            height: 90*0.4*0.02rem;
            margin: 0 auto;
            line-height: 90*0.4*0.02rem;
            background-color: #6c63ff;
            color: #ffffff;
            font-size: 0.36rem;
            border-radius: 90*0.4*0.02rem;
            border: none;
            outline: none;
        }
    }
    &.active{
        z-index: 999;
        opacity: 1;
    }
}
</style>