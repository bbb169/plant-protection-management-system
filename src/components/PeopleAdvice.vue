<template>
<transition name="slide-fade">
    <el-table :data="this.$store.state.advices" height="800" style="width: 800px" class="outtable" v-show="this.$store.state.showAdivce" @row-click="elrowclick">
        <el-table-column prop="id" label="Id" min-width="60" />
        <el-table-column prop="treeid" label="植株id" min-width="80" />
        <el-table-column prop="areaid" label="所属区域id" min-width="100" />
        <el-table-column prop="time" label="日期" min-width="110" sortable />
        <el-table-column prop="message" label="意见" min-width="80" />
        <el-table-column prop="recognize" label="识别结果" min-width="200">
            <template #default="scope">
                <div>{{scope.row.recognize!=''?scope.row.recognize?.AliasName+' '+scope.row.recognize?.Family+' '+scope.row.recognize?.Genus+' '+scope.row.recognize?.Name+' 相似度：'+scope.row.recognize?.Score:""}}</div>
            </template>

        </el-table-column>
        <el-table-column prop="pic" label="图片地址" min-width="80">
            <template #default="scope">
                <el-image style="width: 50px; height: 50px" :src="scope.row.pic[0]" :initial-index="1" :preview-src-list="scope.row.pic" fit="cover">
                    <template #error>
                        <div class="image-slot">
                        </div>
                    </template>
                </el-image>
            </template>

        </el-table-column>
        <el-table-column align="right" min-width="80">
            <template #default="scope">
                <div class="cellbuts">
                    <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
                    <el-button size="small" type="danger" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                </div>

            </template>
        </el-table-column>

    </el-table>
</transition>
</template>

<script>
export default {
    name: 'PeopleAdvice',
    data() {
        return {
            newDotDatas: [],
            eidtOne: Number,
        }
    },
    methods: {
        elrowclick(e1, e2, e3) {
            
            this.$store.state.dotsData.forEach(e => {
                if (e.id === e1.treeid) {
                    this.$store.state.gotos(e)
                    const item = {
                        id:e1.treeid,
                        
                    }
                    this.$store.state.pushPopDoto(item)
                    return
                }
            })

        },
        async handleEdit(index, row) {
            
            
            this.eidtOne = index
            this.$http.post(`http://152.136.254.142:5000/api/past?tipid=${row.id}`)
            setTimeout(async () => {
                const {
                    data: res3
                } = await this.$http.get(`http://152.136.254.142:5000/api/examine`)

                res3.unexamine.forEach(e => {
                    e.pic = (e.pic || "").split(",")
                    if (e.recognize.length > 10) {
                        
                        e.recognize = JSON.parse(e.recognize)
                    }
                })
                
                this.$store.state.advices = res3.unexamine
            }, 1000);
            let pertp = '榕树'
            this.$store.state.dotsData.forEach(e => {
                if (e.id === row.treeid) {
                    pertp=e.type
                }
            })
            let obj = {
                id: row.treeid,
                time: row.time,
                type: pertp,
                isused: "异常",
            }
            
            this.$store.state.toReplaceDot(obj)

        },
        async deleteRow(index, row) {
            
            this.$http.post(`http://152.136.254.142:5000/api/notpast?tipid=${row.id}`)
            setTimeout(async () => {
                const {
                    data: res3
                } = await this.$http.get(`http://152.136.254.142:5000/api/examine`)

                res3.unexamine.forEach(e => {
                    e.pic = (e.pic || "").split(",")
                    if (e.recognize.length > 10) {
                        
                        e.recognize = JSON.parse(e.recognize)
                    }
                })
                
                this.$store.state.advices = res3.unexamine
            }, 1000);
        },
        submit() {
            this.$refs.upload.submit()
        },
        async fankui() {
            this.$http.post(`http://152.136.254.142:5000/api/advice?id=2&message=能不能修剪一下树冠&pic=http://152.136.254.142:3000/uploads/bb6182b7d53e2773c1285bc5c2221c12`)
            
            const {
                data: res
            } = await this.$http.get(`http://152.136.254.142:5000/api/examine`)
            
        }
    },
    created() {
        this.$store.state.advices.filter(x => {
            this.newDotDatas.push(this.$store.state.dotsData[x.id - 1])
        })
    },
}
</script>

<style lang="less" scoped>
.advieBox {
    height: 95%;
    width: 86%;
    margin-left: 5px;
    margin-top: 8px;
    padding: 10px;
    background-color: #fff;
}

#viewDiv {
    height: 97%;
    width: 85%;
    margin-left: 5px;
    margin-top: 8px;
    position: relative;

    .seetype {
        position: absolute;
        top: 2%;
        right: 2%;
        background-color: white;
        padding: 0px 10px;
        border: 1px solid rgba(211, 211, 211);

        .el-container {
            align-items: center;

            .el-switch {
                border-right: 1px solid rgba(211, 211, 211);
                padding-right: 10px;
            }

            .el-main {
                --el-main-padding: 12px;
            }
        }

        .el-container:nth-child(2) {
            align-items: center;
            border-top: 1px solid rgba(211, 211, 211);
        }
    }

    .outtable {
        position: absolute;
        top: 10%;
        left: 1%;
        border-radius: 12px;
        box-shadow: 3px 3px 20px -5px rgb(0, 151, 252);
        .cellbuts{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .el-button {
                margin: 2px!important;
            }
        }
    }

    .iptbox {
        position: absolute;
        top: 30%;
        left: 30%;
        z-index: 999;
        border-radius: 12px;
        box-shadow: 3px 3px 20px -5px rgb(0, 151, 252);

    }
}

.m-2 {
    width: 100%;
}

.mt-4 {
    .el-button {
        width: 100%;
    }
}

.slide-fade-enter-active {
    transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-40px);
    opacity: 0;
}

.butplace {
    display: flex;
    background-color: #fff;

    .el-button {
        margin: 0 0px;
        padding: 0 5px;
        border-radius: 5px;
    }
}

.el-table__cell {
    .el-button {
        border: 1px solid black;
    }
}

.idtitle {
    background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    background-image: none;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    box-sizing: border-box;
    color: var(--el-input-text-color, var(--el-text-color-regular));
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: 0px;
    padding: 0px 11px;
    transition: var(--el-transition-box-shadow);
    width: 100%;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    border: none;
    font-size: 14px;
}

.upload-demo {
    background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    background-image: none;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    box-sizing: border-box;
    color: var(--el-input-text-color, var(--el-text-color-regular));
    font-size: inherit;
    line-height: 32px;
    outline: 0px;
    transition: var(--el-transition-box-shadow);
    width: 100%;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    border: none;
    font-size: 14px;
    text-align: center;
    justify-content: space-around;

    .el-upload {
        display: flex;
    }

    .el-button {
        margin-right: 10px;
        margin-left: -3px;
    }

    .el-upload__tip {
        margin: 0;
    }
}
.sameline {
    display: flex;
    background-color: rgb(255, 255, 255);

    .titlename {
        text-align: center;
        line-height: 33px;
        background-color: rgb(245, 247, 250);
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        overflow: hidden;
        color: #606266;
        flex: 1;
    }

    .el-input__inner {
        flex: 1;
    }
}
</style>
