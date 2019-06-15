<template>
    <div>
        <!-- 轮播图区域 -->
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for='item in lunbotuList' :key = "item.id">
                <img :src='item.img'/>
            </mt-swipe-item>
        </mt-swipe> -->
        <my-lunbotu :lunbotuList="lunbotuList" :isFull="true"></my-lunbotu>
        <!-- 轮播图区域 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <span class="mui-icon mui-icon-email"></span>
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div></a></li>
		</ul> 

    </div>
</template>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border:none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:none;
}
</style>

<script>
import { Toast } from 'mint-ui'
import Lunbotu from './../subcomponents/Lunbotu.vue'
export default {
    data(){
        return {
            lunbotuList:[]
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        getLunbotu(){
            // const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
            this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(response=>{
                // console.log(result.body)
                var result = response.body
                if(result.status == 0){
                    this.lunbotuList = result.message
                }else{
                    Toast('加载轮播图失败，请重试~')
                }
            })
        }
    },
    components:{
        "my-lunbotu":Lunbotu
    }
}
</script>
