<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>教师选课</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <div class="check-box">
             <label class="labelBox" v-for="(item,index) in classList" :key="index" :checked="index==0?true:false">
                <input type="radio"  name="names" :value="item.sys_class_id" v-model="sysclassId"/>
                <span>{{item.majorname}}<b>·</b>{{item.classname}}</span>
            </label>
        </div>
        <div class="btns-box">
            <a href="javascript:void(0)" @click="submitChange">模块调整</a>
            <a href="javascript:void(0)" @click="submitMajor">重新开课</a>
        </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import base from '../../router/http/base.js'
import API from '../../router/http/api.js';
export default {
//import引入的组件需要注入到对象中才能使用

data() {
//这里存放数据
return {
    classList:[],
    sysclassId:6
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    submitMajor(){
        let self = this;
        localStorage.setItem('sysclassId',self.sysclassId)
        self.$router.push({name:'SelectUnit',params:{classid:self.sysclassId}})
    },
    submitChange() {
        let self = this;
        self.$router.push({name:'SelectChange',params:{classid:self.sysclassId}})
    },
    goBack(){
        this.$router.go(-1)
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this;
    let params = {
        userType:0,
        majorId:3
    }
    base.getUrl(API.allUrl.getInfo,params).then((res) => {
        if(res.code == 200 && res.success == 1) {
            this.classList = res.obj
            this.sysclassId = res.obj?res.obj[0]['sys_class_id']:'0'
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
            color: #1c94ed;
            font-size: 40*0.4*0.02rem;
            font-weight: bold;
        }
    }
    .main-wrapper{
        width: 100%;
        margin: 0 auto 70*0.4*0.02rem;
        padding-right:1.84%;
        padding-left: 5.53%;
        .check-box{
            width: 92%;
            min-height: 2rem;
            margin: 0.5rem auto;
            background-color: #eff3f6;
            box-sizing: border-box;
            padding: 1rem;
            .labelBox{
                position: relative;
                display: inline-block;
                width: 420*0.4*0.02rem;
                height: 140*0.4*0.02rem;
                line-height: 140*0.4*0.02rem;
                background-color: #fff;
                text-align: center;
                border-radius: 4px;
                margin: 0 50*0.4*0.02rem 50*0.4*0.02rem 0;
                input[type="radio"]{
                    position: absolute;
                    width: 50*0.4*0.02rem;
                    height: 50*0.4*0.02rem;
                    bottom: -25*0.4*0.02rem;
                    left: 210*0.4*0.02rem;
                    margin-left: -25*0.4*0.02rem;
                }
                &>span{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    color:#1c94ed;
                    border-radius: 4px;
                    font-size: 34*0.4*0.02rem;
                }
                input[type="radio"]:checked+span{
                    background-color:#1c94ed;
                    color:#fff;
                }
            }
        }
        .btns-box{
            text-align: right;
            padding-right: 80*0.4*0.02rem;
            a{
                display: inline-block;
                margin-right: 30*0.4*0.02rem;
                width:220*0.4*0.02rem;
                height:100*0.4*0.02rem;
                line-height:100*0.4*0.02rem;
                text-align: center;
                color:#fff;
                background-color:#1c94ed;
                border-radius: 5px;
                font-size: 30*0.4*0.02rem;
            }
        }
    }
}
</style>