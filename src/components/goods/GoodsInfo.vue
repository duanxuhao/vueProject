<template>
    <div class="goodsinfo-container">
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                     <my-lunbotu :lunbotuList="lunbotuList" :isFull="false"></my-lunbotu>
                </div>
            </div>
        </div>
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!--  商品购买区域-->
        
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>${{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">
                            ${{goodsInfo.sell_price}}
                        </span>
                    </p>
                    <p>购买数量:<my-numbox @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></my-numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click = "addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsInfo.goods_no}}</p>
                    <p>库存情况:剩余{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间:{{goodsInfo.add_time | dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDescript(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评价</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import Lunbotu from './../subcomponents/Lunbotu.vue'
import Numbox from './../subcomponents/Goodsinfo_Numbox.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbotuList:[],
            goodsInfo:{},
            ballFlag:false,
            selectedCount:1
        }
    },
    created(){
        this.getLunbotu()
        this.getInfo()
    },
    methods:{
        getLunbotu(){
            this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/"+this.id).then(response=>{
                var result = response.body;
                if(result.status == 0){
                    result.message.forEach(item=>{
                        item.img = item.src;
                    })
                    this.lunbotuList = result.message;
                }else{
                    Toast("获取图片失败")
                }
            })
        },
        getInfo(){
            this.$http.get("http://www.liulongbin.top:3005/api/goods/getinfo/"+this.id).then(response=>{
                var result = response.body;
                if(result.status == 0){
                    this.goodsInfo = result.message[0];
                }else{
                    Toast("获取商品信息失败")
                }
            })
        },
        goDescript(id){
            this.$router.push({name:'goodsdesc',params:{id}})
        },
        goComment(id){
            this.$router.push({name:'goodscomt',params:{id}})
        },
        addToShopCar(){
            this.ballFlag = !this.ballFlag
            var goodsInfo = {id:this.id,count:this.selectedCount,price:this.goodsInfo.sell_price,selected:true}
            this.$store.commit("addToCart",goodsInfo)
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)"
        },
        enter(el){
            el.offsetWidth;
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const iconPosition = document.getElementById("badge").getBoundingClientRect();
            const x = iconPosition.left - ballPosition.left;
            const y = iconPosition.top - ballPosition.top;
            el.style.transform="translate("+x+"px,"+y+"px)"
            el.style.transition = "all 0.5s cubic-bezier(0.4,-0.3,1,0.68)"
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag  
            // el.css("display",'none')
            el.style.display="none"
        },
        getSelectedCount(count){
            this.selectedCount = count
            console.log(this.selectedCount)
        }
    },
    components:{
        "my-lunbotu":Lunbotu,
        "my-numbox":Numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
}
.now_price{
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.mui-card-footer{
    display: block;
    button{
        margin:15px 0;
    }
}
.ball{
    width:15px;
    height:15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top:390px;
    left:140px;
}
</style>
