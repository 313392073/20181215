<!--  -->
<template>
    <div class="commentBox">
		<h3>发表评论</h3>
		<b v-if="type">你回复&nbsp;{{oldComment}}</b>
		<textarea name="" value="请填写评论内容" v-model="commentText"></textarea>
		<button class="btn" @click="addComment">发表</button>
		<button class="btn" @click="canelComment">取消</button>
        <div class="commentBox">
            <h3>评论</h3>
            <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
            <div v-else>
                <div class="comment" v-for="(item,index) in comment" v-bind:index="index" :key="index">
                    <b>{{item.name}}<span>{{item.time}}</span></b>
                    <p @click="changCommmer(item.name,index)">{{item.content}}</p>
                    <div v-if="item.reply.length > 0">
                        <div class="reply" v-for="(reply,subIndex) in item.reply" :key="subIndex">
                            <b>{{reply.responder}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{reply.reviewers}}<span>{{reply.time}}</span></b>
                            <p @click="changCommmer(reply.responder,index)">{{reply.content}}</p>
                        </div>
                    </div>
                </div>
            </div>
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
    type:0, //0为评论作者 1为评论别人的评论 2为评论别人的别人
    commentText:"",
    oldComment: null,
    chosedIndex: -1,
    comment: [
        {
            name: "有毒的黄同学",
            time: "2016-08-17",
            content: "好,讲得非常好，good",
            reply: [
                {
                    responder: "有毒的黄同学",
                    reviewers: "傲娇的",
                    time: "2016-09-05",
                    content: "你说得对"
                },
                {
                    responder: "傲娇的",
                    reviewers: "有毒的黄同学",
                    time: "2016-09-05",
                    content: "很强"
                }
            ]
        },
        {
            name: "Freedom小黄",
            time: "2016-08-17",
            content: "好,讲得非常好，good",
            reply: []
        }
    ]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    canelComment(){
        this.comment = [];
    },
    addComment(data) {
        if(this.type == 0) {
            this.comment.push({
                name: 'session0',
                time: this.getTime(),
                content: this.commentText,
                reply: []
            });
            //服务器端变
        }else if(this.type == 1){
            this.comment[this.chosedIndex].reply.push({
                responder: 'session1',
                reviewers:this.comment[this.chosedIndex].name,
                time: this.getTime(),
                content: this.commentText
            });
            this.type = 0;
        }
        this.commentText = '';
        console.log(this.comment)
    },
    changCommmer(name,index) {
        this.oldComment = name;
        this.chosedIndex = index;
        this.type = 1;
        console.log(this.comment)
    },
    canelCommit() {
        this.type = 0;
    },
    getTime(){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        month.length < 2 ?  "0" + month : month;
        day.length < 2 ?  "0" + day : day;
        return year+"-"+month+"-"+day;
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