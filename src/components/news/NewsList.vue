<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in news" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id" class="">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间：{{item.add_time | dataFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
		</ul>
    </div>
</template>

<style lang='scss' scoped>
.mui-table-view{
    li{
        h1{font-size: 14px;}
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            news:[]
        }
    },
    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then(response=>{
                var result = response.body;
                if(result.status == 0){
                    this.news = result.message;
                }else{
                    Toast("获取新闻列表失败，请重试~")
                }
            })
        }
        
    }
}
</script>
