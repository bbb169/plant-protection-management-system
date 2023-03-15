<template>
<div class="rightBox">
    <div class="topBox">
        <div id="allcount">
            <div class="alltree">
                <h5>所有树数量统计</h5>
                <h1>{{this.treecount}}</h1>
            </div>
            <div class="inortree">
                <h5>正常树数量统计</h5>
                <h1>{{this.normaltree}}</h1>
            </div>
            <div class="diftree">
                <h5>异常树数量统计</h5>
                <h1>{{this.inortree}}</h1>
            </div>
        </div>
        <div id="typecake" ref=""></div>
        <div id="typebar"></div>
    </div>
    <div class="botBox">
        <div id="statecake" ref=""></div>
        <div id="statebar"></div>
        <div id="stateline"></div>
    </div>
</div>
</template>

<script>
import * as echarts from "echarts";

export default {
    name: 'TreeStats',
    data(){
        return{
            treecount:0,
            normaltree:0,
            inortree:0,
            rongtree:0,
            yetree:0,
            time5:0,
            time6:0,
            time7:0,
            time8:0,
        }
    },
    mounted() {
        this.$store.state.dotsData.forEach(e=> {
            this.treecount++
            if (e.isused==="正常") {
                this.normaltree++
            }else{
                this.inortree++
            }
            if (e.type==='椰树') {
                this.yetree++
            } else {
                this.rongtree++
            }
            if ("2022-05-01"<=e.time&&e.time<"2022-05-31"&&e.isused==="异常") {
                this.time5++
            }if ("2022-06-01"<=e.time&&e.time<"2022-06-30"&&e.isused==="异常") {
                this.time6++
            }if ("2022-07-01"<=e.time&&e.time<"2022-07-31"&&e.isused==="异常") {
                this.time7++
            }if (e.time>"2022-07-01"&&e.isused==="异常"){
                this.time8++
            }
        });
        
        const mytypecake = echarts.init(document.getElementById('typecake'));
        // draw typecake
        mytypecake.setOption({
            title: {
                text: '树种类型占比'
            },
            series: [{
                type: 'pie',
                data: [{
                        value: this.rongtree,
                        name: `榕树：${this.rongtree}棵`
                    },
                    {
                        value: this.yetree,
                        name: `椰树：${this.yetree}棵`
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
                data: [this.rongtree, this.yetree],
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
        const mystatebar = echarts.init(document.getElementById('statebar'));
        // draw statebar
        mystatebar.setOption({
            title: {
                text: '树不同状态数量'
            },
            xAxis: {
                data: ['正常', '异常']
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: [this.normaltree, this.inortree],
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
        const mystatecake = echarts.init(document.getElementById('statecake'));
        // draw statecake
        mystatecake.setOption({
            title: {
                text: '树不同状态占比'
            },
            series: [{
                type: 'pie',
                data: [{
                        value: this.normaltree,
                        name: `正常：${this.normaltree}棵`
                    },
                    {
                        value: this.inortree,
                        name: `异常：${this.inortree}棵`
                    },
                ]
            }]
        });
        const mystateline = echarts.init(document.getElementById('stateline'));
        // draw stateline
        mystateline.setOption({
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
                data: [this.time5,this.time6,this.time7,this.time8],
                type: 'line',
                lineStyle: {
                    color: 'green',
                
            }
            }],
            
        });
    }
}
</script>

<style lang="less" scoped>
.rightBox {
    height: 95%;
    width: 85%;
    margin-left: 5px;
    margin-top: 8px;
    padding-top: 10px;
    background-color: #fff;

    .topBox {
        display: flex;

        justify-content: space-around;

        #allcount {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            margin: 10px;
            padding: 10px;
            width: 20%;
            height: 45vh;
            box-sizing: border-box;
            box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
            border-radius: 20px;

            h1 {
                font-size: 35px;
            }

            h5 {
                font-size: 20px;
            }
        }

        #typecake {
            margin: 10px;
            padding: 10px;
            width: 40%;
            height: 45vh;
            box-sizing: border-box;
            box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
            border-radius: 20px;
        }

        #typebar {
            margin: 10px;
            padding: 10px;
            width: 40%;
            height: 45vh;
            box-sizing: border-box;
            box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
            border-radius: 20px;
        }
    }

    .botBox {
        display: flex;
        margin-top: 10px;
        justify-content: space-around;

        #statecake {
            margin: 10px;
            padding: 10px;
            width: 50%;
            height: 45vh;
            box-sizing: border-box;
            box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
            border-radius: 20px;
        }

        #statebar {
            margin: 10px;
            padding: 10px;
            width: 50%;
            height: 45vh;
            box-sizing: border-box;
            box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
            border-radius: 20px;
        }

        #stateline {
            margin: 10px;
            padding: 10px;
            width: 50%;
            height: 45vh;
            box-sizing: border-box;
            box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
            border-radius: 20px;
        }
    }
}
</style>
