<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">课堂学习</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">课堂学习测试结果统计报告</h3>
        <div class="main-box">
            <div class="mark-box">
                <p class="mark-title">学生成绩</p>
            </div>
            <div class="detail-box clearfix">
                <div class="detail-left">
                    <p class="main-title">班级正确率:</p>
                    <div class="right-box">
                        <div class="line-box clearfix">
                            <div class="line-item"></div>
                            <div class="line-item"></div>
                            <div class="line-item last-item"></div>
                        </div>
                        <p class="right-title">各小题正确率：</p>
                        <div class="detail-table clearfix">
                            <div class="table-left">
                                <table>
                                    <tr>
                                        <td class="td-title">题号</td>
                                        <td>1(1)</td>
                                        <td>1(2)</td>
                                        <td>2(1)</td>
                                        <td>2(2)</td>
                                        <td>2(3)</td>
                                    </tr>
                                    <tr>
                                        <td class="td-title">正确率</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                    </tr>
                                </table>
                                <p class="desc">表面积检测</p>
                            </div>
                            <div class="table-right">
                                <table>
                                    <tr>
                                        <td class="td-title">题号</td>
                                        <td>1(1)</td>
                                        <td>1(2)</td>
                                        <td>2(1)</td>
                                        <td>2(2)</td>
                                        <td>2(3)</td>
                                    </tr>
                                    <tr>
                                        <td class="td-title">正确率</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                        <td>94%</td>
                                    </tr>
                                </table>
                                <p class="desc">体积检测</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-right">
                    <p class="main-title">答错分布:</p>
                    <div class="wrong-box"></div>
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
        height: 142*0.4*0.02rem;
        line-height: 142*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 93.087%;
        margin: 0 auto 70*0.4*0.02rem;
        .mark-box{
            width: 100%;
            height: 575*0.4*0.02rem;
            padding: 0 45*0.4*0.02rem;
            box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1);
            position: relative;
            .mark-title{
                position: absolute;
                left: 45*0.4*0.02rem;
                top: 15*0.4*0.02rem;
                font-size: 38*0.4*0.02rem;
                color: #333333;
            }
        }
        .detail-box{
            width: 100%;
            margin: 50*0.4*0.02rem auto;
            .main-title{
                font-size: 38*0.02*0.4rem;
                color: @fcolor;
                height: 105*0.4*0.02rem;
                line-height: 105*0.4*0.02rem;
                text-indent: 50*0.4*0.02rem;
            }
            .detail-left{
                float: left;
                margin-right: 54*0.02*0.4rem;
                width: 62.8%;
                height: 620*0.4*0.02rem;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1);
                margin-right: 3.2%;
                .right-box{
                    .line-box {
                        border-bottom: 1px solid #f3f3f3;
                        .line-item{
                            float: left;
                            width: calc(~"33.3% - 1px");
                            border-right: 1px solid #f3f3f3;
                            height: 220*0.4*0.02rem;
                            &.last-item{
                                border-right: none;
                            }
                        }
                    }
                    
                    .right-title{
                        font-size: 34*0.4*0.02rem;
                        color: @fcolor;
                        height: 70*0.4*0.02rem;
                        line-height: 70*0.4*0.02rem;
                        text-indent: 50*0.4*0.02rem;
                    }
                    .detail-table{
                        padding: 0 50*0.4*0.02rem;
                        &>div{
                            float: left;
                            width: 49%;
                            margin-right: 2%;
                            text-align: center;
                            &:last-child{
                                margin-right: 0;
                            }
                            table{
                                width: 100%;
                                tr{
                                    height: 65*0.4*0.02rem;
                                    line-height: 65*0.4*0.02rem;
                                    td{
                                        border: 1px solid #f3f3f3;
                                        font-size: 12px!important;
                                        color: @fcolor;
                                       
                                    }
                                }
                            }
                            .desc{
                                height: 80*0.4*0.02rem;
                                line-height: 80*0.4*0.02rem;
                            }
                        }
                    }
                }
            }
            .detail-right{
                float: left;
                width: 34%;
                height: 620*0.4*0.02rem;
                box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
            }
        }
        
    }
}
</style>