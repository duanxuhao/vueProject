<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in categoryList" :key="item.id" @click="getAllPics(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag='li'>
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
	</div>

</template>

<script>
// 初始化滑动组件
import mui from '../../lib/mui/examples/hello-mui/js/mui.min.js'
import { Toast } from 'mint-ui'

export default({
    data(){
        return {
            categoryList:[],
            list:[],
            cateId:0
        }
    },
    created(){
        this.getAllCategory()
        this.getAllPics(0)
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getAllCategory(){
            this.$http.get("http://www.liulongbin.top:3005/api/getimgcategory").then(response=>{
                var result = response.body;
                if(result.status == 0){
                    result.message.unshift({title:"全部",id:0})
                    this.categoryList = result.message
                }else{
                    Toast("获取列表信息失败")
                }
            })
        },
        getAllPics(id){
            this.$http.get("http://www.liulongbin.top:3005/api/getimages/"+id).then(response=>{
                var result = response.body;
                if(result.status == 0){
                    this.list = result.message
                }else{
                    Toast("获取图片失败")
                }
            })
        }
    }
})

</script>

<style lang="scss" scoped>
*{
    touch-action:pan-y;
}

.photo-list{
    list-style-type: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0px;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 6px #999;
        position: relative;
        img{
            width:100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,0.4);
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}
</style>
