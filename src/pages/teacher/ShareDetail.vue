<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">作业分享</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <div class="main-box">
            <div class="desc-box clearfix">
                <div class="desc-left">
                    <img src="../../assets/images/default.png" alt="default">
                    <p class="desc-name">流星雨</p>
                </div>
                <div class="desc-right">
                    <p class="desc-detail">现实生活中的棱锥有：金字塔、三脚架、脚手架、某些特别的建筑物的锥形顶、正方体的
                        一角、自行车反光镜的锥形突出、幸运星的一半等等；
                        古代有锥形漏斗和锥形容器、量器。
                    </p>
                    <div class="desc-images clearfix">
                        <img src="../../assets/images/group-pic.png" alt="group-pic">
                        <img src="../../assets/images/group-pic.png" alt="group-pic">
                        <img src="../../assets/images/group-pic.png" alt="group-pic">
                        <img src="../../assets/images/group-pic.png" alt="group-pic">
                        <img src="../../assets/images/group-pic.png" alt="group-pic">
                    </div>
                    <div class="desc-btns">
                        <a href=""><i class="iconfont icon-xin"></i>赞</a>
                        <a href=""><i class="iconfont icon-guanbi"></i>评论</a>
                    </div>
                </div>
            </div>
            <div class="detail-box">
                <div class="zan-box">
                    <div class="icon-box clearfix">
                        <p class="left-icon"><i class="iconfont icon-xin"></i></p>
                        <div class="zan-wrapper">
                            <img src="../../assets/images/default.png" alt="default">
                            <img src="../../assets/images/default.png" alt="default">
                            <img src="../../assets/images/default.png" alt="default">
                        </div>
                    </div>
                </div>
                <div class="comment-box">
                    <div class="icon-box clearfix">
                        <p class="left-icon"><i class="iconfont icon-xin"></i></p>
                        <div class="comment-wrapper">
                            <div class="list clearfix">
                                <div class="left-icon">
                                    <img src="../../assets/images/default.png" alt="default">
                                    <p class="comment-name">叶小雨</p>
                                </div>
                                <p class="comment-detail">回复 <span>叶小雨：</span> 很不错的分享，学习了！</p>
                            </div>
                            <div class="list clearfix" v-for="item in 3" :key="item">
                                <div class="left-icon">
                                     <img src="../../assets/images/default.png" alt="default">
                                     <p class="comment-name">叶小雨</p>
                                </div>
                                <p class="comment-detail">很不错的分享，学习了！</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="input-box clearfix">
                    <input type="text" placeholder="评论">
                    <a href="javascript:void(0)"><i class="iconfont icon-xiaolian"></i></a>
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
    .main-box{
        width: 100%;
        margin: 0 auto 70*0.4*0.02rem;
        padding-right:1.84%;
        padding-left: 5.53%;
        .desc-box{
            padding: 60*0.4*0.02rem 0 0;
            .desc-left{
                float: left;
                width: 7.14%;
                text-align: center;
                font-size: 34*0.4*0.02rem;
                color: @fcolor;
                img{
                    width: 124*0.4*0.02rem;
                    height: 124*0.4*0.02rem;
                }
            }
            .desc-right{
                float: left;
                width: 92.86%;
                padding-left: 32*0.4*0.02rem;
                .desc-detail{
                    font-size: 38*0.4*0.02rem;
                    line-height: 70*0.4*0.02rem;
                    color: #676767;
                }
                .desc-images{
                    img{
                        float: left;
                        width: 18.4%;
                        margin-right: 2%;
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                }
                .desc-btns{
                    text-align: right;
                    height: 104*0.4*0.02rem;
                    line-height: 104*0.4*0.02rem;
                    a{
                        font-size: 38*0.4*0.02rem;
                        color: #6c63ff;
                        margin-left: 100*0.4*0.02rem;
                        i{
                            font-size: 44*0.4*0.02rem;
                            margin-right: 10*0.4*0.02rem;
                        }
                    }
                }
            }
        }
        .detail-box{
            width: 100%;
            padding-left: 3.45%;
            .zan-box{
                min-height: 100*0.4*0.02rem;
                line-height: 100*0.4*0.02rem;
                background-color: #f5f5f5;
                margin-bottom: 2px;
                .left-icon{
                    float: left;
                    width: 2.5%;
                    text-align: center;
                    margin-right: 1.3%;
                }
                .zan-wrapper{
                    float: left;
                    width: 96.2%;
                    img{
                        width: 80*0.4*0.02rem;
                        height: 80*0.4*0.02rem;
                        margin-right: 10*0.4*0.02rem;
                    }
                }
            }
            .comment-box{
                min-height: 100*0.4*0.02rem;
                line-height: 100*0.4*0.02rem;
                background-color: #f5f5f5;
                .left-icon{
                    float: left;
                    width: 2.5%;
                    text-align: center;
                    margin-right: 1.3%;
                }
                .comment-wrapper{
                    float: left;
                    width: 96.2%;
                    padding-bottom: 15*0.4*0.02rem;
                    .list{
                        height: 135*0.4*0.02rem;
                        border-bottom: 1px solid #ecebeb;
                        &:last-child{
                            border-bottom: none;
                        }
                        .left-icon{
                            float: left;
                            width: 5.5%;
                            text-align: center;
                            margin-right: 1.3%;
                            img{
                                width: 80*0.4*0.02rem;
                                height: 80*0.4*0.02rem;
                            }
                            .comment-name{
                                line-height: 15px;
                                font-size: 26*0.4*0.02rem;
                                color: #6c63ff;
                            }
                        }
                        .comment-detail{
                            float: left;
                            width: 90%;
                            height: 135*0.4*0.02rem;
                            line-height: 135*0.4*0.02rem;
                            font-size: 35*0.4*0.02rem;
                            color: #3a3a3a;
                            span{
                                color: #6c63ff;
                            }
                        }
                    }
                    
                }
                
            }
            .input-box{
                margin: 20*0.4*0.02rem 0;
                input{
                    float: left;
                    min-height: 60*0.4*0.02rem;
                    line-height: 60*0.4*0.02rem;
                    width: calc(~"100% - 75*0.4*0.02rem");
                    border-radius: 4px;
                    border: 1px solid #cfcccc;
                    padding: 0 15*0.4*0.02rem;
                    color: #989898;
                    font-size: 34*0.4*0.02rem;
                }
                a{
                    float: left;
                    width: 75*0.4*0.02rem;
                    text-align: center;
                    min-height: 60*0.4*0.02rem;
                    line-height: 60*0.4*0.02rem;
                    color: #989898;
                    i{
                        font-size: 48*0.4*0.02rem;
                    }
                   
                }
            }
        }
    }
}
</style>