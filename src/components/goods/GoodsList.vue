<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="getDetail(item.id)" >
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click = "getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data(){
        return{
            goodsList:[],
            pageindex:1
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            this.$http.get("http://www.liulongbin.top:3005/api/getgoods?pageindex="+this.pageindex).then(response=>{
                var result = response.body;
                if(result.status == 0){
                    this.goodsList = this.goodsList.concat(result.message);
                }else{
                    Toast("获取商品列表失败")
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodsList()
        },
        getDetail(id){
            // this.$route 路由参数对象，params query都属于它
            // this.$router 路由导航对象，用它可以很方便的使用JS代码实现路由的前进后退，跳转到新的url地址
            // 以下三种方式进行跳转：
            // this.$router.push("/home/goodsinfo/"+id)
            // this.$router.push({path:'/home/goodsinfo/'+id})
            this.$router.push({name:'goodsinfo',params:{id}})
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        width:49%;
        border:1px solid #ccc;
        box-shadow: 0 0 10px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
            
        }
        .title{
                font-size: 14px;
            }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>
