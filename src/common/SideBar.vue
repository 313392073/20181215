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
    <div class="list" style="margin-top:0.4rem;">
        <p class="side-title">{{beforetab.title}}</p>
        <ul class="before-class menu">
            <li v-for="item in beforetab.list" :key="item.name" >
                <a @click="goRoute(item.url)">{{ item.name}}</a>
            </li>
        </ul>
    </div>
    <div class="list">
        <p class="side-title">{{lessontab.title}}</p>
        <ul class="lesson-learn menu">
            <li v-for="(item,index) in lessontab.list" :key="item.name">
                 <template v-if="item.list">
                    <a href="javascript:void(0);"  @click="slideToggle(item.tag,index)">{{item.name}}
                        <span :class="item.tag? 'iconfont icon-sanjiaoxing':'iconfont icon-sanjiaoxing1'"></span>
                    </a>
                 </template>
                 <template v-else>
                     <a href="">{{item.name}}</a>
                 </template>
                <template v-if="item.list">
                     <ul class="secondary" v-if="item.tag">
                         <li v-for="sub in item.list" :key="sub.name">
                            <a @click="goRoute(sub.target)">{{ sub.name }}</a>
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
                <a @click="goRoute(item.url)">{{ item.name }}</a>
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
        list:[{name:'在线测试',url:'/PracticReport'},{name:'寻找棱锥',url:'/FindPyramid'},{name:'制作棱锥',url:'/MakePyramid'}]
    },
    lessontab:{
        title:'课堂学习',
        list:[
             {
                name:'作业分享',
                url:'/TeaHomeworkShare',
             },
             {
                name:'正棱锥表面积',
                url:'/RegularAreaFormula',
                tag:false,
                list:[
                   {name:'视频分享',target:'/VideoShare'},
                    {name:'侧面积公式',target:'/SideAreaFormula' },
                    {name:'表面积公式',target:'/regchecktotal' },
                    {name:'计算表面积',target:'/RegularAreaFormula' },
                ]
            },
            {
                name:'正棱锥体积',
                url:'/show',
                tag:false,
                list:[
                   {name:'体积公式',target:'/LearningReport' },
                    {name:'计算体积',target:'/TestReport' },
                ]
            },
            {
                name:'在线关系',
                url:'',
                tag:false,
                list:[
                   {name:'分组讨论',target:'/PracticReport' },
                    {name:'小组汇报',target:'/JobResults' },
                    {name:'课堂总结',target:'ClassTotalResult' },
                ]
            },
         ]
    },
    aftertab: {
        title:'课后拓展',
        list:[{name:'课后习题',url:'/HomeworkProblems'},{name:'课后实验',url:'/AftClaExp'},{name:'分享体会',url:'TeaHomeworkShare'}]
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
    goRoute:function(url){
        this.$router.push(url)
    },
    slideToggle:function(tag,index){
        let self = this;
        let tags = tag;
        self.$set(self.lessontab['list'][index],'tag',!tags)
        /**
         * this.$set(self.lessontab['list'][index]) 数据数组对象的第index项  'tag' 数组对象的某一项的标记  tags要修改后的值
         */
    }
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
                color: @fcolor;
                font-size: 0.24rem;
                text-align: center;
            }
        }
    }
    
}
</style>