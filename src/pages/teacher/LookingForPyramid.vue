<!--  -->
<template>
<div class="wrapper" @mouseup="end">
    <div class="left-wrapper">
    <div class="left-box">
        <div class="desc-menu">寻找棱锥<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
        <!-- 主要内容 -->
        <div class="main-wrapper">
            <h3 class="title">分配小组</h3>
            <div class="main-box clearfix">
                <div class="main-left">
                    <form action="">
                        <div class="group-item">
                            <label>班级</label>
                            <div class="group-class">
                                <select name="classd" id="className">
                                    <option>请选择</option>
                                    <option v-for="(item,index) in sel_class" :key="index" :value="item.sysClassId" >{{item.classname}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="group-item">
                            <label>分组方式</label>
                            <div class="group-type-box clearfix">
                                <label class="choose" v-for="(item,index) in grouptype" :key="index" @click="getGrouptype($event)" ><input type="radio" name="grouptype" :value="item.value" :checked="index+1==2?true:false" v-model="checkValue">{{item.text}}<span></span></label>
                            </div>
                        </div>
                        <div class="group-item">
                            <label for="">每组人数</label>
                            <div class="group-process-box change-process-box">
                                <div class="group-process change-process" ref="changeProcess" @mousedown="moveDown($event)" @mousemove="moveMove($event)" @touchstart="moveDown($event)" @touchmove="moveMove($event)" @mouseup="end" @touchend="end">
                                    <p :style="'width:' + pwidth + '%'"><i ref="elmove"></i></p>
                                </div>
                                <input type="text" readonly name="num" :value="pnum">
                            </div>
                        </div>
                        <div class="group-item">
                            <label for="">小组数量</label>
                            <div class="group-process-box change-process-box">
                                <div class="group-process change-process">
                                    <p :style="'width:' + groupList.length + '%'"><i ></i></p>
                                </div>
                                <input v-if="groupList.men || groupList.women" type="text" readonly name="num" :value="groupList.men.length+groupList.women.length">
                                <input v-else type="text" readonly name="num" :value="groupList.length">
                            </div>
                        </div>
                        <div class="group-desc">
                            <h3>分组说明</h3>
                            <p>1、异质分组是按照课前练习的成绩进行分组</p>
                            <p>2、“分组人数”和“小组数量”中确顶一个参数，另外一个参数会自动调整</p>
                            <p>3、点击学生头像即可指定组长</p>
                        </div>
                        <div class="group-submit" v-if="isInArray"><a href="javascript:void(0)" class="sbtn" @click="makeGroup">确认分组</a></div>
                    </form>
                </div>
                <div class="main-right">
                    <div class="group-wrapper clearfix">
                        <div v-if="checkValue != 4" class="item" v-for="(item,index) in groupList" :key="getZm(index)">
                            <div class="item-left">{{getZm(index)}}组</div>
                            <div class="box-item">
                                <div class="item-right clearfix">
                                    <draggable :move="moveStart" :options="{item:item,group:'people',animation:200,draggable:'.sub-item',sort:true}" @end="datadragEnd" v-model="groupList[index]">
                                        <div class="sub-item" v-for="(subItem,subIndex) in item" :key="getZm(subIndex)">
                                            <img :src="subItem.userHeadImage" :alt="subIndex">
                                            <p>{{subItem.userName}}</p>
                                        </div>
                                    </draggable>
                                </div>
                            </div>
                        </div>
                        <div class="item" v-for="(item,menIndex) in groupList.men" :key="getZm(menIndex)" v-if="checkValue == 4 && groupList.men.length > 0">
                            <div class="item-left">男{{getZm(menIndex)}}组</div>
                            <div class="box-item">
                                <div class="item-right clearfix">
                                    <draggable :move="moveStart" :options="{item:item,group:'people',animation:200,draggable:'.sub-item',sort:true}" @end="datadragEnd" v-model="groupList['men'][menIndex]">
                                        <div class="sub-item" v-for="(subItem,mesubIndex) in item" :key="getZm(mesubIndex)">
                                            <img :src="subItem.userHeadImage" :alt="mesubIndex">
                                            <p>{{subItem.userName}}</p>
                                        </div>
                                    </draggable>
                                </div>
                             </div>
                        </div>
                        <div class="item" v-for="(item,womenindex) in groupList.women" :key="womenindex" v-if="checkValue == 4 && groupList.women.length > 0">
                            <div class="item-left">女{{getZm(womenindex)}}组</div>
                            <div class="box-item">
                                <div class="item-right clearfix">
                                    <draggable :move="moveStart" :options="{item:item,group:'people',animation:200,draggable:'.sub-item',sort:true}" @end="datadragEnd" v-model="groupList['women'][womenindex]">
                                        <div class="sub-item" v-for="(subItem,wosubIndex) in item" :key="subItem.userName">
                                            <img :src="subItem.userHeadImage" :alt="wosubIndex">
                                            <p>{{subItem.userName}}</p>
                                        </div>
                                    </draggable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tips" v-show="toggleTips">
            <div class="main-tips">
                 <i class="iconfont icon-guanbi1" @click="HideTip"></i>
                <img class="tip-img" src="../../assets/images/group.jpg" alt="">
                <p class="tips-title">确认分组</p>
                <div class="tips-msg">
                    {{tipsMsg}}
                </div>
                <div class="tips-btn"><button class="cbtn tbtn" @click="HideTip">确认</button></div>
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
import draggable from "vuedraggable";
import SideBar from "@/common/SideBar";
import share from '../../router/http/share.js'
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
import store from '../../store/store.js';
import Axios from 'axios';
let grouptype = [
    {
        text:'随机分组',
        value:1,
    },
    {
        text:'最优分组',
        value:2,
    },
    {
        text:'差异分组',
        value:3,
    },
      {
        text:'性别分组',
        value:4,
    },
    {
        text:'手动分组',
        value:5,
    },
    {
        text:'活跃分组',
        value:6,
    },
]
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar,draggable},
data() {
//这里存放数据
return {
    move:{
        tag:false, //滑动标记
        startx:0, //滑动开始的位置
        left:0,
        len:0
    },
    pnum:4, //默认分组人数
    pwidth:30,
    checkValue:2,
    toggleTips:false,
    tipsMsg:'已完成小组分配，每组4人，共4组！',
    grouptype:grouptype,
    sel_class:[],
    defaultValue:2, //默认分组方式
    groupList:[],
    flags:false, //拖拽
    position: { x: 0, y: 0 },
    isInArray:false
};
},
//监听属性 类似于data概念
computed: {
    allmener(){
        return this.groupList.men || this.groupList.women?this.groupList.men.length+this.groupList.women.length:this.groupList.length
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    datadragEnd(evt) {
      evt.preventDefault();
    },
    getrefresh(){
        let params = {
            token:store.state.token,
            method:this.checkValue*1,
            gmaxPnum:this.pnum*1
        }
        this.getInit(params)
    },
    getZm(num){
        return share.order[num];
    },
    HideTip(){
        this.toggleTips = false
    },
    getGrouptype(e){ //点击分许方式 请求分组的数据
        e.preventDefault();
        e.currentTarget.querySelector('input').dispatchEvent(new MouseEvent('click'))
        let getGrouptype = e.currentTarget.querySelector('input').value*1
        let params = {
            token:store.state.token,
            method:getGrouptype*1?getGrouptype*1:this.checkValue*1,
            gmaxPnum:this.pnum*1
        }
        this.getInit(params)
    },   
    getInit(params){
        base.postUrl(API.allUrl.getAssignTeam,params).then((res) => {
            if(res.code == 200 && res.success == 1) {
                this.groupList = res.obj
            }
        })
    },
    moveDown(e){ //滑动条事件
        this.move.tag = true;
        if(e.touches){
            this.$refs.elmove.dispatchEvent(new MouseEvent('touchstart'))
            this.move.startx = e.touches[0].clientX - this.move.left;
        }else{
            this.$refs.elmove.dispatchEvent(new MouseEvent('mousedown'))
            this.move.startx = e.clientX - this.move.left;
        }
    },
    moveMove(e){
        if(this.move.tag) {
            if(e.touches) {
                this.move.left = e.touches[0].clientX - this.move.startx;
            }else{
                this.move.left = e.clientX - this.move.startx
            }
            if(this.move.left <= 0){
                this.move.left = 0;
            }else if(this.move.left > this.move.len){
                this.move.left = this.move.len
            }
            this.pwidth = this.move.left;
            let num = Math.floor((this.move.left*16)/this.move.len);
            this.pnum = num;
        }
        e.preventDefault();
    },
    end(){
        this.move.tag = false;
    },
    moveStart(evt,e) {
        console.log(evt,e)
    },
    makeGroup(){ //确认分组
        let dataArr = [];
        let self = this;
        if(self.groupList.length>0) {
            self.groupList.forEach((item,index) => {
                if(item.length>0) {
                    item.forEach((subItem,subIndex) => {
                        let obj = {
                            "groupRuleId": JSON.stringify(self.checkValue),
                            "sysClassId": JSON.stringify(subItem.groupId),
                            "sysGroupId": index+1,
                            "userLoginname": subItem.userLoginname
                        }
                        dataArr.push(obj)
                    })
                }
            })
        }
        Axios({
            method:'post',
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            baseURL:base.baseURL,
            url:API.allUrl.subConfirm+'?token='+store.state.token+'&batch='+self.batch+'&fileType=6',
            data:JSON.stringify(dataArr),
        })
        .then((res) => {
            let self = this;
            if(res.data.code == 200 && res.data.success == 1) {
                self.toggleTips = true;
                self.tipsMsg =  `已完成小组分配，每${self.pnum}人，共${self.allmener}组！`;
                setTimeout((function() {
                    let params = {
                        token:store.state.token,
                        method:self.checkValue*1,
                        gmaxPnum:self.pnum*1
                    }
                    self.getInit(params);
                }),1000)
            }else{
                self.$layer.open({
                    type:0,
                    content: '网络错误,请稍后再试？',
                    shade:true,
                    time:2,
                    anim:'scale',
                    success(layer) {
                        console.log('layer id is:',layer.id)
                    },
                    yes(index) {
                        self.$layer.close(index)
                    },
                    end() {
                        console.log('end')
                    }
                });
            }
        })
        
        
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this;
    let params = {
        token:store.state.token
    }
    base.getUrl(API.allUrl.groupCondition,params).then((res) => { //获取班级的选项
        if(res.code == 200 && res.success == 1) {
            self.sel_class = res.obj.sel_class;
        }
    })
    let num = 2
    base.getMenuStep().then((res) => {
        self.isInArray = base.arrContain(res,num)
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.move.len = this.$refs.changeProcess.clientWidth;
    let params = {
        token:store.state.token,
        method:this.checkValue*1,
        gmaxPnum:this.pnum*1
    }
    this.getInit(params)
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
    height: 100%; 
    .title{
        height: 142*0.4*0.02rem;
        line-height: 142*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 100%;
        margin: 0 auto 70*0.4*0.02rem;
        .main-left{
            float: left;
            width: calc(~"26% - 1px");
            margin-right: 4.2%;
            margin-left: 4.4%;
            min-height: 100%;
            border-right: 1px solid #e6e6e6;
            padding-right: 55*0.4*0.02rem;
            .group-item{
                margin-bottom: 30*0.4*0.02rem;
                &>label{
                    font-size: 38*0.4*0.02rem;
                    color: @fcolor;
                }
                .group-class{
                    border-bottom: 1px solid #d8d8d8;
                    select{
                        border: none;
                        outline: none;
                        display: block;
                        width: 100%;
                        font-size: 14px;
                        line-height: 60*0.4*0.02rem;
                        height: 60*0.4*0.02rem;
                        padding-right: 80*0.4*0.02rem;
                        color: #9FA9BA;
                        overflow: hidden;
                        appearance:none;
                        -moz-appearance:none;
                        -webkit-appearance:none;
                        &::-ms-expand { display: none; }
                        background: url("../../assets/images/downsj.png") no-repeat scroll 95% center transparent;
                    }
                }
                .group-type-box{
                    .choose{
                        display: inline-block;
                        width: 48%;
                        vertical-align: middle;
                        font-size: 34*0.4*0.02rem;
                        min-height: 90*0.4*0.02rem;
                        line-height: 90*0.4*0.02rem;
                        cursor: pointer;
                        input[type="radio"] {
                            appearance: none;
                            -webkit-appearance: none;
                            outline: none;
                            display: none
                        }
                        span{
                            border-radius: 50%;
                            margin-left: 15*0.4*0.02rem;
                            vertical-align: middle;
                        }
    
                        input[type="radio"]+span {
                            display: inline-block;
                            width: 24*0.6*0.02rem;
                            height: 24*0.6*0.02rem;
                            background:url("../../assets/images/uncheck.png") no-repeat center;
                            background-size: cover;
                        }
                        input[type="radio"]:checked+span {
                            background:url("../../assets/images/checked.png") no-repeat center;
                            background-size: cover;
                        }
    
                    }
                }
                .group-process-box{
                    position: relative;
                    padding: 60*0.4*0.02rem;
                    width: 100%;
                    height: 36*0.4*0.02rem;
                    .group-process{
                        position: absolute;
                        left: 0;
                        top: 50%;
                        width: calc(~"100% - 140*0.4*0.02rem");
                        height: 1px;
                        background-color: #D8DDE3;
                        p{
                            width: 20%;
                            max-width: 100%;
                            height: 1px;
                            background-color: #6c63ff;
                            position: relative;
                            i{
                                position: absolute;
                                right: 0;
                                top: 50%;
                                margin-top: -12*0.6*0.02rem;
                                width: 24*0.6*0.02rem;
                                height: 24*0.6*0.02rem;
                                border-radius: 0.2rem;
                                background-color: #6c63ff;
                                cursor: pointer;
                            }
                            &.process-full{
                                width: 100%;
                            }
                        }
                    }
                    input{
                        position: absolute;
                        right: 0;
                        top: 50%;
                        margin-top: -36*0.4*0.02rem;
                        width: 94*0.4*0.02rem;
                        height: 64*0.4*0.02rem;
                        line-height:36*0.05rem;
                        text-align: center;
                        font-size: 14px;
                        color: #9FA9BA;
                        border: 1px solid #CCCFD4;
                        border-radius: 4px;
                    }
                }
            }
            .group-desc{
                h3{
                    font-size: 32*0.4*0.02rem;
                    color: #222222;
                }
                p{
                    font-size: 28*0.4*0.02rem;
                    color: @fcolor;
                    min-height: 60*0.4*0.02rem;
                    line-height: 60*0.4*0.02rem;
                }
            }
            .group-submit{
                margin: 55*0.4*0.02rem auto;
                display: flex;
                justify-content: center;
                align-items: center;
                a{
                    width: 330*0.4*0.02rem;
                    height: 90*0.4*0.02rem;
                    line-height: 90*0.4*0.02rem;
                    background-color: #6c63ff;
                    color: #ffffff;
                    font-size: 35*0.4*0.02rem;
                    text-align: center;
                    margin: auto;
                    border-radius: 90*0.4*0.02rem;
                }
            }
        }
        .main-right{
            float: left;
            width: 60.6%;
            margin-right: 4.8%;
            .group-wrapper{
                width: 100%;
                .item{
                    float: left;
                    width: calc(~"48.3% - 2px");
                    margin-right: 3.4%;
                    margin-bottom: 50*0.4*0.02rem;
                    border: 1px solid #e6e6e6;
                    box-shadow: 0 0 5px 1px rgba(0, 0, 0,0.1);
                    &:nth-child(2n){
                        margin-right: 0;
                    }
                    .item-left{
                        width: 100%;
                        height: 120*0.4*0.02rem;
                        line-height: 120*0.4*0.02rem;
                        border-right: 1px dashed #e6e6e6;
                        font-size: 48*0.4*0.02rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .box-item{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .item-right{
                            width: 100%;
                            text-align: center;
                            font-size: 34*0.4*0.02rem;
                            &>div{
                                width: 100%;
                                min-height: 250*0.4*0.02rem;
                            }
                            .sub-item{
                                float: left;
                                width: 25%;
                                margin-bottom: 30*0.4*0.02rem;
                                position: relative;
                                img{
                                    width: 100*0.4*0.02rem;
                                    height: 100*0.4*0.02rem;
                                    margin-bottom: 15*0.4*0.02rem;
                                    border-radius: 50%;
                                }
                                p{
                                    font-size: 30*0.4*0.02rem;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

.tips{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    .main-tips{
        width: 1240*0.02*0.4rem;
        height: 830*0.4*0.02rem;
        background-color: #ffffff;
        background: url("../../assets/images/send-tipbg.jpg") no-repeat center;
        background-size: contain;
        box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
        text-align: center;
        padding-top: 20*0.4*0.02rem;
        position: relative;
        &>i{
            position: absolute;
            width: 80*0.4*0.02rem;
            height: 80*0.4*0.02rem;
            top: 60*0.4*0.02rem;
            right: 60*0.4*0.02rem;
            font-size: 0.4rem;
            color: #8e8e8e;
            border-radius: 50%;
            box-shadow: 0 0 2px 2px rgba(0, 0, 0,0.2);
            padding: 3px;
        }
        .tip-img{
            margin-top: 30*0.4*0.02rem;
            max-width: 2.5rem;
        }
        .tips-title{
            text-align: center;
            color: #f32d2d;
            font-size: 0.36rem;
            margin: 0.4rem auto;
        }
        .tips-msg{
            font-size: 0.24rem;
            color: @fcolor;
            line-height: 26*0.02rem;
        }
    }
    .tips-btn{
        width: 100%;
        margin: 0.6rem auto 0;
        text-align: center;
        .tbtn{
            display: block;
            width: 320*0.4*0.02rem;
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
    &.active{
        z-index: 999;
        opacity: 1;
    }
}
</style>