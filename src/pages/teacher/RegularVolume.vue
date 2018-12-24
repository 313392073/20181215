<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">正棱锥表面积</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">第一次计算表面积数据统计</h3>
        <div class="main-box">
            <div class="detail-box clearfix">
                <div class="detail-left">
                    <table>
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>人名</th>
                                <th>是否正确</th>
                                <th>错误结果</th>
                                <th>正确结果</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in 16" :key="item">
                                <td>{{index+1}}</td>
                                <td>流星雨</td>
                                <td>正确</td>
                                <td>14.33</td>
                                <td class="right-result">66.22</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="detail-right">
                   
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
        width: 90.78%;
        margin: 0 auto 70*0.4*0.02rem;
        .detail-box{
            width: 100%;
            margin: 55*0.4*0.02rem auto;
            .main-title{
                font-size: 34*0.02*0.4rem;
                color: @fcolor;
                height: 105*0.4*0.02rem;
                line-height: 105*0.4*0.02rem;
                text-indent: 65*0.4*0.02rem;
            }
            .detail-left{
                float: left;
                width: calc(~"50% - 1px");
                padding: 0 30*0.4*0.02rem;
                border-right:1px solid #ececec; 
                table{
                    width: 100%;
                    thead{
                        tr{
                            line-height: 70*0.4*0.02rem;
                            height: 70*0.4*0.02rem;
                            background-color: #6c63ff;
                            th{
                                color: #ffffff;
                                font-size: 30*0.4*0.02rem;
                            }
                        }
                    }
                    tbody{
                        tr{
                            line-height: 70*0.4*0.02rem;
                            height: 70*0.4*0.02rem;
                            font-size: 30*0.4*0.02rem;
                            color: #5c5a5a;
                            text-align: center;
                            &:nth-child(even){
                                background-color: #f0efff;
                            }
                            .right-result{
                                color: #6c63ff;
                            }
                        }
                    }
                }
            }
            .detail-right{
                float: left;
                width: calc(~"50% - 1px");
                height: 825*0.4*0.02rem;
                padding: 30*0.4*0.02rem;
            }
        }
        
    }
}
</style>