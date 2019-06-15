<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countedChanged" ref="numBox"/>
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
            this.$emit("getCount",parseInt(this.$refs.numBox.value))
        }
    },
    props:["max"],
    watch:{
        max:function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption("max",newVal)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
