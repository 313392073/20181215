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
                <label v-for="(item,index) in courseList" :key="index"  @click="doChoose(item.courseId)" :class="item.courseId == courseId ? 'label-box active':'label-box'">
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
                <div class="second-content clearfix" v-for="(item,index) in courseList" :key="index" v-if="item.courseId == courseId">
                    <div class="citem" v-for="(subItem,subIndex) in item.menuList" :class="subItem.tag?'active':''" :key="subIndex" @click="makeChoose(index,subIndex,subItem.courseId,subItem.menuId,subItem.menuLevel,subItem.menuName,subItem.menuOrder,subItem.menuUrlStu,subItem.menuUrlTeacher,subItem.pmenuId,subItem.state,subItem.sysClassId)">
                        <i></i><span>{{subItem.menuName}}</span>
                    </div>
                </div>
            </div>

            <div class="last-step">
                <div class="lastcontent clearfix">
                    <draggable>
                        <div v-for="(item,index) in getOrder" :key="index" v-if="item.tag" :class="item.state == 2?'item unable':'item'">
                            <i>{{index+1}}</i>
                            <span>{{item.menuName}}</span>
                        </div>
                    </draggable>
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
import draggable from "vuedraggable";
import base from '../../router/http/base.js'
import share from '../../router/http/share.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
import Axios from 'axios';
export default {
//import引入的组件需要注入到对象中才能使用
components :{ draggable },
data() {
//这里存放数据
return {
    courseList:[],
    classId:'',
    courseId:'',
    setList:[]
};
},
//监听属性 类似于data概念
computed: {
    getOrder(){
        let self = this;
        if(self.setList.length>0){
            let arr = [];
            self.setList.forEach((item,index) => {
                let pindexd = item.split('_')[0]
                let indexd = item.split('_')[1]
                arr.push(self.courseList[pindexd]['menuList'][indexd])
            })
            return arr
        }
    },
},
//监控data中的数据变化
watch: {
    
},
//方法集合
methods: {
    formatTime(time){
        return share.formatTime(time/1000)
    },
    goBack(){
        this.$router.go(-1)
    },
    makeChoose(pindex,index,courseId,menuId,menuLevel,menuName,menuOrder,menuUrlStu,menuUrlTeacher,pmenuId,state,sysclassId){
        if(state == 2) {
            return;
        }else{
            let self = this;
            let str = pindex + '_' + index
            if(self.courseList[pindex]['menuList'][index]['tag']) {
                self.$set(self.courseList[pindex]['menuList'][index],'flag',0) //取消样式
                self.$set(self.courseList[pindex]['menuList'][index],'tag',false) //取消样式
                let arrIndex = self.setList.indexOf(str)
                self.setList.splice(arrIndex,1)
            }else{
                self.setList.push(str)
                self.$set(self.courseList[pindex]['menuList'][index],'flag',1) //添加样式
                self.$set(self.courseList[pindex]['menuList'][index],'tag',true) //添加样式
            }
        }
        
        
    },
    compare(property){
         return function(obj1,obj2){
             var value1 = obj1[property];
             var value2 = obj2[property];
             return value1 - value2;     // 升序
         }
    },
    submitCouese(){
        let self = this;
        let arr = [];
        if(self.setList.length>0){
            self.setList.forEach((item,index) => {
                let pindexd = item.split('_')[0]
                let indexd = item.split('_')[1]
                self.$set(self.courseList[pindexd]['menuList'][indexd],'menuOrder',index+1)
            })
        }
        self.courseList.forEach((item,index) => {
            if(item['menuList'].length > 0 && item['courseId'] == self.courseId) {
                item['menuList'].forEach((subItem,subIndex) => {
                    let obj = {
                        courseId:subItem['courseId'],
                        menuId:subItem['menuId'],
                        menuLevel:subItem['menuLevel'],
                        menuName:subItem['menuName'],
                        menuOrder:subItem['menuOrder'],
                        menuUrlStu:subItem['menuUrlStu'],
                        menuUrlTeacher:subItem['menuUrlTeacher'],
                        pmenuId:subItem['state'],
                        state:subItem['state']==2?1:subItem['state'],
                        sysclassId:subItem['sysclassId']
                    }
                    obj['menuOrder']?obj['menuOrder']:delete obj['menuOrder']
;                   arr.push(obj)
                })
            }
        })
        Axios({
            method:'post',
            baseURL:base.baseURL,
            headers:{
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            url:API.allUrl.submitCourse+'?token='+store.state.token+'&classId='+self.classId*1+'&courseId='+self.courseId*1+'&batch='+store.state.batch+'&flag=2',
            data:JSON.stringify(arr),
        }).then((res) => {
            if(res.data.code == 200 && res.data.success == 1) {
                self.$layer.open({
                    type:0,
                    content: '设置成功',
                    title:'温馨提示',
                    shade:true,
                    time:2,
                    anim:'scale',
                    success(layer) {
                        console.log('layer id is:',layer.id)
                    },
                    yes(index) {
                        self.$layer.close(index);
                        self.$router.push('/teapracticreport')
                    },
                    end() {
                        console.log('end')
                    }
                });

            }else{
                self.$layer.confirm('网络错误，请稍后再试',{
                    title:'温馨提示'
                });
            }
        })
    },
    doChoose(courseId) {
        let self = this;
        self.courseId = courseId;
        self.arr = [];
        self.setList = [];
        self.courseList.forEach((item,index) => {
            if(item.menuList.length > 0 && item['courseId'] == self.courseId) {
                for(var i=0;i<item.menuList.length;++i) {
                    if(item.menuList[i]['state'] == 2) {
                        item.menuList[i]['flag'] = 1;
                        item.menuList[i]['tag'] = true;
                        let str = index + '_' + i
                        self.setList.push(str)
                    }
                }
            }
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.classId = this.$route.params.classid;
    let self = this;
    let params = {
        token:store.state.token,
        batch:store.state.batch,
        flag:2
    }
    base.getUrl(API.allUrl.getCourseInfo,params).then((res) => {
        if(res.code == 200 && res.success == 1) {
            if(res.obj.length > 0) {
                self.courseId = res.obj[0]['courseId'];
                res.obj.forEach((item,index) => {
                    if(item.menuList.length>0){
                        item.menuList.forEach((subItem,subIndex) => {
                            res.obj[index]['menuList'][subIndex]['tag'] = false;
                            res.obj[index]['menuList'][subIndex]['flag'] = 0;
                            if(res.obj[index]['menuList'][subIndex]['state'] == 2) {
                                res.obj[index]['menuList'][subIndex]['flag'] = 1;
                                res.obj[index]['menuList'][subIndex]['tag'] = true;
                                let str = index + '_' + subIndex
                                self.setList.push(str)
                            }
                            delete res.obj[index]['menuList'][subIndex]['menuOrder'];
                        })
                    }
                })
            }
            self.courseList = res.obj
        }else{
            self.$layer.open({
                type:0,
                content: '登录失效，请先登录',
                title:'温馨提示',
                shade:true,
                time:2,
                anim:'scale',
                success(layer) {
                    console.log('layer id is:',layer.id)
                },
                yes(index) {
                    self.$layer.close(index);
                    self.$router.push('/')
                },
                end() {
                    console.log('end')
                }
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
                        &.unable{
                           opacity: 0.6; 
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