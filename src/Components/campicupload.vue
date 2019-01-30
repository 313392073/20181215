<!--  -->
<template>
<div class='box'>
    <button @click="tesCamera" type="button">按钮</button>
    <div>
        <img class="headpic" :src="headpic" />
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
_typedata = 0
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    headpic: ''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    tesCamera() {
        let that = this;
        //调用原生系统弹出按钮选择框
        let page = null;
        page = {
            imgUp: function() {
                plus.nativeUI.actionSheet({
                    cancel: "取消",
                    buttons: [{
                            title: "拍照"
                        },
                        {
                            title: "从相册中选择"
                        }
                    ]
                }, function(e) {
                    //1 是拍照  2 从相册中选择 
                    switch(e.index) {
                        case 1:
                            _typedata = 1
                            getImage();
                            break;
                        case 2:
                            _typedata = 2
                            appendByGallery();
                            break;
                        default:
                            break;
                    }
                });
            }
        }
        // 拍照函数
        function getImage() {
            let cmr = plus.camera.getCamera();
            cmr.captureImage(function(p) {
                plus.io.resolveLocalFileSystemURL(p, function(entry) {
                    that.compressImage(entry.toLocalURL(), entry.name);
                }, function(e) {
                    plus.nativeUI.toast("读取拍照文件错误：" + e.message);
                });
            }, function(e) {
                plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            }, {
                filename: '_doc/camera/',
                index: 1
            });
        }

        //选择相片文件
        function appendByGallery() {
            plus.gallery.pick(function(path) {
                plus.io.resolveLocalFileSystemURL(path, function(entry) {
                    that.compressImage(entry.toLocalURL(), entry.name);
                }, function(e) {
                    plus.nativeUI.toast("读取文件错误：" + e.message);
                });
            });
        }
        // 弹出系统选择按钮框  
        page.imgUp();
    },
    compressImage(url,filename){
        let that = this;
        var name="_doc/upload/"+"-"+filename;//_doc/upload/F_ZDDZZ-1467602809090.jpg   
        plus.zip.compressImage({   
            src:url,//src: (String 类型 )压缩转换原始图片的路径   
            dst:name,//压缩转换目标图片的路径   
            quality:20,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100   
            overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件   
        },   
        function(event) { 
            //上传文件的参数
            let params = {
                imgUrl:event.target,
                imgName:filename,
                imgSize:event.size
            }
            that.headpic = event.target
        },function(error) {   
            plus.nativeUI.toast("压缩图片失败，请稍候再试");   
        });   
    },
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
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>