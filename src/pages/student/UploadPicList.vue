<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">寻找棱锥</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
         <h3 class="title">视频上传列表</h3>
        <div class="main-box">
            <div class="group-wrapper clearfix">
                <div class="item" v-for="item in 4" :key="item">
                    <p class="group-name">A组</p>
                    <div class="sub-item clearfix" v-for="subitem in 4" :key="subitem">
                        <div class="left-img">
                            <img src="../../assets/images/group-pic.png" alt="">
                        </div>
                        <div class="right-desc">
                            <div class="header-box"><img src="../../assets/images/default.png" alt="" srcset=""></div>
                            <p class="desc-name">流星雨</p>
                            <div class="go-detail">
                                <span><i class="iconfont icon-xin"></i> 45</span>
                            </div>
                        </div>
                    </div>
                    <div class="desc">共获得 <span>47</span>个赞</div>
                </div>
            </div>
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
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

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
@fcolor:#5c5a5a;
.left-box{
    height: 100%;
    width: 100%;
    .title{
        height: 160*0.4*0.02rem;
        line-height: 160*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 92.165%;
        margin: 0 auto 70*0.4*0.02rem;
        .group-wrapper{
            padding-top: 80*0.4*0.02rem;
            width: 100%;
            .item{
                float: left;
                width: calc(~"23.5% - 2px");
                margin-right: 2%;
                border: 1px solid #6c63ff;
                box-shadow: 0 0 5px 3px rgba(0,0, 0,0.1);
                padding: 100*0.4*0.02rem 20*0.4*0.02rem 20*0.4*0.02rem;
                position: relative;
                .desc{
                    text-align: center;
                    span{
                        font-size: 40*0.4*0.02rem;
                        color: #6c63ff;
                    }
                }
                .group-name{
                    position: absolute;
                    top: -75*0.4*0.02rem;
                    left: 50%;
                    margin-left: -75*0.4*0.02rem;
                    width: 150*0.4*0.02rem;
                    height: 150*0.4*0.02rem;
                    line-height: 150*0.4*0.02rem;
                    text-align: center;
                    font-size: 42*0.4*0.02rem;
                    color: #6c63ff;
                    border-radius: 50%;
                    border: 1px solid #6c63ff;
                    background-color: #ffffff;
                }
                &:nth-child(2){
                    border-color: #39cc6c;
                    p{
                        color: #39cc6c;
                        border-color: #39cc6c;
                    }
                    .desc{
                        span{
                            color: #39cc6c;
                        }
                    }
                }
                &:nth-child(3){
                    border-color: #eb1e1e;
                    p{
                        color: #eb1e1e;
                        border-color: #eb1e1e;
                    }
                    .desc{
                        span{
                            color: #eb1e1e;
                        }
                    }
                }
                &:last-child{
                    border-color: #f37d7d;
                    margin-right: 0;
                    p{
                        color: #f37d7d;
                        border-color: #f37d7d;
                    }
                    .desc{
                        span{
                            color: #f37d7d;
                        }
                    }
                }
                .sub-item{
                    width: 100%;
                    border: 1px solid #dddddd;
                    border-radius: 4px;
                    min-height: 200*0.4*0.02rem;
                    margin-bottom: 20*0.4*0.02rem;
                    .left-img{
                        padding: 10*0.4*0.02rem;
                        float: left;
                        border-right: 1px solid #dddddd;
                        width: calc(~"60% - 1px");
                        img{
                            min-height: 180*0.4*0.02rem;
                        }
                    }
                    .right-desc{
                        float: right;
                        width: 40%;
                        text-align: center;
                        padding: 10*0.4*0.02rem;
                        .header-box{
                            img{
                                width: 60*0.4*0.02rem;
                                height: 60*0.4*0.02rem;
                            }
                        }
                        .desc-name{
                            font-size: 12px!important;
                            color: @fcolor;
                            margin: 10*0.4*0.02rem auto;
                        }
                        .go-detail{
                            text-align: center;
                            span{
                                i{
                                    color: #fc4d3e;
                                    font-size: 34*0.4*0.02rem;
                                    margin-right: 5*0.4*0.02rem;
                                }
                            }
                        }
                    }
                }
                
            }
        }
    }
}
</style>