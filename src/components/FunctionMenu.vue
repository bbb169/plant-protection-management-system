<template>
    <el-row class="tac">
        <el-col :span="12">
            <h1 class="mb-2">功能面板</h1>
            <div class="caidan">
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#1494af" text-color="#fff"
                    active-text-color="#ffff00" @click="changeColors">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <Menu />
                            </el-icon>
                            <span>数据管理</span>
                        </template>

                        <el-menu-item index="1-1"
                            @click="this.$router.push('/manage-page/info-tables-map'), this.$store.state.show = !this.$store.state.show, this.$store.state.showLine = this.$store.state.showWork = this.$store.state.showAdivce = false">
                            植株信息
                        </el-menu-item>
                        <el-menu-item index="1-3"
                            @click="this.$router.push('/manage-page/info-tables-map'), this.$store.state.showLine = !this.$store.state.showLine, this.$store.state.show = this.$store.state.showWork = this.$store.state.showAdivce = false">
                            浇水路段信息</el-menu-item>
                        <el-menu-item index="1-4"
                            @click="this.$router.push('/manage-page/info-tables-map'), this.$store.state.showWork = !this.$store.state.showWork, this.$store.state.showLine = this.$store.state.show = this.$store.state.showAdivce = false">
                            环卫工人信息</el-menu-item>
                        <el-menu-item index="2-3"
                            @click="this.$router.push('/manage-page/info-tables-map'), this.$store.state.showAdivce = !this.$store.state.showAdivce, this.$store.state.show = this.$store.state.showWork = this.$store.state.showLine = false">
                            群众意见反馈</el-menu-item>
                        <el-menu-item index="2-3" @click="this.$router.push('/manage-page/edit-postion')">植株路段位置编辑
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <Histogram />
                            </el-icon>
                            <span>数据分析</span>
                        </template>
                        <el-menu-item index="3-2"
                            @click="this.$router.push('/manage-page/info-tables-map'), this.$store.state.showMoveSlider = !this.$store.state.showMoveSlider">
                            信息动态显示</el-menu-item>
                        <el-menu-item index="3-3"
                            @click="this.$router.push('/manage-page/info-tables-map'), this.$store.state.addsketch()">区域分析
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                            <span>辅助决策</span>
                        </template>
                        <el-menu-item index="4-2" @click="this.$router.push('/manage-page/info-tables-map'), visible = !visible">

                            <!-- <el-button slot="reference"></el-button> -->
                            <!-- <el-button :virtual-ref="popover"></el-button> -->
                            道路绿化缓冲区分析
                        </el-menu-item>
                        <el-menu-item v-show="visible">
                            <el-input-number v-model="num" @change="toBuffer" placeholder="缓冲距" v-show="visible">
                            </el-input-number>
                        </el-menu-item>

                        <el-menu-item index="4-1" @click="this.$router.push('/manage-page/tree-route')
                        ">修护路线规划</el-menu-item>

                        <!-- <el-menu-item index="4-2" @click="this.$router.push('/manage-page'),toBuffer()">道路绿化缓冲区分析</el-menu-item> -->

                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <Document />
                            </el-icon>
                            <span>数据统计</span>
                        </template>

                        <el-menu-item index="2-1" @click="this.$router.push('/manage-page/tree-stats')">植株信息统计
                        </el-menu-item>
                        <el-menu-item index="2-2" @click="this.$router.push('/manage-page/road-stats')">浇水路段信息统计
                        </el-menu-item>
                    </el-sub-menu>

                </el-menu>
            </div>
        </el-col>

    </el-row>
</template>

<script>
import {
    Document,
    Menu,
    Histogram,
    UserFilled,
} from '@element-plus/icons-vue'
import {
    mapMutations
} from 'vuex'
export default {
    components: {
        Document,
        Menu,
        Histogram,
        UserFilled,
    },
    data() {
        return {
            dotplace: [{
                x: 110.32346,
                y: 20.06174
            },
            {
                x: 110.32343,
                y: 20.05932
            },
            ],
            fnshowDot: {},
            fnRemoveDot: {},
            num: NaN,
            visible: false,
        }
    },
    name: 'FunctionMenu',
    methods: {
        ...mapMutations(['showTable']),
        changeColors: function () {
            const openConut = document.getElementsByClassName("is-opened")
            const backgroundcolors = document.getElementsByClassName("caidan")
            if (openConut.length > 1) {
                backgroundcolors[0].style.background = "linear-gradient(to right bottom, rgb(26,223,179), rgb(94,195,222))"
            } else {
                backgroundcolors[0].style.background = "linear-gradient(to right bottom, rgb(26,223,179), rgb(82,200,215))"
            }
        },
        toBuffer() {
            
            this.$store.state.bufferrenders(this.num)
        },

    },
}
</script>

<style>
.el-menu-vertical-demo {
    background: linear-gradient(to right bottom, rgb(26, 223, 179), rgb(82, 200, 215));
    border-right: 0;
}

.el-sub-menu {
    border-radius: 10px;
    overflow: hidden;
    margin: 10px 0px;
    position: relative;
}

.el-sub-menu .el-icon {
    font-size: 1vw;
}

.el-sub-menu .el-sub-menu__icon-arrow {
    font-size: 0.8vw;
}

.el-sub-menu__title {
    font-size: 1.1vw;
    font-weight: 600;
    justify-content: center;
    padding-left: 0px !important;
}

.el-sub-menu__title:hover {
    background-color: rgb(16, 118, 140) !important;
    color: #ffff00 !important;
}

.is-opened .el-sub-menu__title {

    color: #ffff00 !important;

}

.el-col-12 {
    max-width: 1000%;
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
}

.tac {
    display: flex;
    flex: 1;

}

.mb-2 {
    text-align: center;
    color: aliceblue;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 235px;
}

.basic {
    display: flex;
}

.el-menu-item {
    font-size: 1vw;
    width: 11.5vw;
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: auto !important;
    position: relative
}
.el-menu-item .el-input-number{
    width: 9vw;
}
.el-menu-item .el-input-number .el-input__inner{
    width: 99%;
    color: white;
    background-color: #1494AF;
}
.el-menu-item .el-input-number__decrease, .el-menu-item .el-input-number__increase{
    background-color: rgb(255, 255, 0);
}
::-webkit-input-placeholder { 
  font-size: 4px;
}
</style>
