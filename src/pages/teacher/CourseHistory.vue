<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">课程历史<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <div class="situation-box">
            <div class="maintop-box">
                <span class="desc-time">选择查看时间段</span>
                <el-date-picker
                    v-model="valuestart"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择开始时间">
                    </el-date-picker>
                    <span>~</span>
                    <el-date-picker
                    v-model="valueend"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择结束时间">
                </el-date-picker>
                <button class="sbtn" @click="doSearch">查询</button>
            </div>
            <div class="item-box">
                <div class="item clearfix" v-for="(item,index) in courseList" :key="index"> 
                    <div class="item-left">
                        {{getFormatTime(item.creatTime)}}
                    </div>
                    <div class="item-right">
                        <label class="choose">
                            <input type="radio" name="identity" :value="item.batch" v-model="checkedValue">
                            <span></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-box">
            <a href="javascript:void(0)" @click="submitData">回退至...</a>
            <a href="javascript:void(0)" @click="goOncourse">继续上课</a>
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
import share from '../../router/http/share.js'
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
import * as types from '../../store/types';
import Axios from 'axios';
import { Loading } from 'element-ui';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
inject:['reload'],
data() {
//这里存放数据
return {
    valuestart:'',
    valueend:'',
    checkedValue:'',
    courseList:[
        {id: 85, sysClassId: 1, batch: "sakeqri61v", creatTime: 1550295367000},
        {id: 86, sysClassId: 1, batch: "pg3yn5cszc", creatTime: 1550296970000},
        {id: 87, sysClassId: 1, batch: "w2bdiqxy8j", creatTime: 1550671984000}
    ]
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
    doSearch(){
        let self = this;
        let startTime = self.valuestart;
        let endTime = self.valueend;
        if(startTime > endTime) {
            self.$layer.open({
                type:0,
                title:'温馨提示',
                content: '开始时间不能大于结束时间！',
                shade:true,
                time:2,
                anim:'scale',
                success(layer) {
                    console.log('layer id is:',layer.id)
                },
                yes(index) {
                    self.$layer.close(index)
                }
            });
            return false;
        }
        if(startTime == '' || endTime == '') {
            self.$layer.open({
                type:0,
                title:'温馨提示',
                content: '请选择查看的时间段',
                shade:true,
                time:2,
                anim:'scale',
                success(layer) {
                    console.log('layer id is:',layer.id)
                },
                yes(index) {
                    self.$layer.close(index)
                }
            });
            return false;
        }
        Axios({
            method:'post',
            baseURL:base.baseURL,
            url:API.allUrl.courseHistory+"?token="+store.state.token+"&sDatestr="+startTime+"&eDatestr="+endTime,
            dataType:"json",
            headers:{
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then((res) => {
            if(res.data.success == 1 && res.data.code == 200) {
                self.courseList = res.data.obj
            }else if(res.data.code == 401){
                self.$layer.open({
                    type:0,
                    title:'温馨提示',
                    content: res.data.msg,
                    shade:true,
                    time:2,
                    anim:'scale',
                    success(layer) {
                        console.log('layer id is:',layer.id)
                    },
                    yes(index) {
                        self.$layer.close(index)
                        self.$router.push('/')
                    }
                });
            }else{
                self.$layer.open({
                    type:0,
                    title:'温馨提示',
                    content: '网络错误，请稍后再试！',
                    shade:true,
                    time:2,
                    anim:'scale',
                    success(layer) {
                        console.log('layer id is:',layer.id)
                    },
                    yes(index) {
                        self.$layer.close(index)
                    }
                });
            }
        })
    },
    getFormatTime(timeStamp) {
        return share.formatTime(timeStamp/1000)
    },
    submitData() {
        let self = this;
        if(self.checkedValue == '') {
            self.$layer.open({
                type:0,
                title:'温馨提示',
                content: '请选择要回退历史批次',
                shade:true,
                time:2,
                anim:'scale',
                success(layer) {
                    console.log('layer id is:',layer.id)
                },
                yes(index) {
                    self.$layer.close(index)
                }
            });
            return;
        }
        let batch = store.state.batch;
        store.commit(types.BATCH,self.checkedValue);
        localStorage.setItem('batch',batch);
        self.gocourse();
    },
    gocourse() {
        let self = this;
        let loginFlag = store.state.userType; //userType:'', //0 学生  1老师
        let rolelastmenu = localStorage.getItem("lasturl_"+loginFlag)
        if(rolelastmenu) {
            self.$router.push(rolelastmenu)
        }else{
            self.$router.push('/teapracticreport')
        }
    },
    goOncourse() {
        this.gocourse()
    },
    getInit() {
        return base.getBatch()
    }
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    console.log(store.state)
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
    .main-wrapper{
        width: 90.78%;
        margin: 0 auto 70*0.4*0.02rem;
        .situation-box{
            width: 90%;
            min-height: 300*0.4*0.02rem;
            box-shadow: 1px 2px 4px 2px rgba(0,0,0,0.1);
            margin: 50*0.4*0.02rem auto;
            padding: 50*0.4*0.02rem 50*0.4*0.02rem;
            .maintop-box{
                border-bottom: 2px solid #dddddd;
                padding-bottom: 20*0.4*0.02rem;
                .desc-time{
                    margin-right: 25*0.4*0.02rem;
                }
                .sbtn{
                    display: inline-block;
                    background-color:#6c63ff;
                    border: none;
                    outline: none;
                    color: #ffffff;
                    width: 180*0.4*0.02rem;
                    line-height: 80*0.4*0.02rem;
                    border-radius: 4px;
                    margin-left: 25*0.4*0.02rem;
                    font-size: 36*0.4*0.02rem;
                }
            }
            .item-box{
                margin-top: 15*0.4*0.02rem;
                .item{
                    padding: 15*0.4*0.02rem 0 15*0.4*0.02rem 30*0.4*0.02rem;
                    line-height: 50*0.4*0.02rem;
                    border-bottom: 1px dashed #dddddd;
                    .item-left{
                        float: left;
                        width: 70%;
                    }
                    .item-right{
                        float: right;
                        width: 60*0.4*0.02rem;
                        .choose{
                            display: inline-block;
                            vertical-align: middle;
                            font-size: 16px;
                            cursor: pointer;
                            input[type="radio"] {
                                appearance: none;
                                -webkit-appearance: none;
                                outline: none;
                                display: none
                            }
                            span{
                                border-radius: 50%;
                                vertical-align: middle;
                            }
                            input[type="radio"]+span {
                                width: 40*0.4*0.02rem;
                                height: 40*0.4*0.02rem;
                                display: inline-block;
                                background: url("../../assets/images/uncheck.png");
                                background-size: contain;
                            }
                            input[type="radio"]:checked+span {
                                background: url("../../assets/images/checked.png");
                                background-size: contain;
                            }
                        }
                    }
                }
            } 
        }
        .btn-box{
            margin: 60*0.4*0.02rem auto;
            text-align: center;
            a{
                display: inline-block;
                width: 200*0.4*0.02rem;
                border: 1px solid #6c63ff;
                color: #6c63ff;
                font-size: 28*0.4*0.02rem;
                line-height: 60*0.4*0.02rem;
                border-radius: 4px;
                margin-right: 15*0.4*0.02rem;
            }
        }
    }
}

</style>
