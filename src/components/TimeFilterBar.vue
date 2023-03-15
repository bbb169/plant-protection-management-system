<template>
    <div class="slider-demo-block">
        <div class="timechoose">近期植株点筛选（360天）
            <div class="block">
                <span class="demonstration">植株点日期表筛选</span>
                <el-date-picker v-model="timeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="pickTime(0)" format="YYYY 年 MM 月 DD 日" value-format="YYYY-MM-DD">
                </el-date-picker>
            </div>
        </div>
        <el-slider v-model="dotvalue" range show-stops :max="360" @change="dotValueChange" />
        <div class="timechoose">近期道路段筛选（360天）
            <div class="block">
                <span class="demonstration">道路段日期表筛选</span>
                <el-date-picker v-model="timeRange2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="pickTime(1)" format="YYYY 年 MM 月 DD 日" value-format="YYYY-MM-DD">
                </el-date-picker>
            </div>
        </div>
        <el-slider v-model="linevalue" range show-stops :max="360" @change="lineValueChange" />
    </div>
</template>

<script>
export default {
    name: 'TimeFilterBar',
    data() {
        return {
            dotvalue: [0, 360],
            dottime1: '',
            dottime2: '',
            linetime1: '',
            linetime2: '',
            linevalue: [0, 360],
            input1: {},
            values: {
                showDotvalue: true,
                showLinevalue: false
            },
            timeRange: [],
            timeRange2: [],
        }
    },
    methods: {
        pickTime(e) {
            
            if (e) {
                
                this.$store.state.olineTimeRange(this.timeRange2[0], this.timeRange2[1])
            } else {
                
                this.$store.state.odotTimeRange(this.timeRange[0], this.timeRange[1])
            }

        },
        datatime(time) {
            var myDate = new Date(); 
            myDate.setDate(myDate.getDate() - time);
            var dateTemp;

            let month = 0;
            if (myDate.getMonth() + 1 < 10) {
                month = '0' + (myDate.getMonth() + 1);
            } else {
                month = myDate.getMonth() + 1;
            }
            let day = 0;
            if (myDate.getDate() < 10) {
                day = '0' + myDate.getDate();
            } else {
                day = myDate.getDate();
            }
            dateTemp = myDate.getFullYear() + '-' + month + '-' + day;
            return dateTemp
        },
        dotValueChange() {
            
            this.$store.state.dotTimes(this.datatime(this.dotvalue[0]), this.datatime(this.dotvalue[1]))
        },
        lineValueChange() {
            
            this.$store.state.lineTimes(this.datatime(this.linevalue[0]), this.datatime(this.linevalue[1]))
        }
    },
    mounted() {
        const dt = new Date();
        var ye = dt.getFullYear();
        var mon = dt.getMonth();
        var d = dt.getDate()
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        if (d < 10) {
            d = '0' + d
        }
        this.input1.year = ye
        this.input1.month = months[mon]
        this.input1.day = d
        
    }
}
</script>

<style lang="less" scoped>
#viewDiv {
    .block {
        display: flex;
        align-items: center;
        width: 25vw;
        justify-content: space-between;
        // margin: 10px 0;
        background-color: rgb(53, 211, 196);
        color: white;
        border-radius: 4px;
        padding-left: 10px;
        font-size: 16px;

        span {
            padding-right: 10px;
        }
    }

    .slider-demo-block {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 55%;

        .el-slider {
            margin-top: 0;
            margin-left: 12px;
            background-color: white;
            padding: 5px 20px;
            border-radius: 4px;
            box-shadow: 3px 3px 20px 0px rgb(56 203 210);
            border: 1px solid #dcdfe6;
            margin-top: 10px;
        }

        .timechoose {
            font-size: 20px;
            background-color: rgb(53, 211, 196);
            color: white;
            padding: 5px 20px;
            border-radius: 4px;
            margin-top: 10px;
            display: flex;
            align-items: center;
        }
    }
}
</style><style>
.el-slider__bar {
    background: linear-gradient(to bottom right, rgb(0, 253, 186), rgb(0, 151, 252));
}
</style>
