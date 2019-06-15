<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for='item in lunbotuList' :key = "item.id">
                <img :src='item.img' :class="{'full':isFull}"/>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    props:["lunbotuList","isFull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height:200px;
}
.mint-swipe-item{
    text-align: center;
    img{
        height:100%
    }
    .full{
        width:100%;
    }
}

</style>
