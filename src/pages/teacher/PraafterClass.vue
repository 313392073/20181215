<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
  <div class="left-box">
    <div class="desc-menu"><i class="iconfont icon-2fanhui" @click="goBack"></i>课后练习<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">推送教学课件</h3>
        <div class="main-box">
            <div class="upload-box">
                <p class="icon-upload"><i class="iconfont icon-shangchuan"></i></p>
                <p class="upload-desc">选择需要上传的课件,支持PDF,PPTX,DOCX,JPG,MP4等常见文档 图片 视频格式</p>
                <input type="file" name="file" accept="*" ref="filElem" class="upload-file" @change="upload">
                <div class="next-btn"><button class="nbtn" @click="choose">{{chooseFile}}</button></div>
            </div>
            <div class="item clearfix" v-for="item in 3" :key="item" style="display:none">
                <div class="item-icon"><img src="../../assets/images/group-pic.png" alt="group-pic"></div>
                <div class="item-desc">
                    <p class="item-name">选择需要上传的课件</p>
                    <p class="item-process">6.5/12.8M <span class="item-num">258K/S</span></p>
                    <div class="process"><p class="pro-num"></p></div>
                </div>
                <div class="item-tag"><i class="iconfont icon-xuanzhong"></i></div>
            </div>
            <div class="back-btn" v-if="isInArray"><button class="btn" @click="save">上传</button></div>
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
    batch:'',
    chooseFile:'选择文件',
    isInArray:false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    goBack(){
        this.$router.go(-1)
    },
    getrefresh(){
        this.reload();
    },
    choose(){
        this.$refs.filElem.dispatchEvent(new MouseEvent('click')) 
    },
    upload(){
        let self = this;
        let fileMaxSize = 1024;//1M
        let file = self.$refs.filElem.files[0];
        this.chooseFile = '文件已选择'
        if(file.size/fileMaxSize > fileMaxSize){
            self.tipsMsg = '图片过大 不能上传'
            self.toggleTips = true;
            return false;
        }
        if (!/image\/\w+/.test(file.type)) {
            self.tipsMsg = '请注意上传图片的格式！'
            self.toggleTips = true;
            return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            self.defaultUrl = reader.result;
        }
    },
    save(){
        let self = this;
        var formData = new FormData();
            formData.append("file", self.$refs.filElem.files[0]);
            if(formData.get('file') != 'undefined'){
                Axios({
                    method:'post',
                    baseURL:base.baseURL,
                    url:API.allUrl.upload+'?token='+store.state.token+'&batch='+self.batch+'&fileType=12',
                    data:formData,
                }).then((res) => {
                    if(res.data.code == 200 && res.data.success == 1) {
                        self.$router.push('/teacoursemanagement')
                    }else{
                    self.tipsMsg = '网络错误，上传头像失败'
                    self.toggleTips = true;
                    return false;
                    }
                })
            }else{
                alert('网络错误');
            }
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this;
    let params = {
        token:store.state.token
    }
    if(store.state.batch) {
        self.batch = store.state.batch
    }else{
        base.getUrl(API.allUrl.batch,params).then(res => {
            if(res.code == 200 && res.success ==  1) {
                self.batch = res.obj;
            }
        })
    }
    

    let num = 8
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
.left-box{
    height: 100%;
    width: 100%;
    .title{
        height: 106*0.4*0.02rem;
        line-height: 106*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 73.67%;
        margin: 0 auto 70*0.4*0.02rem; 
        .upload-box{
            width: 1030*0.4*0.02rem;
            margin: 0 auto;
            height: 522*0.4*0.02rem;
            border: 1px dashed #c3d2d9;
            border-radius: 12px;
            box-shadow: 0 0 5px 3px rgba(0,0,0,0.1);
            padding: 0 110*0.4*0.02rem 50*0.4*0.02rem;
            font-size: 34*0.4*0.02rem;
            color: @fcolor;
            .upload-file{
                display: none;
            }
            .icon-upload{
                text-align: center;
                i{
                    font-size: 140*0.4*0.02rem;
                    color: #6c63ff;
                }
            }
            .upload-desc{
                line-height: 60*0.4*0.02rem;
            }
            .next-btn{
                width: 100%;
                margin: 55*0.4*0.02rem auto 0;
                text-align: center;
                .nbtn{
                    display: block;
                    width: 345*0.4*0.02rem;
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
        .item{
            width: 100%;
            height: 200*0.4*0.02rem;
            box-shadow: 0 0 3px 1px rgba(0,0,0,0.1);
            padding: 45*0.4*0.02rem 55*0.4*0.02rem;
            margin-top: 40*0.4*0.02rem;
            .item-icon{
                float: left;
                width: 114*0.4*0.02rem;
                height: 114*0.4*0.02rem;
                margin-right: 30*0.4*0.02rem;
                img{
                    max-width: 100%;
                    height: 100%;
                }
            }
            .item-desc{
                float: left;
                width: calc(~"100% - 280*0.4*0.02rem");
                .item-name{
                    font-size: 34*0.4*0.02rem;
                }
                .item-process{
                    position: relative;
                    font-size: 30*0.4*0.02rem;
                    color: #c3d2d9;
                    .item-num{
                        position: absolute;
                        right: 0;
                    }
                }
                .process{
                    width: 100%;
                    height: 20*0.4*0.02rem;
                    border-radius: 20*0.4*0.02rem;
                    background-color: #c3d2d9;
                    position: relative;
                    .pro-num{
                        position: absolute;
                        width: 20%;
                        height: 100%;
                        border-radius: 20*0.4*0.02rem;
                        background-color: #f34e19;
                        &.pro-blue{
                            background-color: #3a80fc;
                        }
                    }
                }
            }
           .item-tag{
               float: right;
               width: 120*0.4*0.02rem;
               height: 120*0.4*0.02rem;
               text-align: center;
               i{
                   font-size: 75*0.4*0.02rem;
                   color: #bf3232;
               }
           }
        }
        .back-btn{
            width: 100%;
            margin: 80*0.4*0.02rem auto 0;
            text-align: center;
            .btn{
                display: block;
                width: 345*0.4*0.02rem;
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
</style>