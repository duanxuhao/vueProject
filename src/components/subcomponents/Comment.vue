<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120" v-model="msg">

        </textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in commentList" :key="item.id">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === ("undefined" || "")? "此用户很懒，没留下任何信息":item.content}} 
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>

    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageIndex:1,
            commentList:[],
            msg:""
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get("http://www.liulongbin.top:3005/api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(response=>{
                var result = response.body;
                if(result.status == 0){
                    // this.commentList = result.message;
                    this.commentList=this.commentList.concat(result.message)
                }else{
                    Toast("加载评论内容失败~")
                }
            })
        },
        getmore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim().length == 0){
                return Toast("评论内容不能为空")
            }
            this.$http.post("http://www.liulongbin.top:3005/api/postcomment/"+this.id,{content:this.msg.trim()}).then(response=>{
                var result = response.body;
                if(result.status == 0){
                    var cmt = {user_name:"匿名用户",add_time:Date.now(),content:this.msg.trim()}
                    this.commentList.unshift(cmt)
                    this.msg=""
                }else{
                    Toast("发表评论失败~")
                }
            })
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size:14px;
        height: 85px;
        margin:0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size:13px;
            .cmt-title{
                background-color: #ccc;
                line-height: 30px;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
