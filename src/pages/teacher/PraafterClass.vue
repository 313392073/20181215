<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
  <div class="left-box">
    <div class="desc-menu">课后练习</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">推送教学课件</h3>
        <div class="main-box">
            <div class="upload-box">
                <p class="icon-upload"><i class="iconfont icon-shangchuan"></i></p>
                <p class="upload-desc">选择需要上传的课件,支持PDF,PPTX,DOCX,JPG,MP4等常见文档 图片 视频格式</p>
                <div class="next-btn"><button class="nbtn">浏览文件</button></div>
            </div>
            <div class="item clearfix" v-for="item in 3" :key="item">
                <div class="item-icon"><img src="../../assets/images/group-pic.png" alt="group-pic"></div>
                <div class="item-desc">
                    <p class="item-name">选择需要上传的课件</p>
                    <p class="item-process">6.5/12.8M <span class="item-num">258K/S</span></p>
                    <div class="process"><p class="pro-num"></p></div>
                </div>
                <div class="item-tag"><i class="iconfont icon-xuanzhong"></i></div>
            </div>
            <div class="back-btn"><button class="btn">下一步</button></div>
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
        height: 106*0.4*0.02rem;
        line-height: 106*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 73.67%;
        margin: 0 auto 70*0.4*0.02rem; 
        .upload-box{
            width: 1030*0.4*0.02rem;
            margin: 0 auto;
            height: 522*0.4*0.02rem;
            border: 1px dashed #c3d2d9;
            border-radius: 12px;
            box-shadow: 0 0 5px 3px rgba(0,0,0,0.1);
            padding: 0 110*0.4*0.02rem 50*0.4*0.02rem;
            font-size: 34*0.4*0.02rem;
            color: @fcolor;
            .icon-upload{
                text-align: center;
                i{
                    font-size: 140*0.4*0.02rem;
                    color: #6c63ff;
                }
            }
            .upload-desc{
                line-height: 60*0.4*0.02rem;
            }
            .next-btn{
                width: 100%;
                margin: 55*0.4*0.02rem auto 0;
                text-align: center;
                .nbtn{
                    display: block;
                    width: 345*0.4*0.02rem;
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
        .item{
            width: 100%;
            height: 200*0.4*0.02rem;
            box-shadow: 0 0 3px 1px rgba(0,0,0,0.1);
            padding: 45*0.4*0.02rem 55*0.4*0.02rem;
            margin-top: 40*0.4*0.02rem;
            .item-icon{
                float: left;
                width: 114*0.4*0.02rem;
                height: 114*0.4*0.02rem;
                margin-right: 30*0.4*0.02rem;
                img{
                    max-width: 100%;
                    height: 100%;
                }
            }
            .item-desc{
                float: left;
                width: calc(~"100% - 280*0.4*0.02rem");
                .item-name{
                    font-size: 34*0.4*0.02rem;
                }
                .item-process{
                    position: relative;
                    font-size: 30*0.4*0.02rem;
                    color: #c3d2d9;
                    .item-num{
                        position: absolute;
                        right: 0;
                    }
                }
                .process{
                    width: 100%;
                    height: 20*0.4*0.02rem;
                    border-radius: 20*0.4*0.02rem;
                    background-color: #c3d2d9;
                    position: relative;
                    .pro-num{
                        position: absolute;
                        width: 20%;
                        height: 100%;
                        border-radius: 20*0.4*0.02rem;
                        background-color: #f34e19;
                        &.pro-blue{
                            background-color: #3a80fc;
                        }
                    }
                }
            }
           .item-tag{
               float: right;
               width: 120*0.4*0.02rem;
               height: 120*0.4*0.02rem;
               text-align: center;
               i{
                   font-size: 75*0.4*0.02rem;
                   color: #bf3232;
               }
           }
        }
        .back-btn{
            width: 100%;
            margin: 55*0.4*0.02rem auto 0;
            text-align: center;
            .btn{
                display: block;
                width: 345*0.4*0.02rem;
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
</style>