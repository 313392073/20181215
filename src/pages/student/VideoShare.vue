<!--  -->
<template>
<div class="wrapper">
<div class="left-wrapper">
<div class="left-box">
    <div class="desc-menu">视频分享<a class="refresh-btn" href="javascript:void(0)" @click="getrefresh"><img src="../../assets/images/refresh.png" alt="refresh.png">刷新</a></div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">视频上传</h3>
        <div class="main-box">
            <p class="main-title">美美的包装盒做好啦~上传属于你的包装盒制作过程的视频，和同学们一起探讨棱锥的奥秘吧！</p>
            <div class="upload-box">
                <input type="file" name="file" accept="video/mp4,video/ogg,video/WebM" ref="filElem" class="upload-file" @change="uploadVideo">
                <img @click="chooseVideo" :src="defaultUrl" alt="upload" class="default-bg">
            </div>
            <div class="btn-box" v-if="isInArray"><a href="javascript:void(0)" @click="saveVideo">保存并上传</a></div>
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
import defaultUrls from '../../assets/images/upload.png'
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
    defaultUrl:defaultUrls,
    batch:'',
    isInArray:false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getrefresh(){
        this.reload();
    },
    chooseVideo(){
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },
    uploadVideo(){
        let self = this;
        let fileMaxSize = 1024*500;//1M
        let file = self.$refs.filElem.files[0];
        if(file.size/fileMaxSize > fileMaxSize){
            self.tipsMsg = '视频过大 不能上传'
            self.toggleTips = true;
            return false;
        }
        if (!/video\/\w+/.test(file.type)) {
            self.tipsMsg = '请注意上传视频的格式！'
            self.toggleTips = true;
            return false;
        }
    },
    saveVideo(){
        let self = this;
        var formData = new FormData();
            formData.append("file", self.$refs.filElem.files[0]);
            if(formData.get('file') != 'undefined'){
                Axios({
                    method:'post',
                    baseURL:base.baseURL,
                    url:API.allUrl.upload+'?token='+store.state.token+'&batch='+self.batch+'&fileType=6',
                    data:formData,
                }).then((res) => {
                    if(res.data.code == 200 && res.data.success == 1) {
                        self.$router.push('/stuvidedetail')
                    }else{
                        self.tipsMsg = '网络错误，上传头像失败'
                        self.toggleTips = true;
                        return false;
                    }
                })
            }else{
                 let self = this;
                self.$layer.open({
                    type:0,
                    content: '网络错误',
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
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    let self = this
    let num = 5
    base.getMenuStep().then((res) => {
        self.isInArray = base.arrContain(res,num)
        if(self.isInArray == false) {
            this.$router.push('/stuvidedetail')
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
    .title{
        height: 160*0.4*0.02rem;
        line-height: 160*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 91.24%;
        margin: 0 auto 70*0.4*0.02rem;
        .main-title{
            font-size: 35*0.4*0.02rem;
            color: @fcolor;
            height: 100*0.4*0.02rem;
            line-height: 100*0.4*0.02rem;
        }
        .upload-box{
            width: 100%;
            height: 1000*0.4*0.02rem;
            padding: 55*0.47*0.02rem 0;
            border: 1px dashed #cdcdcd;
            text-align: center;
            .default-bg{
                width: 1140*0.4*0.02rem;
                height: auto;
            }
            .upload-file{
                display: none;
            }
        }
      
        .btn-box{
            width: 100%;
            margin: 100*0.4*0.02rem auto ;
            display: flex;
            justify-content: center;
            align-items: center;
            a{
                width: 500*0.4*0.02rem;
                height: 104*0.4*0.02rem;
                line-height: 104*0.4*0.02rem;
                background-color: #6c63ff;
                color: #ffffff;
                font-size: 35*0.4*0.02rem;
                text-align: center;
                margin: auto;
                border-radius: 104*0.4*0.02rem;
            }
        }
    }
}
</style>