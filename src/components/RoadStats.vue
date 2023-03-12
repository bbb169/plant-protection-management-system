<template>
<div class="rightBox">
    <div class="topBox">
        <div id="allcount">
            <div class="alltree">
                <h5>所有浇水路段数量统计</h5>
                <h1>{{linecount}}</h1>
            </div>
            <div class="inortree">
                <h5>已浇水路段数量统计</h5>
                <h1>{{normalline}}</h1>
            </div>
            <div class="diftree">
                <h5>未浇水路段数量统计</h5>
                <h1>{{inorline}}</h1>
            </div>
        </div>
        <div id="typecake" ref=""></div>
        <div id="typebar"></div>
    </div>
    <div class="botBox">
        <div id="statebar"></div>
        <div id="stateline"></div>
    </div>
</div>
</template>

<script>
import * as echarts from "echarts";

export default {
    name: 'RoadStats',
    data(){
        return{
            linecount:0,
            normalline:0,
            inorline:0,
            line1:0,
            line2:0,
            line3:0,
            line4:0,
            line5:0,
            area1:0,
            area2:0,
            area3:0,
            area4:0,
            area5:0,
        }
    },
    mounted() {
        this.$store.state.lineData.forEach(e=> {
            this.linecount++
            if (e.isused==="已清洗") {
                this.normalline++
            }else{
                this.inorline++
            }
            if (e.areaid===1) {
                this.line1++
                if (e.isused==="未清洗") {
                this.area1++
            }
            } if (e.areaid===2) {
                this.line2++
                if (e.isused==="未清洗") {
                this.area2++
            }
            } if (e.areaid===3) {
                this.line3++
                if (e.isused==="未清洗") {
                this.area3++
            }
            }if (e.areaid===4) {
                this.line4++
                if (e.isused==="未清洗") {
                this.area4++
            }
            }if (e.areaid===5) {
                this.line5++
                if (e.isused==="未清洗") {
                this.area5++
            }
            }
        });
        const mytypecake = echarts.init(document.getElementById('typecake'));
        // 绘制typecake
        mytypecake.setOption({
            title: {
                text: '浇水路段状态占比'
            },
            series: [{
                type: 'pie',
                data: [{
                        value: this.normalline,
                        name: `已浇水：${this.normalline}条`
                    },
                    {
                        value: this.inorline,
                        name: `未浇水：${this.inorline}条`
                    },
                ]
            }]
        });
        const mytypebar = echarts.init(document.getElementById('typebar'));
        // 绘制typebar
        mytypebar.setOption({
            title: {
                text: '浇水路段状态数量'
            },
            xAxis: {
                data: ['已浇水', '未浇水']
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: [this.normalline, this.inorline],
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
        mystatebar.setOption({
            title: {
                text: '各管理区路段数量占比'
            },
            series: [{
                type: 'pie',
                data: [{
                        value: this.line1,
                        name: `管理区1：${this.line1}条`
                    },
                    {
                        value: this.line2,
                        name: `管理区2：${this.line2}条`
                    },{
                        value: this.line3,
                        name: `管理区3：${this.line3}条`
                    },{
                        value: this.line4,
                        name: `管理区4：${this.line4}条`
                    },{
                        value: this.line5,
                        name: `管理区5：${this.line5}条`
                    },
                ]
            }]
        });
        const mystateline = echarts.init(document.getElementById('stateline'));
        // 绘制stateline
        mystateline.setOption({
            title: {
                text: '各管理区未浇水路段数量'
            },
            xAxis: {
                type: 'category',
                data: ['管理区1', '管理区2', '管理区3', '管理区4', '管理区5']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [this.area1, this.area2,this.area3,this.area4,this.area5],
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
