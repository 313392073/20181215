<template>
<div class="right-wrapper">
    <div class="user-info clearfix">
        <div class="left-pic">
            <img :src="headerUrl" alt="headerpic" class="headerpic">
        </div>
        <div class="right-info">
            <p class="user-name">{{userName}}</p>
        </div>
    </div>
    <div class="list" v-if="isTea">
        <p class="spec-title" @click="goRoute('/teaselectclass')">课程设置</p>
        <p class="spec-title spec-next" @click="goNext">下一环节</p>
    </div>

    <div class="list" v-if="menuList.length > 0" v-for="(item,index) in menuList" :key="index">
        <p :class="role == 0 && index == 0?'line line-hide':'line'"></p>
        <p class="side-title">{{item.menu_name}}</p>
            <ul class="menu" v-if="role == 0">
                <li v-for="(subItem,subIndex) in item.child_menus" :key="subIndex" :class="nowUrl == subItem.menu_url_stu?'active':''">
                    <template v-if="subItem.child_menus.length>0">
                        <a href="javascript:void(0);"  @click="slideToggle(subItem.tag,index+'_'+subIndex)">{{subItem.menu_name}}
                            <span :class="subItem.tag? 'iconfont icon-sanjiaoxing':'iconfont icon-sanjiaoxing1'"></span>
                        </a>
                        <ul class="secondary" v-if="subItem.tag">
                            <li v-for="sub in subItem.child_menus" :key="sub.menu_name" :class="nowUrl == sub.menu_url_stu?'active':''" v-if="sub.menu_url_stu">
                                <a href="javascript:void(0);" @click="goRoute(sub.menu_url_stu)">{{ sub.menu_name }}</a>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <a href="javascript:void(0);"  @click="goRoute(subItem.menu_url_stu)" v-if="subItem.menu_url_stu">{{subItem.menu_name}}</a>
                    </template>
                </li>
            </ul>
            <ul class="menu" v-if="role == 1">
                <li v-for="(subItem,subIndex) in item.child_menus" :key="subIndex" :class="nowUrl == subItem.menu_url_teacher?'active':''">
                    <template v-if="subItem.child_menus.length>0">
                        <a href="javascript:void(0);"  @click="slideToggle(subItem.tag,index+'_'+subIndex)">{{subItem.menu_name}}
                            <span :class="subItem.tag? 'iconfont icon-sanjiaoxing':'iconfont icon-sanjiaoxing1'"></span>
                        </a>
                        <ul class="secondary" v-if="subItem.tag">
                            <li v-for="sub in subItem.child_menus" :key="sub.menu_name" :class="nowUrl == sub.menu_url_teacher?'active':''" v-if="sub.menu_url_teacher">
                                <a href="javascript:void(0);" @click="goRoute(sub.menu_url_teacher)">{{ sub.menu_name }}</a>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <a href="javascript:void(0);" v-if="subItem.menu_url_teacher"  @click="goRoute(subItem.menu_url_teacher)">{{subItem.menu_name}}</a>
                    </template>
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
    role:0,
    headerUrl:'',
    userName:'',
    menuList:[]
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
        localStorage.setItem('lasturl_'+this.role,url);
        this.$router.push(url)
        //访问菜单url历史记录
        // plus.storage.setItem("rolemenu_"+store.state.userType,url)
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
                localStorage.removeItem('hasSubmit')
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
                    console.log(res)
                    if(res.code == 200 && res.success == 1) {
                        if(res.obj == 0) {
                            base.showMsg('没有下一个模块!')
                        }else{
                            self.$layer.close(index);   
                            self.reload()
                        }
                    }else{
                        base.showError('网络错误，请稍后再试')
                    }
                })
            },
            end() {
                console.log('end')
            }
        });
    },
    getMenu() {
        let self = this;
        let params = {
            token:store.state.token,
            batch:store.state.batch
        }
        base.getUrl(API.allUrl.course_m_info,params).then((res) => {
            console.log(res)
           if(res.success == 1 && res.code == 200) {
                if(res.obj.length > 0) {
                    res.obj.forEach((item,index) => {
                        if(item.child_menus.length > 0) {
                            item.child_menus.forEach((subItem,subIndex) => {
                                if(subItem.child_menus.length > 0) {
                                    res.obj[index]['child_menus'][subIndex]['tag'] = true
                                }
                            })
                        }
                    })
                }
                self.menuList = res.obj
            }else{
                base.showMsg(res.msg)
            }
        })
    },
    slideToggle(tag,sub) {
        let self = this;
        let tags = tag;
        let index = sub.split('_')[0]*1;
        let pindex = sub.split('_')[1]*1;
        console.log(tag,index)
        self.$set(self.menuList[index]['child_menus'][pindex],'tag',!tags)
    }
},
created(){
    this.nowUrl = this.$route.path
    this.role = store.state.userType
    //获取菜单
    this.headerUrl = store.state.user?JSON.parse(store.state.user)['userHeadImage']:''
    this.userName = store.state.user?JSON.parse(store.state.user)['userName']:''
    this.getMenu();
    //获取环节标记点
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
            width: 40%;
            text-align: center;
        }
        .right-info{
            position: absolute;
            left: 40%;
            width: 60%;
            height: 0.6rem;
            line-height: 0.6rem;
        }
       .headerpic{
           width: 0.65rem;
           height: 0.65rem;
           border-radius: 50%;
       } 
    }
    .list{
        text-indent: 70*0.4*0.02rem;
        .line{
            margin-left: 10%;
            width: 80%;
            height: 0;
            border-top: 1px solid #5c5a5a;
            margin-top: 0.1rem;
            &.line-hide{
                display: none;
            }
        }
        .side-title{
            font-size: 0.28rem;
            color: @fcolor;
            margin: 0.1rem 0 0.2rem;
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
            &.spec-next{
                color: #6c63ff;
                font-weight: bold;
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
            background-color: rgba(0,0, 0, 0.3);
            margin-bottom: 50*0.4*0.02rem;
            a{
                display: block;
                width: 2.04rem;
                border-radius: 4px;
                height: 0.8rem;
                margin: 0 auto;
                line-height: 0.8rem;
                color: #ffffff;
                font-size: 0.24rem;
                text-align: left;
                font-size: 0.28rem;
                text-indent: 0;
            }
        }
    }
    
}
</style>