<template>
    <div class="shop-container">
       <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])" v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p class="rowoption">
                                <span class="price">￥{{item.sell_price}}</span>
                                <my-numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></my-numbox>
                                <a href="#" @click.prevent="delGood(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
       </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import Numbox from './../subcomponents/ShopCart_Numbox.vue'
export default {
    data(){
        return{
            goodsList:[]
        }
    },
    created(){
        this.getAllGoods()
    },
    methods:{
        getAllGoods(){
            //获取store中的商品Id,然后再用逗号分隔符连接
            var idArr = []
            this.$store.state.cart.forEach(item=>{
                idArr.push(item.id)
            })
            if(idArr.length <= 0){
                return 
            }
            this.$http.get("http://www.liulongbin.top:3005/api/goods/getshopcarlist/"+idArr.join(",")).then(response=>{
                var result = response.body
                if(result.status == 0){
                    this.goodsList = result.message;
                }
            })
        },
        delGood(id,index){
            this.goodsList.splice(index,1)
            this.$store.commit("delGoods",id)

        },
        selectedChange(id,value){
            this.$store.commit("updateGoodsSelected",{id,selected:value})
        }
    },
    components:{
        "my-numbox":Numbox
    }
}
</script>

<style lang="scss" scoped>
.shop-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width:60px;
            height:60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .rowoption{
                display: flex;
                justify-content: space-between;
            }
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color:red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>
