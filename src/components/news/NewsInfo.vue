<template>
    <div class="newsinfo-contanier">
        <h3 class='title'>{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time | dataFormat}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        <comment :id="this.id"></comment>
    </div>
</template>

<style lang="scss">
.newsinfo-contanier{
    padding:0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color:brown;
    }
    .subtitle{
        font-size: 13px;
        color:#226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width:100%;
        }
    }
}
</style>

<script>
// 导入评论子组件
import comment from './../subcomponents/Comment.vue'
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            id:this.$route.params.id,
            newsinfo:''
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then(response=>{
                var result = response.body;
                if(result.status == 0){
                    this.newsinfo = result.message[0]
                }else{
                    Toast("获取新闻失败，请重试~")
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>
