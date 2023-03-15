<template>
    <div class="rightBox" v-show="this.$store.state.showechart">
        <el-tabs v-model="activeName">
            <el-tab-pane label="植株统计" name="first">
                <div id="typebar"></div>
                <div id="typecake" ref=""></div>
            </el-tab-pane>
            <el-tab-pane label="异常植株统计" name="second">
                <div id="timebar"></div>
                <div id="inortypecake" ref=""></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import * as echarts from "echarts";
import {
    mapMutations
} from 'vuex'
export default {
    name: 'AreaCount',
    data() {
        return {
            timer: 0,
            activeName: "first",
        }
    },
    updated() {
        // draw typecake
        const mytypecake = echarts.init(document.getElementById('typecake'));
        mytypecake.setOption({
            title: {
                text: '树种类型占比'
            },
            series: [{
                type: 'pie',
                data: [{
                        value: this.$store.state.rongtree,
                        name: `榕树：${this.$store.state.rongtree}棵`
                    },
                    {
                        value: this.$store.state.yetree,
                        name: `椰树：${this.$store.state.yetree}棵`
                    }
                ]
            }]
        });
        const mytypebar = echarts.init(document.getElementById('typebar'));
        // draw typebar
        mytypebar.setOption({
            title: {
                text: '树种类型数量'
            },
            xAxis: {
                data: ['榕树', '椰树']
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: [this.$store.state.rongtree, this.$store.state.yetree],
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                },
                itemStyle: {
                    color: '#91cc75',
                    shadowColor: '#91cc75',
                    borderType: 'dashed',
                }
            }]
        });
        const mytimebar = echarts.init(document.getElementById('timebar'));
        // draw timebar
        mytimebar.setOption({
            title: {
                text: '月异常树数量'
            },
            xAxis: {
                type: 'category',
                data: ['2022-5', '2022-6', '2022-7', '2022-8']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [this.$store.state.time5, this.$store.state.time6, this.$store.state.time7, this.$store.state.time8],
                type: 'line',
                lineStyle: {
                    color: 'green',
                }
            }],

        });
        const myinortypecake = echarts.init(document.getElementById('inortypecake'));
        // draw inortypecake
        myinortypecake.setOption({
            title: {
                text: '树种类型占比'
            },
            series: [{
                type: 'pie',
                data: [{
                        value: this.$store.state.inorongtree,
                        name: `榕树：${this.$store.state.inorongtree}棵`
                    },
                    {
                        value: this.$store.state.inoyetree,
                        name: `椰树：${this.$store.state.inoyetree}棵`
                    }
                ]
            }]
        });
    },
    methods: {
        ...mapMutations(['showArea']),
    },
}
</script>

<style lang="less" scoped>
    .rightBox {
        position: absolute;
        width: 31vw;
        background-color: #fff;
        box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        right: 10px;
        padding: 10px 20px;

        .el-tabs__content {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            justify-items: stretch;
            height: 800px;

            #typecake {
                flex: 1;
                margin: 10px 10px 15px 10px;
                padding: 10px;
                width: 29vw;
                height: 30vh;
                box-sizing: border-box;
                box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
                border-radius: 20px;
            }

            #typebar {
                flex: 1;
                margin: 10px 10px 15px 10px;
                padding: 10px;
                width: 29vw;
                height: 30vh;
                box-sizing: border-box;
                box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
                border-radius: 20px;
            }

            #timebar {
                flex: 1;
                margin: 10px 10px 15px 10px;
                padding: 10px;
                width: 29vw;
                height: 28vh;
                box-sizing: border-box;
                box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
                border-radius: 20px;
            }

            #inortypecake {
                flex: 1;
                margin: 10px 10px 15px 10px;
                padding: 10px;
                width: 29vw;
                height: 33vh;
                box-sizing: border-box;
                box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
                border-radius: 20px;
            }
        }

    }
// }
</style>
<style>
.el-tabs__content {
    display: flex;
    justify-content: space-around;
}
</style>
