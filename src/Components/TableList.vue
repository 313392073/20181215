<!--  -->
<template>
<div class=''></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';


/**
 * 在页面注入App.vue 组件提供（provide）的reload依赖
 * 在逻辑完成之后（删除或添加。。。） 直接this.reload()调用
 * 即可刷新当前页面
 */
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
inject:['reload'], //注入reload方法
name:'table_user',
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
    getList() {
        this.listLoading = true;
        req.post('/url',this.listLoading)
        .then((res) => {
            if(res.data.code == 0) {
                this.list = res.data.datas;
                this.total = res.datas.totalRecord
            }
            this.listLoading = false
        }).catch( (error) => {
            console.log(error)
        })
    },
    /** 
     * 这样再次调用获取数据  即可同步实现页面数据更新（不会重新刷新页面）
     * 同时保证有分页时 能够停留在当前页面（刷新前如果时第二页 刷新后依然在第二页）
     * 即其他查询条件保持不变  体验效果好
     */
    goUpdatePart() {
        this.$refs.partUpdateForm.validate( valid => {
            if(valid) {
                this.isDisabled = true;
                req.post('/url',this.updatedPart)
                .then((res) => {
                    if(res.data.code == 0) {
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        this.getList() //操作成功后  再次调用getList获取数据  页面展示即实现更新
                        this.updatedPartDialogVisible = false;
                    }
                }).catch((error) => {
                    this.isDisabled = false
                })
            }
        })
    }
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