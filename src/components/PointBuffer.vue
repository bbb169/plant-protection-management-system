<template>
  <div id="viewDiv"></div>
</template>

<script>

export default {
    name:'PointBuffer',
    mounted(){
        const timer = setInterval(() => {
           this.$store.state.bufferrenders()
           
            clearInterval(timer)
        }, 2000);
    }
}
</script>

<style>
#viewDiv {
    height: 97%;
    width: 84%;
    margin-left: 5px;
    margin-top: 8px;
    position: relative;
}
</style>