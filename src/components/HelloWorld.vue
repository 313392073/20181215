<template>
  <div class="left-box">
    <div class="desc-menu">课堂学习</div>
    <!-- 主要内容 -->
    <div class="main-wrapper">
        <h3 class="title">课堂练习成绩报告单</h3>
        <div class="main-box">
            <p class="main-title">成绩排行榜</p>
            <div class="tab-box clearfix">
                <div class="greed-tab">
                    <table>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>分数</th>
                                <th>答题用时</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in 7" :key="index">
                                <td><i class="iconfont icon-huizhang"></i><img src="/images/default.png" class="head-pic" alt="default"><span>流星雨</span></td>
                                <td>100分</td>
                                <td class="use-time">09分45秒</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="greed-tab right-tab">
                    <table>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>分数</th>
                                <th>答题用时</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in 7" :key="index">
                                <td><i>{{index+1}}</i><img src="/images/default.png" class="head-pic" alt="default"><span>流星雨</span></td>
                                <td>100分</td>
                                <td class="use-time">09分45秒</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@fcolor:#5c5a5a;
.left-box{
    width: 100%;
    height: 100%;
    .title{
        height: 106*0.4*0.02rem;
        line-height: 106*0.4*0.02rem;
        text-align: center;
        font-size: 44*0.4*0.02rem;
        color: @fcolor;
    }
    .main-box{
        width: 90.78%;
        margin: 0 auto 70*0.4*0.02rem;
        box-shadow: 0 2px 5px 3px rgba(0,0,0,0.1); 
        .main-title{
            font-size: 34*0.02*0.4rem;
            color: @fcolor;
            height: 105*0.4*0.02rem;
            line-height: 105*0.4*0.02rem;
            text-indent: 85*0.4*0.02rem;
        }
        .tab-box{
            width: 100%;
            padding: 0 95*0.4*0.02rem;
            .greed-tab{
                float: left;
                width: calc(~"50% - 0.22rem");
                min-width: 980*0.4*0.02rem;
                overflow: auto;
                margin-right: 55*0.4*0.02rem;
                margin-bottom: 50*0.4*0.02rem;
                &.right-tab{
                    margin-right: 0;
                }
                table{
                    width: 100%;
                    thead{
                        tr{
                            line-height: 68*0.4*0.02rem;
                            height: 68*0.4*0.04rem;
                            color: @fcolor;
                            font-size: 34*0.4*0.02rem;
                            th{
                                border: 1px solid #f5f4f2;
                            }
                        }
                    }
                    tbody{
                        tr{
                            height: 100*0.4*0.02rem;
                            line-height: 100*0.4*0.02rem;
                            td{
                                border: 1px solid #f5f4f2;
                                text-align: center;
                                font-size: 34*0.4*0.02rem;
                                .head-pic{
                                    width: 85*0.4*0.02rem;
                                    height: 85*0.4*0.02rem;
                                    margin: 0 30*0.02*0.4rem;
                                    
                                }
                                i{
                                    display: inline-block;
                                    width: 60*0.4*0.02rem;
                                    height: 60*0.4*0.02rem;
                                    line-height: 60*0.4*0.02rem;
                                    font-size: 36*0.4*0.02rem;
                                    color: #fb0f1c;
                                    vertical-align: middle;
                                    border-radius: 50%;
                                    background-color: #fc8628;
                                    color: #ffffff; 
                                }
                                &.use-time{
                                    color: #6c63ff;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
