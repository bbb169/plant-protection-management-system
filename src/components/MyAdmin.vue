<template>
  <div class="myadmin">
       <el-avatar :size="126" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
       <text>欢迎您用户    {{this.username}}</text>
  </div>
</template>

<script>

export default {
    name:'MyAdmin',
    data (){
        return{
            username:'',
        }
    },
    mounted(){
        this.username=this.$route.query.username
    }
}
</script>

<style lang="less" scoped>
.myadmin{
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    .el-avatar{
        margin: 20px 0;
    }
    text{
        text-align: center;
        font-size: 15px;
        color: aliceblue;
        font-weight: 600;
    }
}
</style>