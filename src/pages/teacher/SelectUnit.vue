<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu"> <i class="iconfont icon-2fanhui" @click="goBack"></i> 课程安排设置</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <div class="unit-wrapper">
            <div class="unit-box">
                <label class="label-box active" v-for="(item,index) in courseList" :key="index">
                    <div class="unit-list">
                        <h3>{{item.courseName}}</h3>
                        <p>发布者：{{item.createUsername}}</p>
                        <p>{{formatTime(item.createTime)}}</p>
                    </div>
                </label>
            </div>
        </div>
        <p class="order-step" style="">第 <span>01</span>步：选择课程内容</p>
        <div class="next-step">
            <div class="second-step">
                <div class="second-content clearfix" v-for="(item,index) in courseList" :key="index">
                    <div class="citem" v-for="(subItem,subIndex) in item.menuList" :class="subItem.state?'active':0" :key="subIndex" @click="makeChoose(index,subIndex,subItem.courseId,subItem.menuId,subItem.menuLevel,subItem.menuName,subItem.menuOrder,subItem.menuUrlStu,subItem.menuUrlTeacher,subItem.pmenuId,subItem.state,subItem.sysClassId)">
                        <i></i><span>{{subItem.menuName}}</span>
                    </div>
                </div>
            </div>

            <div class="last-step">
                <div class="lastcontent clearfix" v-for="(item,index) in courseList" :key="index">
                    <div class="item" v-for="(subItem,subIndex) in item.menuList" :key="subIndex" v-if="subItem.state">
                        <i>{{subIndex+1}}</i>
                        <span>{{subItem.menuName}}</span>
                    </div>
                </div>

            </div>
        </div>
        <div style="display: flex;margin: 0 1.5rem;">
            <p class="order-step" style="width: 50%;margin-right: 2rem;">第 <span>02</span>步：选择课程模块</p>
            <p class="order-step" style="flex: 1;">第 <span>03</span>步：调整模块顺序</p>
        </div>
        <div class="submitBtn" @click="submitCouese">确认</div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import base from '../../router/http/base.js'
import share from '../../router/http/share.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
import Axios from 'axios';
export default {
//import引入的组件需要注入到对象中才能使用

data() {
//这里存放数据
return {
    courseList:[],
    classId:'',
    courseId:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    formatTime(time){
        return share.formatTime(time/1000)
    },
    goBack(){
        this.$router.go(-1)
    },
    makeChoose(pindex,index,courseId,menuId,menuLevel,menuName,menuOrder,menuUrlStu,menuUrlTeacher,pmenuId,state,sysclassId){
        if(this.courseList[pindex]['menuList'][index]['state'] == 1) {
            this.courseList[pindex]['menuList'][index]['state'] = 0
        }else{
            this.courseList[pindex]['menuList'][index]['state'] = 1
        }
        this.courseId = courseId
    },
    submitCouese(){
        let self = this;
        let arr = [];
        this.courseList.forEach((item,index) => {
            item.menuList.forEach((subItem,subIndex) => {
                arr.push(subItem)
            })
        })
        Axios({
            method:'post',
            baseURL:base.baseURL,
            headers:{
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            url:API.allUrl.submitCourse+'?token='+store.state.token+'&classId='+self.classId*1+'&courseId='+self.courseId*1,
            data:JSON.stringify(arr),
        }).then((res) => {
            if(res.data.code == 200 && res.data.success == 1) {
                self.$layer.confirm('设置成功',{
                    title:'温馨提示',
                    time:500,
                    yes:self.$router.push('/')
                });
            }else{
                self.$layer.confirm('网络错误，请稍后再试',{
                    title:'温馨提示'
                });
            }
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.classId = this.$route.params.classid;
    let self = this;
    let params = {
        token:store.state.token
    }
    base.getUrl(API.allUrl.getCourseInfo,params).then((res) => {
        if(res.code == 200 && res.success == 1) {
            self.courseList = res.obj
        }else{
            self.$layer.confirm('网络错误，请稍后再试',{
                title:'温馨提示'
            });
        }
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
.left-box{
    height: 100%;
    width: 100%; 
    .desc-menu{
        i{
            color: #6c63ff;
            font-size: 40*0.4*0.02rem;
            font-weight: bold;
        }
    }
    .main-wrapper{
        width: 100%;
        margin: 0 auto 70*0.4*0.02rem;
        padding-right:2%;
        padding-left: 3%;
        .unit-wrapper{
            overflow-x: scroll;
            width: 100%;
             .unit-box{
                margin: 0 50*0.4*0.02rem;
                background-color: #eff3f6;
                box-sizing: border-box;
                padding: 50*0.4*0.02rem;
                min-width:100%;
                white-space: nowrap;
                overflow-x: scroll;
                float: left;
                overflow-y: hidden;
                .label-box{
                    position: relative;
                    display: inline-block;
                    width: 4rem;
                    height: 3rem;
                    background-color: #fff;
                    border-radius: 4px;
                    margin-right:50*0.4*0.02rem;
                    &.active{
                        box-shadow: 5px 5px 5px #6a649c;
                    }
                    .unit-list{
                        display: inline-block;
                        padding:0.2rem;
                        height: 100%;
                        width:100%;
                        border-radius: 4px;
                        box-sizing: border-box;
                        p{
                            line-height:100*0.4*0.02rem;
                        }
                        h3{
                            line-height:120*0.4*0.02rem;
                            border-bottom:1px solid #666;
                        }
                    }
                }
            }
        }
        .order-step{
            text-align: center;
            line-height:120*0.4*0.02rem;
            span{
                display: inline-block;
                width:50*0.4*0.02rem;
                height:50*0.4*0.02rem;
                line-height: 50*0.4*0.02rem;
                border-radius: 50%;
                background-color:#6c63ff;
                color:#fff;
            }
        }
        .next-step{
            display: flex;
            margin:0 50*0.4*0.02rem;
            min-height: 4rem;
            .second-step{
                width:50%;
                margin-right:50*0.4*0.02rem;
                position: relative;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 20*0.4*0.02rem;
                .second-content{
                    .citem{
                        float: left;
                        width: 33.33%;
                        font-size: 16px;
                        cursor: pointer;
                        text-align: left;
                        height: 80*0.4*0.02rem;
                        line-height: 80*0.4*0.02rem;
                        i{
                            display: inline-block;
                            width: 50*0.4*0.02rem;
                            height: 50*0.4*0.02rem;
                            background:url('../../assets/images/uncheck.png');
                            background-size: cover;
                            border: 1px solid #ffffff;
                            border-radius: 50%;
                            vertical-align: middle;
                        }
                        &.active{
                            i{
                                background:url('../../assets/images/checked.png');
                                background-size: cover;
                            }
                        }
                    }
                    .choose{
                        float: left;
                        width: 33.3%;
                        font-size: 16px;
                        cursor: pointer;
                        text-align: left;
                        height: 80*0.4*0.02rem;
                        line-height: 80*0.4*0.02rem;
                        input[type="checkbox"] {
                            appearance: none;
                            -webkit-appearance: none;
                            outline: none;
                            display: none
                        }
                        span{
                            border-radius: 50%;
                            vertical-align: middle;
                        }
                        input[type="checkbox"]+span {
                            width: 50*0.4*0.02rem;
                            height: 50*0.4*0.02rem;
                            display: inline-block;
                            background:url('../../assets/images/uncheck.png');
                            background-size: cover;
                            border: 1px solid #ffffff;
                        }
                        input[type="checkbox"]:checked+span {
                            background:url('../../assets/images/checked.png');
                            background-size: cover;
                        }
                    }
                }
            }
            .last-step{
                flex:1;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 20*0.4*0.02rem;
                .lastcontent{
                    .item{
                        float: left;
                        width: 33.33%;
                        height: 80*0.4*0.02rem;
                        line-height: 80*0.4*0.02rem;
                        text-align: left;
                        i{
                            display: inline-block;
                            width: 80*0.4*0.02rem;
                            text-align: center;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            padding-right: 0.1rem;
                            background: url('../../assets/images/orders.png') no-repeat;
                            background-size: cover;
                            color: #fff;
                        }
                    }
                }
            }
        }
         .submitBtn{
            width: 320*0.4*0.02rem;
            height: 90*0.4*0.02rem;
            line-height: 90*0.4*0.02rem;
            background-color: #6c63ff;
            color: #fff;
            border-radius: 0.8rem;
            text-align: center;
            margin: 0 auto;
            font-size: 40*0.4*0.02rem;
        }
    }
}
</style>