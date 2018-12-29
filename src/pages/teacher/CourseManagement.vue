<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">课后习题</div>
    <!-- 主要内容 -->
    <div class="main-wrapper clearfix">
       <div class="left-side">
            <div class="search-box clearfix">
                <i class="iconfont icon-xuanzhong"></i>
                <input type="text" placeholder="搜索全部">
            </div>
            <ul class="main-menu">
                <li class="active">
                    <a href="">
                        <i class="iconfont icon-xin"></i>
                        <span>全部</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="iconfont icon-xin"></i>
                        <span>文档</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="iconfont icon-xin"></i>
                        <span>图片</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="iconfont icon-xin"></i>
                        <span>视频</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="iconfont icon-xin"></i>
                        <span>音乐</span>
                    </a>
                </li>
            </ul>
       </div>
       <div class="right-main">
            <p class="main-title"> 
                <a href="" class="active upload-btn"><i class="iconfont icon-shangchuan1"></i>上传</a>
                <a href=""><i class="iconfont icon-shanchu"></i>删除</a>
            </p>
            <div class="main-info">
                <p class="info-title">全部</p>
                <table>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>修改时间<i></i></th>
                            <th>大小</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in 4" :key="item">
                            <td class="td-check">
                                <label class="choose"><input type="checkbox" name="" value="student"><span>√</span> </label>
                                <span>走进棱锥教学。ppt</span>
                            </td>
                            <td>
                                2018年12月16日 14：12
                            </td>
                            <td>12.6M</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tips-btn"><button class="sbtn">确认发送</button></div>
       </div>
    </div>
    <div class="tips" v-show="toggleTips">
        <div class="main-tips">
            <i class="iconfont icon-guanbi1" @click="HideTip"></i>
            <img class="tip-img" src="../../assets/images/teaupload.png" alt="send-success">
          <p class="tips-title">推送成功</p>
          <div class="tips-msg">
              <p>你已成功推送 <span>2</span>个文件！</p>
          </div>
          <div class="tips-btn"><button class="cbtn tbtn">好的</button></div>
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
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
import Axios from 'axios';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {
    toggleTips:false,
    tipsMsg:'推送成功',
    batch:'',
    list:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    HideTip(){
        this.toggleTips = false
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this;
    let params = {
        token:store.state.token
    }
    base.getUrl(API.allUrl.batch,params).then(res => {
        if(res.code == 200 && res.success ==  1) {
            self.batch = res.obj;
        }
        let params = {
            token:store.state.token,
            batch:res.obj
        }
        base.getUrl(API.allUrl.courseList,params).then((res) => {
            console.log(res)
            if(res.code == 200 && res.success == 1) {
                this.list = res.obj;
            }
        })
    })
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
@fcolor:#5c5a5a;
.main-wrapper{
    height: 100%;
    width: 100%;
    .left-side{
        float: left;
        width: 15.9%;
        height: 100%;
        background-color: #f4f4f4;
        .search-box{
            margin: 160*0.4*0.02rem 30*0.04*0.02rem 16*0.4*0.02rem 40*0.4*0.02rem;
            width: 79.7%;
            height: 80*0.4*0.02rem;
            line-height: 80*0.4*0.02rem;
            background-color: #e8e8e8;
            border-radius: 4px;
            i{
                float: left;
                width: 30%;
                font-size: 0.36rem;
                color: @fcolor;
                text-align: center;
            }
            input{
                float: left;
                width: 70%;
                border: none;
                outline: none;
                padding: 0 10*0.4*0.02rem;
                background-color: transparent;
                color: @fcolor;
                font-size: 34*0.02*0.4rem;
                height: 80*0.4*0.02rem;
                line-height: 80*0.4*0.02rem;
            }
        }
        .main-menu{
            text-indent: 60*0.4*0.02rem;
            li{
                height: 135*0.4*0.02rem;
                line-height: 135*0.4*0.02rem;
                a{
                    color: @fcolor;
                    font-size: 34*0.4*0.02rem;
                    i{
                        color: @fcolor;
                        font-size: 0.36rem;
                        margin-right: 10*0.4*0.02rem;
                    }
                }
                &.active{
                    a{
                        color: #6c63ff;
                        i{
                            color: #6c63ff;
                        }
                    }
                }
            }
        }
    }
    .right-main{
        float: left;
        width: 84.1%;
        height: 100%;
        .main-title{
            height: 160*0.4*0.02rem;
            border: 1px solid #dbdbdb;
            a{
                display: inline-block;
                width: 190*0.4*0.02rem;
                height: 85*0.4*0.02rem;
                line-height: 85*0.4*0.02rem;
                border-radius: 4px;
                background-color: #a2a5a7;
                color: #ffffff;
                font-size: 34*0.4*0.02rem;
                text-align: center;
                margin-top: 50*0.4*0.02rem;
                margin-left: 50*0.4*0.02rem;
                &.upload-btn{
                    margin-left: 105*0.02*0.4rem;
                }
                i{
                    color: #ffffff;
                    font-size: 46*0.4*0.02rem;
                    margin-right: 8*0.4*0.02rem;
                }
                &.active{
                    background-color: #6c63ff;
                }
            }
        }
        .main-info{
            width: 100%;
            padding: 0 110*0.4*0.02rem;
            .info-title{
                color: @fcolor;
                font-size: 0.28rem;
                text-indent: 15*0.4*0.02rem;
            }
            table{
                width: 100%;
                font-size: 34*0.4*0.02rem;
                thead{
                    tr{
                        height: 135*0.4*0.02rem;
                        line-height: 135*0.4*0.02rem;
                        th{
                            font-weight: normal;

                        }
                    }
                }
                tbody{
                    text-align: center;
                    tr{
                        height: 98*0.4*0.02rem;
                        line-height: 98*0.4*0.02rem;
                        text-align: center;
                        color: @fcolor;
                        font-size: 34*0.4*0.02rem;
                        border-bottom: 1px solid #dbdbdb;
                        .td-check{
                            .choose{
                                display: inline-block;
                                vertical-align: middle;
                                font-size: 34*0.4*0.02rem;
                                cursor: pointer;
                                input[type="checkbox"] {
                                    appearance: none;
                                    -webkit-appearance: none;
                                    outline: none;
                                    display: none
                                }
                                span{
                                    vertical-align: middle;
                                    font-size: 12px!important;
                                    color: #ffffff;
                                    margin-right: 30*0.4*0.02rem;
                                }
            
                                input[type="checkbox"]+span {
                                    display: inline-block;
                                    width: 40*0.4*0.02rem;
                                    height: 40*0.4*0.02rem;
                                    line-height: 40*0.4*0.02rem;
                                    background-color: transparent;
                                    border: 1px solid #dddddd;
                                    
                                }
                                input[type="checkbox"]:checked+span {
                                    background-color: #ffffff;
                                    color: #6c63ff;
                                }
            
                            }
                        }
                    }
                }
            }
        }
        .tips-btn{
            width: 100%;
            margin: 0.6rem auto 0;
            text-align: center;
            .sbtn{
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
    }
}

.tips{
    position: absolute;
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