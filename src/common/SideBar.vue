<!--  -->
import func from './vue-temp/vue-editor-bridge';
<template>
<div class="right-wrapper">
    <div class="user-info clearfix" style="display: none">
        <div class="left-pic">
            <img src="images/user.png" alt="headerpic" class="headerpic">
        </div>
        <div class="right-info">
            <p class="user-name">Jordon J</p>
            <p class="user-name">Administrator</p>
        </div>
    </div>
    <div class="list">
        <p class="side-title">{{beforetab.title}}</p>
        <ul class="before-class menu">
            <li v-for="item in beforetab.list" :key="item.name" >
                <a href="">{{ item.name }}</a>
            </li>
        </ul>
    </div>
    <div class="list">
        <p class="side-title">{{lessontab.title}}</p>
        <ul class="lesson-learn menu">
            
            <li v-for="(item,index) in lessontab.list" :key="item.name">
                 <template v-if="item.list">
                    <a href="javascript:void(0);" :class="item.tag? 'show':'hide'"  @click="slideToggle(item.tag,index)">{{item.name}}
                        <span :class="item.tag? 'iconfont icon-sanjiaoxing':'iconfont icon-sanjiaoxing1'"></span>
                    </a>
                 </template>
                 <template v-else>
                     <a href="">{{item.name}}</a>
                 </template>
                <template v-if="item.list">
                     <ul :class="item.tag?'secondary show':'secondary hide'">
                         <li v-for="sub in item.list" :key="sub.name">
                            <a href="">{{ sub.name }}</a>
                        </li>
                     </ul>
                </template>
            </li>
        </ul>
    </div>

    <div class="list">
        <p class="side-title">{{aftertab.title}}</p>
        <ul class="after-class menu">
           <li v-for="item in aftertab.list" :key="item.name">
                <a href="">{{ item.name }}</a>
            </li>
        </ul>
    </div>
    <div class="loginout list" style="display: none">
        <a href="">退出登录</a>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    beforetab: {
        title:'课前预习',
        list:[{name:'在线测试',url:''},{name:'寻找棱锥',url:''},{name:'制作棱锥',url:''}]
    },
    lessontab:{
        title:'课堂学习',
         list:[
             {
                name:'作业分享',
                url:'',
             },
             {
                name:'正棱锥表面积',
                url:'',
                tag:false,
                list:[
                   {name:'视频分享',target:'' },
                    {name:'侧面积公式',target:'' },
                    {name:'表面积公式',target:'' },
                    {name:'计算表面积',target:'' },
                ]
            },
            {
                name:'正棱锥体积',
                url:'',
                tag:false,
                list:[
                   {name:'体积公式',target:'' },
                    {name:'计算体积',target:'' },
                ]
            },
            {
                name:'在线关系',
                url:'',
                tag:false,
                list:[
                   {name:'分组讨论',target:'' },
                    {name:'小组汇报',target:'' },
                    {name:'课堂总结',target:'' },
                ]
            },
         ]
    },
    aftertab: {
        title:'课后拓展',
        list:[{name:'课后习题',url:''},{name:'课后实验',url:''},{name:'分享体会',url:''}]
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    
},
//方法集合
methods: {
    slideToggle:function(tag,index){
        let self = this;
        let tags = tag;
        console.log(self.beforetab[0])
    }
}
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@keyframes hide {
    form {
        display:block;
        opacity: 1;
        height: auto; 
    }
    to{
        opacity: 0;
        height: 0;
        display:none;
    }
}
@-webkit-keyframes hide {
    form {
        display:block;
        opacity: 1;
        height: auto; 
    }
    to{
        opacity: 0;
        height: 0;
        display:none;
    }
}

@keyframes show {
    form {
        opacity: 0;
        height: 0;
        display:none;
    }
    to{
        display:block;
        opacity: 1;
        height: auto;
    }
}

@keyframes hide {
    form {
        opacity: 0;
        height: 0;
        display:none;
    }
    to{
        display:block;
        opacity: 1;
        height: auto;
    }
}
.right-wrapper{
    width: 2.4rem;
    height: 100%;
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
        text-indent: 0.3rem;
        .side-title{
            font-size: 0.28rem;
            color: #5c5a5a;
            margin: 0.2rem 0;
        }
        .menu{
            border-bottom: 1px solid #666666;
            &.after-class{
                border-bottom: none;
            }
            &>li{
                line-height: 0.5rem;
                min-height: 0.5rem;
                &>a{
                    color: #5c5a5a;
                    font-size: 0.24rem;
                    position: relative;
                    .iconfont{
                        margin-left: 0.02rem;
                        font-size: 0.2rem;
                        color: #666666;
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
                    &.hide{
                        display: none;
                    }
                    &.show{
                        display: block;
                    }
                    li{
                        text-indent: 0.55rem;
                        a{
                            font-size: 0.2rem;
                            color: #5c5a5a;
                        }
                    }
                    
                }
            }
        }
        &.loginout{
            a{
                display: block;
                width: 90%;
                border-radius: 4px;
                height: 0.5rem;
                margin: 0 auto;
                line-height: 0.5rem;
                background-color: #666666;
                color: #5c5a5a;
                font-size: 0.24rem;
                text-align: center;
            }
        }
    }
}
</style>