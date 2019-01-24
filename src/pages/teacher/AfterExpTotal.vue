<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>课后实验数据统计</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">课后实验成绩统计<a class="refresh-btn" href="javascript:void(0)"><img @click="getrefresh" src="../../assets/images/refresh.png" alt="refresh.png"></a></h3>
        <div class="main-box">
            <div id="tchart" class="tchart"></div>
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
import echarts from 'echarts'
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
inject:['reload'],
data() {
//这里存放数据
return {
    infoList:[],
    echarts:'',
    opinionX:[],
    opinionY:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getrefresh(){
        this.reload();
    },
    goBack(){
        this.$router.go(-1)
    },
    initData(){
        let arr = [];
        arr = this.opinionX
        console.log(JSON.stringify(arr))
        return arr
    },
    initEchart(id){
        let datas = this.initData()
        this.echarts = echarts.init(document.getElementById(id))
        this.echarts.setOption({
            color:['#ff9900','#37c7c8','#b6a2dd','#feb883','#8d98b2'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
      
            },
            yAxis: {
                type: 'category',
                data: this.opinionY
            },
            series:[
                {
                    type: 'bar',
                    itemStyle:{
                        normal:{
                            color:function(params){
                                var colorList = [
                                '#37c7c8','#b6a2dd','#5eb2ed','#feb883','#d77980',
                                '#8d98b2','#e4ce2b','#94706d','#da69a9','#19a2a3',
                                '#9a80cf','#5a8ed3','#f39854','#be4f52','#5a678b'
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}\n{c}'
                    },
                    data: this.opinionX
                }
            ]
        })
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
            let params = {
                token:store.state.token,
                batch:res.obj
            }
            base.getUrl(API.allUrl.afterClassTest,params).then((res) => {
                if(res.code == 200 && res.success == 1) {
                    self.infoList = res.obj;
                    res.obj.score_rank.forEach((item) => {
                        let obj = {
                            name:item.user_name,
                            value:item.sum_score,
                        }
                        this.opinionX.push(item.sum_score);
                        this.opinionY.push(item.user_name);
                    })
                    this.$nextTick(function(){
                        this.initEchart('tchart')
                    })
                }
            })
        }
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(function(){
        this.initEchart('tchart')
    })
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
        .tchart{
            width: 100%;
            height: 1000*0.4*0.02rem;
            background-color: antiquewhite;
        }
    }
}
</style>