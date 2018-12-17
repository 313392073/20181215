<!--  -->
<template>
 <div class="collapse">
    <div class="collapse-item" v-for="(item,inx) in list" :key="item.title" :class="{'is-active':activeNames.indexOf(inx)>-1}">
        <div class="collapse-item-tab" @click.prevent="handleChange(event,inx)">{{item.title}}<i class="wbicon"></i></div>
        <transition name="my" @enter="enter">
            <div class="collapse-item-wrap" v-show="activeNames.indexOf(inx)>-1">
                <div class="collapse-item-content" v-html="item.content"></div>
            </div>
        </transition>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
let list = [{
        'title': '一致性 Consistency',
        'content': '<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div><div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>'
    }, {
        'title': '反馈 Feedback',
        'content': '<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div><div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>'
    }, {
        'title': '效率 Efficiency',
        'content': '<div>简化流程：设计简洁直观的操作流程；</div><div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div><div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>'
    }, {
        'title': '可控 Controllability',
        'content': ' <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div><div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>'
    }, ]

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    activeNames: [],
    list: list
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
        handleChange(e, inx) {
            if (this.activeNames.indexOf(inx) > -1) {
                var i = this.activeNames.indexOf(inx)
                this.activeNames.splice(i, 1)
            } else {
                this.activeNames.splice(0, 0, inx)
            }
            console.log(this.activeNames)
        },
        enter(el) {
            var h= el.scrollHeight
            el.style.setProperty('--h', h + 'px')

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
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>