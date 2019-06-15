<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount" readonly @change="countedChanged" ref="numBox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from './../../lib/mui/examples/hello-mui/js/mui.min.js'
export default {
    mounted(){
        mui(".mui-numbox").numbox()
    },
    methods:{
        countedChanged(){
            this.$store.commit("updateGoodsinfo",{id:this.goodsId,count:this.$refs.numBox.value})
        }
    },
    props:["initCount","goodsId"]
}
</script>

<style lang="scss" scoped>

</style>
