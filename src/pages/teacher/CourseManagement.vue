<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">课后习题<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper clearfix">
        <div class="left-side">
            <div class="search-box clearfix">
                <i class="iconfont icon-xuanzhong"></i>
                <input type="text" placeholder="搜索全部">
            </div>
            <ul class="main-menu">
                <li :class="{active:index==isActive}"  v-for="(item,index) in tabList" :key="index" @click="changeType(index,item.type)">
                    <a href="javascript:void(0)">
                        <i class="iconfont" :class="item.iconName"></i>
                        <span>{{item.name}}</span>
                    </a>
                </li>
            </ul>
        </div>
       <div class="right-main">
            <p class="main-title" v-if="isInArray"> 
                <a href="javascript:void(0)" class="active upload-btn" @click="goPraafter"> 
                    <i class="iconfont icon-shangchuan1"></i>上传
                </a>
                <a href="javascript:void(0)" @click="deleteAttch"><i class="iconfont icon-shanchu"></i>删除</a>
            </p>
            <div class="main-info">
                <p class="info-title">全部</p>
                <table>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>修改时间<i></i></th>
                            <th>大小</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in typeList" :key="index.id">
                            <td class="td-check">
                                <label class="choose" @click="getCheck($event)"><input type="checkbox" :value="item.id"><span>√</span></label>
                                <a :href="item.uploadNetUrl" target="_blank"><span>{{getName(item.uploadNetUrl)}}</span></a>
                            </td>
                            <td>{{formatTime(item.createTime)}}</td>
                            <td>{{item.fileSize.toFixed(2)}}M</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tips-btn"><button class="sbtn">确认发送</button></div>
       </div>
    </div>
    <div class="tips" v-show="toggleTips">
        <div class="main-tips">
            <i class="iconfont icon-guanbi1" @click="HideTip"></i>
            <img class="tip-img" src="../../assets/images/teaupload.png" alt="send-success">
          <p class="tips-title">{{tipsMsg}}</p>
          <div class="tips-msg">
              <p>你已成功推送 <span>2</span>个文件！</p>
          </div>
          <div class="tips-btn"><button class="cbtn tbtn" @click="HideTip">好的</button></div>
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
import Axios from 'axios';
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
inject:['reload'],
data() {
//这里存放数据
return {
    tabList:[
        {
            name:'全部',
            iconName:'icon-xin',
            type:'all'
        },
        {
            name:'文档',
            iconName:'icon-xin',
            type:'doc'
        },
        {
            name:'图片',
            iconName:'icon-xin',
            type:'pic'
        },
        {
            name:'视频',
            iconName:'icon-xin',
            type:'video'
        },
        {
            name:'音乐',
            iconName:'icon-xin',
            type:'music'
        },
    ],
    toggleTips:false,
    tipsMsg:'推送成功',
    batch:'',
    list:[],
    isActive:0,
    typeList:[],
    deleteList:[],
    isInArray:false
};
},
//监听属性 类似于data概念
computed: {
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getrefresh(){
        this.reload();
    },
    formatTime(time){
        return share.formatTime(time/1000)
    },
    getName(str){
        let reg=/\/([^/]+?)$/;
        str = str.match(reg);
        return str[1]
    },
    changeType(index,type){
        this.isActive = index;
        let arr = {};
        arr['doc'] = [];
        arr['pic'] = [];
        arr['video'] = [];
        arr['music'] = [];
        this.list.forEach((item,index) => {
            let positiond = this.getName(item.uploadNetUrl).indexOf('.');
            let type = this.getName(item.uploadNetUrl).substring(positiond).toLowerCase();
            if(type == '.wps' || type == '.doc' || type == '.txt' || type == '.zip' || type == '.rar'){
                arr['doc'].push(item)
            }
            if(type == '.png' || type == '.jpg' || type == '.jpeg' || type == '.gif' || type == '.bmp' || type == '.psd'){
                arr['pic'].push(item)
            }
            if(type == '.avi' || type == '.mp4' || type == '.mpg'){
                arr['video'].push(item)
            }
            if(type == '.mp3' || type == '.wav' || type == '.wma'){
                arr['music'].push(item)
            }
        })
        switch(type) {
            case 'all':
                this.typeList = this.list;
                break;
            case 'doc':
                this.typeList = arr['doc'];
                break;
            case 'pic':
                this.typeList = arr['pic'];
                break;
            case 'video':
                this.typeList = arr['video'];
                break;
             case 'music':
                this.typeList = arr['music'];
                break;
            default:
                this.typeList = this.list;
                break;
        }
        return this.typeList;
    },
    HideTip(){
        this.toggleTips = false
    },
     goPraafter(){
         this.$router.push('/teapraafterclass') 
    },
    getCheck(e){
       let arr = [];
       e.preventDefault();
       //触发input的点击事件
       e.currentTarget.querySelector('input').dispatchEvent(new MouseEvent('click'))
       if(e.currentTarget.querySelector('input').checked){
           this.deleteList.push(e.currentTarget.querySelector('input').value*1)
       }else{
           let index = this.deleteList.indexOf(e.currentTarget.querySelector('input').value*1);
           if(index > -1) {
               this.deleteList.splice(index, 1);
           }
       }
    },
    deleteAttch(){
        let self = this;
        let arr = [];
        self.deleteList.forEach((item) => {
            arr.push(item)
        })
        Axios({
            method:'post',
            baseURL:base.baseURL,
            url:API.allUrl.deleteUploadfile+'?token='+store.state.token,
            headers:{
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data:arr,
        }).then((res) => {
            if(res.data.code == 200 && res.data.success == 1) {
                 this.toggleTips = true;
                 this.tipsMsg = '删除成功';
            }
        })
    },
    getCourseList(){
        let params = {
            token:store.state.token,
            batch:this.batch
        }
        base.getUrl(API.allUrl.courseList,params).then((res) => {
            if(res.code == 200 && res.success == 1) {
                this.list = res.obj;
                this.$nextTick(() => {
                    this.changeType(0,'all')
                })
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
    if(store.state.batch) {
        self.getCourseList()
        self.batch = store.state.batch
    }else{
        base.getUrl(API.allUrl.batch,params).then(res => {
            if(res.code == 200 && res.success ==  1) {
                self.batch = res.obj;
            }
        })
    }
    self.getCourseList()
    let num = 9
    base.getMenuStep().then((res) => {
        self.isInArray = base.arrContain(res,num)
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
.main-wrapper{
    height: 100%;
    width: 100%;
    .left-side{
        float: left;
        width: 15.9%;
        height: 100%;
        background-color: #f4f4f4;
        .search-box{
            margin: 160*0.4*0.02rem 30*0.04*0.02rem 16*0.4*0.02rem 40*0.4*0.02rem;
            width: 79.7%;
            height: 80*0.4*0.02rem;
            line-height: 80*0.4*0.02rem;
            background-color: #e8e8e8;
            border-radius: 4px;
            i{
                float: left;
                width: 30%;
                font-size: 0.36rem;
                color: @fcolor;
                text-align: center;
            }
            input{
                float: left;
                width: 70%;
                border: none;
                outline: none;
                padding: 0 10*0.4*0.02rem;
                background-color: transparent;
                color: @fcolor;
                font-size: 34*0.02*0.4rem;
                height: 80*0.4*0.02rem;
                line-height: 80*0.4*0.02rem;
            }
        }
        .main-menu{
            text-indent: 60*0.4*0.02rem;
            li{
                height: 135*0.4*0.02rem;
                line-height: 135*0.4*0.02rem;
                a{
                    color: @fcolor;
                    font-size: 34*0.4*0.02rem;
                    i{
                        color: @fcolor;
                        font-size: 0.36rem;
                        margin-right: 10*0.4*0.02rem;
                    }
                }
                &.active{
                    a{
                        color: #6c63ff;
                        i{
                            color: #6c63ff;
                        }
                    }
                }
            }
        }
    }
    .right-main{
        float: left;
        width: 84.1%;
        height: 100%;
        .main-title{
            height: 160*0.4*0.02rem;
            border: 1px solid #dbdbdb;
            .upload-file{
                display: none;
            }
            a{
                display: inline-block;
                width: 190*0.4*0.02rem;
                height: 85*0.4*0.02rem;
                line-height: 85*0.4*0.02rem;
                border-radius: 4px;
                background-color: #a2a5a7;
                color: #ffffff;
                font-size: 34*0.4*0.02rem;
                text-align: center;
                margin-top: 50*0.4*0.02rem;
                margin-left: 50*0.4*0.02rem;
                &.upload-btn{
                    margin-left: 105*0.02*0.4rem;
                }
                i{
                    color: #ffffff;
                    font-size: 46*0.4*0.02rem;
                    margin-right: 8*0.4*0.02rem;
                }
                &.active{
                    background-color: #6c63ff;
                }
            }
        }
        .main-info{
            width: 100%;
            padding: 0 110*0.4*0.02rem;
            .info-title{
                color: @fcolor;
                font-size: 0.28rem;
                text-indent: 15*0.4*0.02rem;
            }
            table{
                width: 100%;
                font-size: 34*0.4*0.02rem;
                thead{
                    tr{
                        height: 135*0.4*0.02rem;
                        line-height: 135*0.4*0.02rem;
                        th{
                            font-weight: normal;

                        }
                    }
                }
                tbody{
                    text-align: center;
                    tr{
                        height: 98*0.4*0.02rem;
                        line-height: 98*0.4*0.02rem;
                        text-align: center;
                        color: @fcolor;
                        font-size: 34*0.4*0.02rem;
                        border-bottom: 1px solid #dbdbdb;
                        .td-check{
                            a{
                                color: @fcolor;
                            }
                            .choose{
                                display: inline-block;
                                vertical-align: middle;
                                font-size: 34*0.4*0.02rem;
                                cursor: pointer;
                                input[type="checkbox"] {
                                    appearance: none;
                                    -webkit-appearance: none;
                                    outline: none;
                                    display: none
                                }
                                span{
                                    vertical-align: middle;
                                    font-size: 12px!important;
                                    color: #ffffff;
                                    margin-right: 30*0.4*0.02rem;
                                }
            
                                input[type="checkbox"]+span {
                                    display: inline-block;
                                    width: 40*0.4*0.02rem;
                                    height: 40*0.4*0.02rem;
                                    line-height: 40*0.4*0.02rem;
                                    background-color: transparent;
                                    border: 1px solid #dddddd;
                                    
                                }
                                input[type="checkbox"]:checked+span {
                                    background-color: #ffffff;
                                    color: #6c63ff;
                                }
            
                            }
                        }
                    }
                }
            }
        }
        .tips-btn{
            width: 100%;
            margin: 0.6rem auto 0;
            text-align: center;
            .sbtn{
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
            cursor: pointer;
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