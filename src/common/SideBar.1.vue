<template>
<div class="right-wrapper">
    <div class="user-info clearfix" style="display:none">
        <div class="left-pic">
            <img src="images/user.png" alt="headerpic" class="headerpic">
        </div>
        <div class="right-info">
            <p class="user-name">Jordon J</p>
            <p class="user-name">Administrator</p>
        </div>
    </div>
    <div class="list" style="margin-top:0.9rem;">
        <p v-if="isTea" class="spec-title" @click="goRoute('/teaselectclass')">课程设置</p>
        <p v-if="isTea" class="spec-title" @click="goNext">下一环节</p>
    </div>
    <div class="list">
        <p class="side-title">{{beforetab.title}}</p>
        <ul class="before-class menu">
            <li v-for="(item,index) in beforetab.list" :key="index" :class="nowUrl == item.url?'active':''">
                <a href="javascript:void(0);" @click="goRoute(item.url)" :class="item.name == '制作棱锥'?'tabborder-bottom':''">{{ item.name}}</a>
            </li>
        </ul>
    </div>
    
    <div class="list">
        <p class="side-title">{{lessontab.title}}</p>
        <ul class="lesson-learn menu">
            <li v-for="(item,index) in lessontab.list" :key="item.name" :class="nowUrl == item.url?'active':''">
                 <template v-if="item.list">
                    <a href="javascript:void(0);"  @click="slideToggle(item.tag,index)">{{item.name}}
                        <span :class="item.tag? 'iconfont icon-sanjiaoxing':'iconfont icon-sanjiaoxing1'"></span>
                    </a>
                 </template>
                 <template v-else>
                     <a @click="goRoute(item.url)" :class="item.name == '课堂总结' ?'tabborder-bottom':''">{{item.name}}</a>
                 </template>
                <template v-if="item.list">
                    <ul class="secondary" v-if="item.tag">
                        <li v-for="sub in item.list" :key="sub.name" :class="nowUrl == sub.target?'active':''">
                            <a href="javascript:void(0);" @click="goRoute(sub.target)">{{ sub.name }}</a>
                        </li>
                    </ul>
                </template>
            </li>
            <!-- <li><a class="tabborder-bottom">课堂总结</a></li> -->
        </ul>
    </div>

    <div class="list">
        <p class="side-title">{{aftertab.title}}</p>
        <ul class="after-class menu">
           <li v-for="item in aftertab.list" :key="item.name" :class="nowUrl == item.url?'active':''">
                <a href="javascript:void(0);" @click="goRoute(item.url)">{{ item.name }}</a>
            </li>
        </ul>
    </div>
    <div class="loginout list">
        <a href="javascript:void(0);" @click="getOut">退出登录</a>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import menu from './menu.js';
import base from '../router/http/base';
import API from '../router/http/api.js';
import * as types from '../store/types';
import store from '../store/store';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
inject:['reload'],
data() {
//这里存放数据
return {
    tab:'',
    nowUrl:'',
    beforetab: {
        title:'课前预习',
        list:[
            {name:'在线测试',url:'/stuonlinetest'},
            {name:'寻找棱锥',url:'/stuassigngroupcase'},
            {name:'制作棱锥',url:'/stumakepyramids'}
        ]
    },
    lessontab:{
        title:'课堂学习',
        list:[
             {
                name:'作业分享',
                url:'/stuhomeworkshare',
             },
             {
                name:'正棱锥表面积',
                url:'/stusideareaformula',
                tag:true,
                list:[
                    {name:'视频分享',target:'/stuvideoshare'},
                    {name:'侧面积公式',target:'/stusideareaformula' },
                    {name:'表面积公式',target:'/sturegularareaformula' },
                    {name:'计算表面积',target:'/RegularAreaFormula' },
                ]
            },
            {
                name:'正棱锥体积',
                url:'/show',
                tag:true,
                list:[
                   {name:'体积公式',target:'/stuvolumeformula' },
                    {name:'计算体积',target:'/stuexpregpyramid' },
                ]
            },
            {
                name:'在线关系',
                url:'',
                tag:true,
                list:[
                   {name:'分组讨论',target:'/stuclasslearning' },
                    {name:'小组汇报',target:'/stuexercise' },
                ]
            },
         ]
    },
    aftertab: {
        title:'课后拓展',
        list:[
            {name:'课后习题',url:'/stuexercise'},
            {name:'课后实验',url:'/stuaftclaexp'},
            {name:'分享体会',url:'TeaHomeworkShare'}
        ]
    },
};
},
//监听属性 类似于data概念
computed: {
    isTea(){
        if(store.state.userType && store.state.userType == 1) {
            return true;
        }else{
            return false;
        }
    }
},
//监控data中的数据变化
watch: {
    
},
//方法集合
methods: {
    goRoute(url) {
         console.log(url)
        this.$router.push(url)
       
        //访问菜单url历史记录
        // plus.storage.setItem("rolemenu_"+store.state.userType,url)
    },
    slideToggle(tag,index) {
        let self = this;
        let tags = tag;
        self.$set(self.lessontab['list'][index],'tag',!tags)
        /**
         * this.$set(self.lessontab['list'][index]) 数据数组对象的第index项  'tag' 数组对象的某一项的标记  tags要修改后的值
         */
    },
    getOut(){
        let self = this;
        self.$layer.open({
            type:0,
            content: '你确要退出登录么？',
            shade:true,
            time:2,
            anim:'scale',
            success(layer) {
                console.log('layer id is:',layer.id)
            },
            yes(index) {
                let params = {
                    token:store.state.token
                }
                store.commit(types.LOGOUT)
                base.postUrl(API.allUrl.logout,params).then((res) => {
                    if(res.code == 200 && res.success == 1) {
                        self.$layer.close(index)
                        self.$router.push('/')
                    }
                })
            },
            end() {
                console.log('end')
            }
        });
    },
    goNext(){
        let self = this;
        self.$layer.open({
            type:0,
            content: '确定开始下一环节？',
            shade:true,
            time:2,
            anim:'scale',
            success(layer) {
                console.log('layer id is:',layer.id)
            },
            yes(index) {
                let params = {
                    token:store.state.token,
                    batch:store.state.batch
                }
                base.postUrl(API.allUrl.nextStep,params).then((res) => {
                    if(res.code == 200 && res.success == 1) {
                        self.$layer.close(index);
                        base.showMsg(res.msg)
                        self.reload()
                    }else{
                        base.showMsg("没有下一个流程模块!!!")
                    }
                })
            },
            end() {
                console.log('end')
            }
        });
    },
    getMenu() {
        let params = {
            token:store.state.token,
            batch:store.state.batch
        }
        base.getUrl(API.allUrl.course_m_info,params).then((res) => {
            console.log(res)
        })
    }
},
created(){
    this.nowUrl = this.$route.path
    if(store.state.userType == 0) {
        this.beforetab.list = menu.stumenu.beforetab
        this.lessontab.list = menu.stumenu.lessontab
        this.aftertab.list = menu.stumenu.aftertab
    }else if(store.state.userType == 1) {
        this.beforetab.list = menu.teamenu.beforetab
        this.lessontab.list = menu.teamenu.lessontab
        this.aftertab.list = menu.teamenu.aftertab
    }
    //获取菜单
    this.getMenu();
    base.getMenuStep()
}
}
</script>
<style lang='less' scoped>
@fcolor:#5c5a5a;
.right-wrapper{
    width: 3.08rem;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #fff;
    .user-info{
        height: 1.2rem;
        position: relative;
        padding: 0.3rem 0;
        .left-pic{
            position: absolute;
            left: 0rem;
            width: 35%;
        }
        .right-info{
            position: absolute;
            left: 35%;
            width: 65%;
        }
       .headerpic{
           width: 0.65rem;
           height: 0.65rem;
           border-radius: 50%;
       } 
    }
    .list{
        text-indent: 70*0.4*0.02rem;
        .side-title{
            font-size: 0.28rem;
            color: @fcolor;
            margin: 0.2rem 0;
            background-color: rgba(0,0, 0, 0.1);
            height: 80*0.4*0.02rem;
            line-height: 80*0.4*0.02rem;
            &.first-title{
                margin-top: 150*0.4*0.02rem;
            }
        }
        .spec-title{
            font-size: 0.28rem;
            color: @fcolor;
            margin: 0.2rem 0;
            &.first-title{
                margin-top: 150*0.4*0.02rem;
            }
        }
        .menu{
            &>li{
                line-height: 60*0.4*0.02rem;
                min-height: 60*0.4*0.02rem;
                margin: 40.6*0.04*0.02rem auto;
                &>a{
                    color: @fcolor;
                    font-size: 0.24rem;
                    display: block;
                    width: 255*0.4*0.02rem;
                    margin: 0 auto;
                    position: relative;
                    text-indent: 0;
                    .iconfont{
                        position: absolute;
                        right: 0;
                        top: 0;
                        font-size: 0.2rem;
                        color: #666666;
                    }
                    &.tabborder-bottom{
                        padding-bottom: 15*0.4*0.02rem;
                        border-bottom: 1px solid #666666;
                    }
                }
                &.active{
                    background-color: #6C63FF;
                    a{
                        color: #ffffff;
                        font-size: 0.24rem;
                    }
                }
                .secondary{
                    li{
                        padding-left: 35*0.4*0.02rem;
                        a{
                            font-size: 0.2rem;
                            color: @fcolor;
                        }
                        &.active{
                            background-color: #6C63FF;
                            a{
                                color: #ffffff;
                                font-size: 0.24rem;
                            }
                        }
                    }
                }
            }
        }
        &.loginout{
             line-height: 60*0.4*0.02rem;
            min-height: 60*0.4*0.02rem;
             background-color: rgba(0,0, 0, 0.1);
            a{
                display: block;
                width: 2.04rem;
                border-radius: 4px;
                height: 0.8rem;
                margin: 0 auto;
                line-height: 0.8rem;
                color: @fcolor;
                font-size: 0.24rem;
                text-align: left;
                font-size: 0.28rem;
                text-indent: 0;
            }
        }
    }
    
}
</style>