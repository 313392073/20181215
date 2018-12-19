<!--  -->
<template>
<div class="wrapper">
    <div class="left-wrapper">
    <div class="left-box">
        <div class="desc-menu">寻找棱锥</div>
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
                                    <option value="">数学二组</option>
                                    <option value="">数学二组</option>
                                    <option value="">数学二组</option>
                                    <option value="">数学二组</option>
                                </select>
                            </div>
                        </div>
                        <div class="group-item">
                            <label>分组方式</label>
                            <div class="group-type-box clearfix">
                                <label class="choose" for="sj"><input type="radio" name="grouptype" id="sj" value="1" checked>随机分组<span></span></label>
                                <label class="choose" for="sd" ><input type="radio" name="grouptype" id="sd"  value="2">手动分组<span></span></label>
                                <label class="choose" for="sex"><input type="radio" name="grouptype" id="sex" value="3">性别分组<span></span></label>
                                <label class="choose" for="yz"><input type="radio" name="grouptype" id="yz" value="4">异质分组<span></span></label>
                            </div>
                        </div>
                        <div class="group-item">
                            <label for="">每组人数</label>
                            <div class="group-process-box change-process-box">
                                <div class="group-process change-process">
                                    <p><i></i></p>
                                </div>
                                <input type="text" readonly name="num" value="4人" id="group-num">
                            </div>
                        </div>
                        <div class="group-item">
                            <label for="">小组数量</label>
                            <div class="group-process-box change-process-box">
                                <div class="group-process change-process">
                                    <p><i></i></p>
                                </div>
                                <input type="text" readonly name="num" value="4组" id="group-num">
                            </div>
                        </div>
                        <div class="group-desc">
                            <h3>分组说明</h3>
                            <p>1、异质分组是按照课前练习的成绩进行分组</p>
                            <p>2、“分组人数”和“小组数量”中确顶一个参数，另外一个参数会自动调整</p>
                            <p>3、点击学生头像即可指定组长</p>
                        </div>
                        <div class="group-submit"><a href="javascript:void(0)" class="sbtn">确认分组</a></div>
                    </form>
                </div>
                <div class="main-right">
                    <div class="refresh-box"><a href=""><img src="../assets/images/refresh.png" alt="refresh.png"></a></div>
                    <div class="group-wrapper clearfix">
                        <div class="item clearfix" v-for="item in 4" :key="item">
                            <div class="item-left">A组</div>
                            <div class="item-right">
                                <div class="sub-item" v-for="subitem in 4" :key="subitem">
                                    <img src="../assets/images/default.png" alt="default">
                                    <p>流星雨</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tips">
            <div class="main-tips">
                <img class="tip-img" src="../assets/images/default.png" alt="">
                <p class="tips-title">确认分组</p>
                <div class="tips-msg">
                    <p>已完成小组分配，每组4人，共4组！</p>
                </div>
                <div class="tips-btn"><button class="cbtn tbtn">确认</button></div>
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
export default {
//import引入的组件需要注入到对象中才能使用
components: {SideBar},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
                        background: url("../assets/images/downsj.png") no-repeat scroll 95% center transparent;
                    }
                }
                .group-type-box{
                    .choose{
                        display: inline-block;
                        width: 49%;
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
                            background:url("../assets/images/uncheck.png") no-repeat center;
                            background-size: cover;
                        }
                        input[type="radio"]:checked+span {
                            background:url("../assets/images/checked.png") no-repeat center;
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
            .refresh-box{
                height: 120*0.4*0.02rem;
                text-align: right;
                img{
                    width: 60*0.4*0.02rem;
                    height: 60*0.4*0.02rem;
                }
            }
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
                        float: left;
                        width: calc(~"26.56% - 1px");
                        height: 100%;
                        border-right: 1px dashed #e6e6e6;
                        font-size: 48*0.4*0.02rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 490*0.4*0.02rem;
                    }
                    .item-right{
                        float: right;
                        width: 73.44%;
                        text-align: center;
                        font-size: 34*0.4*0.02rem;
                        padding: 40*0.4*0.02rem 20*0.4*0.02rem;
                        .sub-item{
                            float: left;
                            width: 50%;
                            margin-bottom: 30*0.4*0.02rem;
                            img{
                                width: 140*0.4*0.02rem;
                                height: 140*0.4*0.02rem;
                                margin-bottom: 15*0.4*0.02rem;
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
    // z-index: -1;
    // opacity: 0;
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
        box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
        border-top: 2px solid #6c63ff;
        text-align: center;
        .tip-img{
            max-width: 2rem;
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