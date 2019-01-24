<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
 <div class="left-box">
    <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>课堂学习</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">课堂练习成绩报告单<a class="refresh-btn" href="javascript:void(0)"><img @click="getrefresh" src="../../assets/images/refresh.png" alt="refresh.png"></a></h3>
        <div class="main-box">
            <p class="main-title">成绩排行榜</p>
            <div class="tab-box clearfix">
                <div class="greed-tab">
                    <table>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>分数</th>
                                <th>答题用时</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in 7" :key="item">
                                <td><i class="iconfont icon-huizhang"></i><img src="../../assets/images/default.png" class="head-pic" alt="default"><span>流星雨</span></td>
                                <td>100分</td>
                                <td class="use-time">09分45秒</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="greed-tab right-tab">
                    <table>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>分数</th>
                                <th>答题用时</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in 7" :key="item">
                                <td><i>{{index+1}}</i><img src="../../assets/images/default.png" class="head-pic" alt="default"><span>流星雨</span></td>
                                <td>100分</td>
                                <td class="use-time">09分45秒</td>
                            </tr>
                        </tbody>
                    </table>
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
inject:['reload'],
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    
},
//方法集合
methods: {
     getrefresh(){
        this.reload();
    },
    goBack(){
        this.$router.go(-1)
    },

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
        width: 90.78%;
        margin: 0 auto 70*0.4*0.02rem;
        height: 1150*0.4*0.02rem; 
        box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
        .main-title{
            font-size: 34*0.02*0.4rem;
            color: @fcolor;
            height: 105*0.4*0.02rem;
            line-height: 105*0.4*0.02rem;
            text-indent: 85*0.4*0.02rem;
        }
        .tab-box{
            width: 100%;
            padding: 0 95*0.4*0.02rem;
            .greed-tab{
                float: left;
                width: calc(~"50% - 0.22rem");
                margin-right: 55*0.4*0.02rem;
                &.right-tab{
                    margin-right: 0;
                }
                table{
                    width: 100%;
                    thead{
                        tr{
                            line-height: 68*0.4*0.02rem;
                            height: 68*0.4*0.04rem;
                            color: @fcolor;
                            font-size: 34*0.4*0.02rem;
                            th{
                                border: 1px solid #f5f4f2;
                            }
                        }
                    }
                    tbody{
                        tr{
                            height: 100*0.4*0.02rem;
                            line-height: 100*0.4*0.02rem;
                            td{
                                border: 1px solid #f5f4f2;
                                text-align: center;
                                font-size: 34*0.4*0.02rem;
                                .head-pic{
                                    width: 85*0.4*0.02rem;
                                    height: 85*0.4*0.02rem;
                                    margin: 0 30*0.02*0.4rem;
                                    
                                }
                                i{
                                    display: inline-block;
                                    width: 60*0.4*0.02rem;
                                    height: 60*0.4*0.02rem;
                                    line-height: 60*0.4*0.02rem;
                                    font-size: 36*0.4*0.02rem;
                                    color: #fb0f1c;
                                    vertical-align: middle;
                                    border-radius: 50%;
                                    background-color: #fc8628;
                                    color: #ffffff; 
                                }
                                &.use-time{
                                    color: #6c63ff;
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