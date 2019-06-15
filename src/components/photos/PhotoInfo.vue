<template>
    <div class="photoInfo-container">
        <h3>{{photoInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoInfo.add_time | dataFormat}}</span>
            <span>点击:{{photoInfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <!-- <img v-for="(item,index) in list" :src="item.src" class="preview-img" height="100" @click="$preview.open(index,list) " :key="item.src"> -->
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
             <!-- <img :slides="list"> -->
             <!-- <img v-for="(item,index) in list" :src="item.src" class="preview-img" height="100" :key="item.src" @click="$preview.open(index,list) "> -->
             <!-- <img :slides="list" class="preview-img" height="100"> -->
        </div>
        <!-- 图片内容区域 -->

        <div class="content" v-html="photoInfo.content">
            
        </div>

        <!-- 评论子组件 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import Comment from './../subcomponents/Comment.vue'
import './../../css/photoInfo.css'
export default {
    data(){
        return{
            id:this.$route.params.id,
            photoInfo:{},
            list:[]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("http://www.liulongbin.top:3005/api/getimageInfo/"+this.id).then(response=>{
                var result = response.body
                if(result.status == 0){
                    this.photoInfo = result.message[0]
                }else{
                    Toast("获取图片详情失败")
                }
            })
        },
        getThumbs(){
            this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/"+this.id).then(response=>{
                var result = response.body;
                if(result.status == 0){
                    result.message.forEach(item=>{
                        item.w = 600;
                        item.h = 400;
                        item.msrc = item.src
                    })
                    this.list = result.message;
                }else{
                    Toast("获取图片缩略图失败")
                }
            })
        }
    },
    components:{
        comment:Comment
    }
}
</script>

<style lang="scss" scoped>
.photoInfo-container{
    padding: 3px;
    h3{
        color:#26a2ff;
        font-size: 15px;
        text-align: center;
        margin:15px 0;
    }
    .subtitle{
        display:flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    // .thumbs{
    //     img{
    //         margin: 10px;
    //         box-shadow: 0 0 8px #999;
    //     }
    // }
}
</style>
