<template>
<div class="all">
    <div class="bottombody">
        <div class="basic">
            <my-admin></my-admin>
            <FunctionMenu></FunctionMenu>
            <div class="topgind">
                管理系统<br>
                <text>MANAGEMENT SYSTEM</text>
            </div>
        </div>
        <router-view></router-view>
        <el-dialog title="提示" v-model="$store.state.showWrong" width="30%">
            <span>分析要素过多，建议减少框选要素</span>
        </el-dialog>
    </div>

</div>
</template>

<script>
import FunctionMenu from './FunctionMenu.vue';
import MyAdmin from './MyAdmin.vue';
import InfoTablesMap from './InfoTablesMap.vue';
import {
    mapMutations
} from 'vuex'
export default {
    name: 'ManagePage',
    components: {
        InfoTablesMap,
        FunctionMenu,
        MyAdmin,
    },
    data() {
        return {
            arrayimg: [],
            renderTimes: 0,
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                if (this.$route.fullPath === "/managepage/area-count") {
                    setTimeout(() => {
                        this.showArea()
                    }, 500)

                }
                if (this.$route.fullPath === "/managepage/tree-route") {}
                if (this.$route.fullPath === "/managepage/info-tables-map" || this.$route.fullPath === "/managepage/point-buffer" || this.$route.fullPath === "/managepage/time-filter-bar" || this.$route.fullPath === "/managepage/my-advice") {
                    console.log(this.$route);
                    const getData = setInterval(() => {
                        console.log(this.$store.state.tabledots, this.renderTimes);
                        if (this.$store.state.tabledots != [] && !this.renderTimes) {
                            this.renderTimes++
                            this.showTable()
                            clearInterval(getData)
                            console.log('clear');
                            setTimeout(() => {
                                this.renderTimes = 0
                            }, 10000);
                        } else {
                            clearInterval(getData)
                        }
                    }, 1000);
                }
            }
        }

    },
    methods: {
        ...mapMutations(['showTable', 'showArea']),
    },
    async created() {
        // got tree dots
        const {
            data: res
        } = await this.$http.get('http://152.136.254.142:5000/api/gettrees')
        res.treeinfo.forEach(e => {
            e.imgurl = (e.imgurl || "").split(",")
            if (e.isused) {
                e.isused = '正常'
            } else {
                e.isused = '异常'
                this.$store.state.tabledots.push(e)
            }
        });
        console.log(this.$store.state.tabledots);
        this.$store.state.dotsData = res.treeinfo
        // get roads
        const {
            data: res1
        } = await this.$http.get('http://152.136.254.142:5000/api/line')
        this.$store.state.lineData = []
        res1.lines.forEach(e => {
            if (e.ORIG_FID === 1) {
                return
            }
            if (e.isused) {
                e.isused = '已清洗'
            } else {
                e.isused = '未清洗'
            }
            this.$store.state.lineData.push(e)
        })
        console.log(this.$store.state.lineData);
        // get workes
        const {
            data: res2
        } = await this.$http.get('http://152.136.254.142:5000/api/getworker')
        console.log(res2.personinfo);
        res2.personinfo.forEach(e => {
            e.manpic = (e.manpic || "").split(",")
        });
        this.$store.state.workData = res2.personinfo
        const {
            data: res3
        } = await this.$http.get(`http://152.136.254.142:5000/api/examine`)
        res3.unexamine.forEach(e => {
            e.pic = (e.pic || "").split(",")
            if (e.recognize.length > 10) {
                // console.log(JSON.parse(e.recognize));
                e.recognize = JSON.parse(e.recognize)
            }
        })
        this.$store.state.advices = res3.unexamine
        console.log(res3);
        this.showTable()
        this.renderTimes++
        console.log(this.renderTimes);
        setTimeout(() => {
            this.renderTimes = 0
        }, 10000);
    }
}
</script>

<style lang="less" scoped>
.bottombody {
    display: flex;
    width: 100vw;
    height: 100vh;
    padding-bottom: 20px;
    background-image: linear-gradient(to bottom right, rgb(0, 253, 186), rgb(0, 151, 252));
    animation: bg-anim 2.5s alternate infinite linear;

}

@keyframes bg-anim {
    from {
        left: 0;
    }

    to {
        left: -200%;
    }
}

.basic {
    display: flex;
    flex-direction: column;
    width: 12%;
    height: 96%;
    background: linear-gradient(to bottom right, rgba(14, 227, 171), rgba(114, 186, 235));
    border-radius: 20px;
    margin: 10px 15px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 3px 3px 10px 5px rgb(0, 151, 252);
}

.topgind {
    width: 100%;
    border-radius: 10px;
    font-size: 1.7vw;
    font-weight: 600;
    overflow: hidden;
    color: aliceblue;
    text-align: center;
    margin-bottom: 10px;

    text {
        font-size: 1vw;
        font-weight: normal;
        font-family: FZyaoti;
    }
}

.all {
    height: 100%;
    margin-right: 6px;
    padding-bottom: 10px;
}

#app {
    margin-bottom: 10px;
    height: 100vh;
    overflow: hidden;
}
</style>
