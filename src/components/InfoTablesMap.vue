<template>
<div id="viewDiv" v-loading="this.$store.state.loading" element-loading-text="正在为您拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">

    <!-- 植物信息表格 -->
    <transition name="slide-fade">
        <vxe-table :data="this.$store.state.tabledots" height="800" style="width: 800px" class="outtable" v-show="this.$store.state.show" :row-class-name="tableRowClassName" show-overflow @cell-click="vxeclick">
            <vxe-column field="id" title="Id" min-width="30" align="center" />
            <vxe-column field="type" title="类型" min-width="50" :filters="[
        { label: '椰树', value: '椰树' },
        { label: '榕树', value: '榕树' },
      ]" :filter-method="vxfilterHandlerx" align="center" />
            <vxe-column field="time" title="日期" min-width="80" sortable align="center" />
            <vxe-column field="isused" title="状态" min-width="50" :filters="[
        { label: '正常', value: '正常' },
        { label: '异常', value: '异常' },
      ]" :filter-method="vxfilterHandler2" align="center" />
            <vxe-column field="areaid" title="所属区域" min-width="80" :filters="[
        { label: '区域1', value: '1' },
        { label: '区域2', value: '2' },
        { label: '区域3', value: '3' },
        { label: '区域4', value: '4' },
        { label: '区域5', value: '5' },
      ]" :filter-method="vxfilterHandler3" align="center" />
            <vxe-column field="imgurl" title="图片地址" min-width="100">
                <template #default="scope">
                    <el-image style="width: 50px; height: 50px" :src="scope.row.imgurl[0]" :initial-index="0" :preview-src-list="scope.row.imgurl" fit="cover">
                        <template #error>
                            <div class="image-slot">
                            </div>
                        </template>
                    </el-image>
                </template>

            </vxe-column>
            <vxe-column align="right" min-width="150">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="输入植株点id进行搜索" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="success" @click="deleteRow(scope.$index, scope.row)" v-if="scope.row.isused==='异常'">通过</el-button>
                </template>
            </vxe-column>
        </vxe-table>
    </transition>
    <!-- 编辑植物信息 -->
    <div class="iptbox" v-show="this.$store.state.showinput">
        <div class="idtitle">ID: {{this.eidtOne}}</div>
        <div>
            <el-date-picker v-model="input1" type="date" placeholder="日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :editable="false" />
        </div>
        <div class="mt-4">
            <el-select v-model="input2" class="m-2" placeholder="类型" size="default">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="mt-4">
            <el-select v-model="input3" class="m-2" placeholder="状态" size="default">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="mt-4">
            <div class="butplace">

                <el-button size="default" @click="submit" type="danger">确定</el-button>
                <el-button size="default" @click="cancel" type="primary">取消</el-button>
            </div>

        </div>
        <el-upload class="upload-demo" :action="uploadImgUrl" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" ref="upload1" :on-success="handleAvatarSuccess" :auto-upload="false">
            <el-button size="default" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
    </div>
    <!-- 浇水路段信息表格 -->
    <transition name="slide-fade">
        <vxe-table :data="this.$store.state.lineData" height="800" style="width: 800px" class="outtable" v-show="this.$store.state.showLine" :row-class-name="linetableRowClassName" @cell-click="elrowclick" show-overflow>
            <vxe-column field="ORIG_FID" title="Id" width="60" />
            <!-- ]" :filter-method="filterHandler"/> -->
            <vxe-column field="time" title="上次清洗日期" width="150" sortable format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
            <vxe-column field="isused" title="状态" width="80" :filters="[
        { label: '已清洗', value: '已清洗' },
        { label: '未清洗', value: '未清洗' },
      ]" :filter-method="filterHandler" />
            <vxe-column field="areaid" title="所属区域" min-width="80" :filters="[
                { label: '区域1', value: '1' },
                { label: '区域2', value: '2' },
                { label: '区域3', value: '3' },
                { label: '区域4', value: '4' },
                { label: '区域5', value: '5' },
            ]" :filter-method="filterHandler2" align="center" />
            <vxe-column field="cardid" title="所属员工ID" width="150" sortable align="center" />
            <vxe-column align="right">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit2(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="success" @click="deleteRow2(scope.$index, scope.row)" v-if="scope.row.isused==='未清洗'">通过</el-button>
                </template>
            </vxe-column>
        </vxe-table>
    </transition>
    <!-- 编辑浇水路段信息 -->
    <div class="iptbox" v-show="this.$store.state.showlineBox">
        <div class="idtitle">ID: {{this.eidtOne}}</div>
        <div>
            <el-date-picker v-model="input1" type="date" placeholder="上次清洗日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :editable="false" class="dateipt" />
        </div>
        <div class="mt-4">
            <el-select v-model="input2" class="m-2" placeholder="清洗状态" size="default">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="mt-4 washid">
            <el-input-number v-model="input4" :min="1" placeholder="工人ID" />
        </div>
        <div class="mt-4">
            <div class="butplace">
                <el-button size="default" @click="submit2" type="danger">确定</el-button>
                <el-button size="default" @click="cancel" type="primary">取消</el-button>
            </div>

        </div>
    </div>
    <!-- 环卫工人信息 -->
    <transition name="slide-fade">
        <el-table :data="this.$store.state.workData" height="800" style="width: 800px" class="outtable" v-show="this.$store.state.showWork" :row-class-name="linetableRowClassName">
            <el-table-column prop="name" label="名字" width="80" align="center" />
            ]" sortable/>
            <el-table-column prop="areaid" label="管理区ID" width="120" sortable align="center" />
            <el-table-column prop="cardid" label="员工ID" width="120" sortable align="center" />
            <el-table-column prop="manpic" label="图片地址" width="200">
                <template #default="scope">
                    <el-image style="width: 50px; height: 50px" :src="scope.row.manpic[0]" :initial-index="0" :preview-src-list="scope.row.manpic" fit="cover">
                        <template #error>
                            <div class="image-slot">
                            </div>
                        </template>
                    </el-image>
                </template>

            </el-table-column>
            <el-table-column align="right">
                <template #header>
                    <el-button size="small" type="success" @click="this.$store.state.showWorkBox2=true,this.input1=''">新建</el-button>
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit3(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="deleteRow3(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </transition>
    <!-- 修改环卫工人信息 -->
    <div class="iptbox" v-show="this.$store.state.showWorkBox">
        <div class="idtitle">工人ID: {{this.eidtOne}}</div>
        <div class="mt-4">
            <div class="sameline">
                <el-input v-model="input7" placeholder="姓名修改处" />
            </div>

        </div>
        <div class="mt-4">
            <div class="sameline">
                <div class="titlename">管理区ID</div>
                <el-input-number v-model="input4" :min="1" />
            </div>

        </div>
        <div class="mt-4">
            <div class="sameline">
                <div class="titlename">员工ID</div>
                <el-input-number v-model="input6" :min="1" />
            </div>
        </div>
        <el-upload class="upload-demo" :action="uploadImgUrl" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" ref="upload2" :on-success="handleAvatarSuccess" :auto-upload="false">
            <el-button size="default" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <div class="mt-4">
            <div class="butplace">
                <el-button size="default" @click="submit3" type="danger">确定</el-button>
                <el-button size="default" @click="cancel" type="primary">取消</el-button>
            </div>

        </div>
    </div>
    <!-- 新建环卫工人信息 -->
    <div class="iptbox" v-show="this.$store.state.showWorkBox2">

        <div class="mt-4">
            <div class="sameline">
                <el-input v-model="input1" placeholder="姓名" />
            </div>

        </div>
        <div class="mt-4">
            <div class="sameline">
                <div class="titlename">管理区ID</div>
                <el-input-number v-model="input4" :min="1" />
            </div>

        </div>
        <div class="mt-4">
            <div class="sameline">
                <div class="titlename">员工ID</div>
                <el-input-number v-model="input5" :min="1" />
            </div>
        </div>
        <el-upload class="upload-demo" :action="uploadImgUrl" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" ref="upload2" :on-success="handleAvatarSuccess" :auto-upload="false">
            <el-button size="default" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <div class="mt-4">
            <div class="butplace">
                <el-button size="default" @click="submit4" type="danger">确定</el-button>
                <el-button size="default" @click="cancel" type="primary">取消</el-button>
            </div>

        </div>
    </div>
    <div class="seetype">

        <el-container>
            <el-switch v-model="this.values.showDotvalue" active-color="#13ce66" inactive-color="#ff4949" @change="switchchange">
            </el-switch>
            <el-main>是否展示植株点</el-main>
        </el-container>
        <el-container>
            <el-switch v-model="this.values.showLinevalue" active-color="#13ce66" inactive-color="#ff4949" @change="switchchange">
            </el-switch>
            <el-main>是否展示浇水路段</el-main>
        </el-container>
    </div>
    <PeopleAdvice></PeopleAdvice>
    <TimeFilterBar v-show="this.$store.state.showMoveSlider"></TimeFilterBar>
    <AreaCount></AreaCount>
</div>
</template>

<script>
import {
    mapMutations
} from 'vuex'
import axios from 'axios';
import PeopleAdvice from './PeopleAdvice.vue';
import TimeFilterBar from './TimeFilterBar.vue';
import AreaCount from './AreaCount.vue';
export default {
    name: 'InfoTablesMap',
    data() {
        return {
            newDotDatas: [],
            fitThing1: [],
            fitThing3: [],
            times: 0,
            times2: 0,
            times3: 0,
            filerOder: {
                f: 0,
                s: 0,
                t: 0
            },
            input1: '',
            input2: '',
            input3: '',
            input4: NaN,
            input5: NaN,
            input6: NaN,
            input7: '',
            options1: [{
                value: '椰树',
                label: '椰树'
            }, {
                value: '榕树',
                label: '榕树'
            }],
            options2: [{
                value: '正常',
                label: '正常'
            }, {
                value: '异常',
                label: '异常'
            }],
            options3: [{
                value: '已清洗',
                label: '已清洗'
            }, {
                value: '未清洗',
                label: '未清洗'
            }],
            eidtOne: Number,
            fileList: [],
            uploadImgUrl: `http://152.136.254.142:3000/api/blog/uploadimg`,
            posturl: '',
            values: {
                showDotvalue: true,
                showLinevalue: false
            },
            imgurl: [],
            search: '',
            timerr: null,
            columns: [],
            datas: [],
            filteredValue: [],
            fillist: [],
        }
    },
    components: {
        PeopleAdvice,
        TimeFilterBar,
        AreaCount
    },
    methods: {
        ...mapMutations(['showTable']),
        vxeclick(e) {
            console.log(e.row);
            this.$store.state.gotos(e.row)
            this.$store.state.pushPopDoto(e.row)
        },
        elrowclick(e) {
            console.log(e.row);
            this.$store.state.gotos(e.row.dots[0])
            setTimeout(() => {
                this.$store.state.pushPoplineo(e.row)
            }, 100);

        },
        clearAlldata() {
            // this.input1 = ''
            this.input2 = ''
            this.input3 = ''
            this.input4 = NaN
            this.input5 = NaN
            this.input6 = NaN
            this.input7 = ''
            this.imgurl = []
        },
        vxfilterHandler3({
            option,
            row
        }) {
            if (this.times3 === 0) {
                // sort filters
                if (this.filerOder.f === 0) {
                    this.filerOder.f = 3
                }
                if (this.filerOder.s === 0 && this.filerOder.f != 3) {
                    this.filerOder.s = 3
                }
                if (this.filerOder.t === 0 && this.filerOder.s != 3 && this.filerOder.f != 3) {
                    this.filerOder.t = 3
                }
                this.times3++
                this.$store.state.justremoveAllDot()

            }
            if (this.times3 === 1) {
                setTimeout(() => {
                    this.times3 = 0
                    this.filerOder.f = 0
                    this.filerOder.s = 0
                    this.filerOder.t = 0
                }, 1000);
            }
            if (row.areaid === option.value) {
                if (this.filerOder.t === 0) {
                    if (this.filerOder.s === 0) {
                        this.$store.state.renderADot(row)
                    } else {
                        if (this.filerOder.s === 3) {
                            this.$store.state.renderADot(row)
                        }
                    }
                } else {
                    if (this.filerOder.t === 3) {
                        this.$store.state.renderADot(row)
                    }
                }
                return row.areaid === option.value
            }
        },
        vxfilterHandlerx({
            option,
            row
        }) {
            if (this.times === 0) {
                // sort filters
                if (this.filerOder.f === 0) {
                    this.filerOder.f = 1
                }
                if (this.filerOder.s === 0 && this.filerOder.f != 1) {
                    this.filerOder.s = 1
                }
                if (this.filerOder.t === 0 && this.filerOder.s != 1 && this.filerOder.f != 1) {
                    this.filerOder.t = 1
                }
                this.times++
                this.$store.state.justremoveAllDot()

            }
            if (this.times === 1) {
                setTimeout(() => {
                    this.times = 0
                    this.filerOder.f = 0
                    this.filerOder.s = 0
                    this.filerOder.t = 0
                }, 1000);
            }
            if (row.type === option.value) {
                if (this.filerOder.t === 0) {
                    if (this.filerOder.s === 0) {
                        this.$store.state.renderADot(row)
                    } else {
                        if (this.filerOder.s === 1) {
                            this.$store.state.renderADot(row)
                        }
                    }
                } else {
                    if (this.filerOder.t === 1) {
                        this.$store.state.renderADot(row)
                    }
                }
                return row.type === option.value
            }
        },
        vxfilterHandler2({
            option,
            row
        }) {
            if (this.times2 === 0) {
                // sort filters
                if (this.filerOder.f === 0) {
                    this.filerOder.f = 2
                }
                if (this.filerOder.s === 0 && this.filerOder.f != 2) {
                    this.filerOder.s = 2
                }
                if (this.filerOder.t === 0 && this.filerOder.s != 2 && this.filerOder.f != 2) {
                    this.filerOder.t = 2
                }
                this.times2++
                this.$store.state.justremoveAllDot()

            }
            if (this.times2 === 1) {
                setTimeout(() => {
                    this.times2 = 0
                    this.filerOder.f = 0
                    this.filerOder.s = 0
                    this.filerOder.t = 0
                }, 1000);
            }
            if (row.isused === option.value) {
                if (this.filerOder.t === 0) {
                    if (this.filerOder.s === 0) {
                        this.$store.state.renderADot(row)
                    } else {
                        if (this.filerOder.s === 2) {
                            this.$store.state.renderADot(row)
                        }
                    }
                } else {
                    if (this.filerOder.t === 2) {
                        this.$store.state.renderADot(row)
                    }
                }
                return row.isused === option.value
            }
        },
        filterHandler({
            option,
            row
        }) {
            if (this.times === 0) {
                if (this.filerOder.f === 0) {
                    this.filerOder.f = 1
                }
                if (this.filerOder.s === 0 && this.filerOder.f != 1) {
                    this.filerOder.s = 1
                }
                this.times++
                this.$store.state.justremoveline()
                setTimeout(() => {
                    this.times = 0
                }, 1000);
            }
            if (this.times === 1) {

                setTimeout(() => {
                    this.times = 0
                    this.filerOder.f = 0
                    this.filerOder.s = 0
                }, 1000);
            }
            if (row.isused === option.value) {
                if (this.filerOder.s === 0) {
                    for (let num = 0; num < row.dots.length - 1; num++) {
                        this.$store.state.renderAline(row.dots[num], row.dots[num + 1], row)
                    }
                } else {
                    if (this.filerOder.s === 1) {
                        for (let num = 0; num < row.dots.length - 1; num++) {
                            this.$store.state.renderAline(row.dots[num], row.dots[num + 1], row)
                        }
                    }
                }

            } else {
                return
            }
            return row.isused === option.valueFormat
        },
        filterHandler2({
            option,
            row
        }) {
            if (this.times2 === 0) {
                if (this.filerOder.f === 0) {
                    this.filerOder.f = 1
                }
                if (this.filerOder.s === 0 && this.filerOder.f != 2) {
                    this.filerOder.s = 2
                }
                this.times2++
                this.$store.state.justremoveline()
                setTimeout(() => {
                    this.times2 = 0
                    // console.log('time2:'+this.times2);
                }, 1000);
            }
            if (this.times2 === 1) {

                setTimeout(() => {
                    this.times2 = 0
                    this.filerOder.f = 0
                    this.filerOder.s = 0
                }, 1000);
            }
            if (row.areaid == option.value) {
                if (this.filerOder.s === 0) {
                    for (let num = 0; num < row.dots.length - 1; num++) {
                        // renderLine(e.dots[num],e.dots[num+1],e)
                        this.$store.state.renderAline(row.dots[num], row.dots[num + 1], row)
                    }
                } else {
                    if (this.filerOder.s === 2) {
                        console.log(this.filerOder.f, 'isused');
                        for (let num = 0; num < row.dots.length - 1; num++) {
                            // renderLine(e.dots[num],e.dots[num+1],e)
                            this.$store.state.renderAline(row.dots[num], row.dots[num + 1], row)
                        }
                    }
                }
            }
            return row.areaid == option.value

        },
        rowClick(row, column, event) {
            console.log(row, column, event);
            this.$store.state.gotos(row)
            if (row.ORIG_FID) {

            } else {

            }
        },
        handleEdit(index, row) {
            this.$store.state.showinput = !this.$store.state.showinput
            this.eidtOne = row.id
            console.log(this.eidtOne);
        },
        handleEdit2(index, row) {
            this.$store.state.showlineBox = !this.$store.state.showlineBox
            this.eidtOne = row.ORIG_FID
        },
        handleEdit3(index, row) {
            this.input1 = ''
            console.log(index, row)
            this.$store.state.showWorkBox = !this.$store.state.showWorkBox
            this.eidtOne = row.cardid
        },
        async submit() {
            if (this.input3 === '正常') {
                this.input3 = 1
            }
            if (this.input3 === '异常') {
                this.input3 = 0
            }
            this.input1.replace('/', '-')
            console.log(this.input1);
            this.$store.state.showinput = !this.$store.state.showinput
            this.$refs.upload1.submit()

            const timerr = setInterval(() => {
                console.log(this.imgurl);
                this.$store.state.tabledots.forEach(e => {
                    if (e.id === this.eidtOne) {
                        if (this.input1) {
                            e.time = this.input1
                        }
                        if (this.input2) {
                            e.type = this.input2
                        }
                        if (this.input3 === 0) {
                            e.isused = '异常'
                        }
                        if (this.input3 === 1) {
                            e.isused = '正常'
                        }
                        e.imgurl = this.imgurl
                        console.log(this.$store.state.toReplaceDot);
                        this.$store.state.toReplaceDot(e)
                        return
                    }
                });
                this.posturl = `http://152.136.254.142:5000/api/edit?id=${this.eidtOne}`
                if (this.input1) {
                    this.posturl = this.posturl + `&time=${this.input1}`
                }
                if (this.input2) {
                    this.posturl = this.posturl + `&type=${this.input2}`
                }
                if (this.input3 != '') {
                    this.posturl = this.posturl + `&isused=${this.input3}`
                }
                if (this.imgurl.length != 0) {
                    this.posturl = this.posturl + `&imgurl=${this.imgurl}`
                }
                console.log(this.posturl);
                this.$http.post(`${this.posturl}`)
                this.clearAlldata()
                clearInterval(timerr)
            }, 3000)
        },
        submit2() {
            this.posturl = `http://152.136.254.142:5000/api/editline?id=${this.eidtOne}`
            this.input1.replace('/', '-')
            console.log(this.input2);
            if (this.input2 === '已清洗') {
                this.input2 = 1
            }
            if (this.input2 === '未清洗') {
                this.input2 = 0
            }
            console.log(this.input2);
            if (this.input1) {
                this.posturl = this.posturl + `&time=${this.input1}`
            }
            if (this.input2 != null) {
                this.posturl = this.posturl + `&isused=${this.input2}`
            }
            if (this.input4) {
                this.posturl = this.posturl + `&cardid=${this.input4}`
            }
            console.log(this.posturl);
            this.$http.post(`${this.posturl}`)
            this.$store.state.lineData.forEach(e => {
                if (e.ORIG_FID === this.eidtOne) {
                    if (this.input1) {
                        e.time = this.input1
                    }
                    if (this.input4) {
                        e.cardid = this.input4
                    }
                    if (this.input2 === 0) {
                        e.isused = '未清洗'
                    }
                    if (this.input2 === 1) {
                        e.isused = '已清洗'
                    }
                    console.log(this.$store.state.toReplaceLine);
                    this.$store.state.toReplaceLine(e)
                    return
                }
            });
            this.$store.state.showlineBox = false
            this.clearAlldata()
        },
        submit3() {
            this.$refs.upload2.submit()

            const timerr = setInterval(() => {
                console.log(this.imgurl);
                this.posturl = `http://152.136.254.142:5000/api/editworker?cardid=${this.eidtOne}`
                if (this.input7) {
                    this.posturl = this.posturl + `&name=${this.input7}`
                }
                if (this.input4) {
                    this.posturl = this.posturl + `&areaid=${this.input4}`
                }
                if (this.input5) {
                    this.posturl = this.posturl + `&lineid=${this.input5}`
                }
                if (this.imgurl != {}) {
                    this.posturl = this.posturl + `&manpic=${this.imgurl}`
                }
                console.log(this.posturl);
                this.$http.post(`${this.posturl}`)
                this.imgurl = []
                clearInterval(timerr)
            }, 500)
            const timer = setInterval(async () => {
                const {
                    data: res2
                } = await this.$http.get('http://152.136.254.142:5000/api/getworker')
                console.log(res2.personinfo);
                res2.personinfo.forEach(e => {
                    e.manpic = (e.manpic || "").split(",")
                });
                this.$store.state.workData = res2.personinfo

                console.log(this.$store.state.workData);
                this.clearAlldata()
                clearInterval(timer)
            }, 1000)

            this.$store.state.showWorkBox = false

        },
        submit4() {
            this.$refs.upload2.submit()

            const timerr = setInterval(() => {
                console.log(this.imgurl);
                this.posturl = `http://152.136.254.142:5000/api/editworker?`
                if (this.input1) {
                    this.posturl = this.posturl + `&name=${this.input1}`
                }
                if (this.input4) {
                    this.posturl = this.posturl + `&areaid=${this.input4}`
                }
                if (this.input5) {
                    this.posturl = this.posturl + `&cardid=${this.input5}`
                }
                if (this.imgurl != {}) {
                    this.posturl = this.posturl + `&manpic=${this.imgurl}`
                }
                console.log(this.posturl);
                this.$http.post(`${this.posturl}`)
                this.imgurl = []
                clearInterval(timerr)
            }, 500)
            const timer = setInterval(async () => {
                const {
                    data: res2
                } = await this.$http.get('http://152.136.254.142:5000/api/getworker')
                console.log(res2.personinfo);
                res2.personinfo.forEach(e => {
                    e.manpic = (e.manpic || "").split(",")
                });
                this.$store.state.workData = res2.personinfo

                console.log(this.$store.state.workData);
                this.clearAlldata()
                clearInterval(timer)
            }, 1000)

            this.$store.state.showWorkBox = false

        },
        async deleteRow(index, row) {
            this.$http.post(`http://152.136.254.142:5000/api/edit?id=${row.id}&time=${this.input1}&isused=1`)
            this.$store.state.tabledots.forEach(e => {
                if (e.id === row.id) {
                    if (this.input1) {
                        e.time = this.input1
                    }
                    e.isused = '正常'
                    // console.log(this.$store.state.toReplaceDot);
                    this.$store.state.toReplaceDot(e)
                    return
                }
            });
        },
        async deleteRow2(index, row) {
            console.log(index, row);
            this.$http.post(`http://152.136.254.142:5000/api/editline?id=${row.ORIG_FID}&time=${this.input1}&isused=1`)
            this.$store.state.lineData.forEach(e => {
                if (e.ORIG_FID === row.ORIG_FID) {
                    if (this.input1) {
                        e.time = this.input1
                    }
                    e.isused = '已清洗'
                    console.log(this.$store.state.toReplaceLine);
                    this.$store.state.toReplaceLine(e)
                    return
                }
            });
        },
        async deleteRow3(index, row) {
            console.log(row.cardid);
            this.$http.post(`http://152.136.254.142:5000/api/deleteworker?cardid=${row.cardid}`)
            const {
                data: res2
            } = await this.$http.get('http://152.136.254.142:5000/api/getworker')
            console.log(res2.personinfo);
            res2.personinfo.forEach(e => {
                e.manpic = (e.manpic || "").split(",")
            });
            this.$store.state.workData = res2.personinfo
            console.log(this.$store.state.workData);
        },
        tableRowClassName(row, rowIndex) {
            if (row.row.isused === '异常') {
                return 'warning-row'
            } else if (row.row.isused === '正常') {
                return 'success-row'
            }
            return ''
        },
        linetableRowClassName(row, rowIndex) {
            if (row.row.isused === '未清洗') {
                return 'warning-row'
            } else if (row.row.isused === '已清洗') {
                return 'success-row'
            }
            return ''
        },
        cancel() {
            this.$store.state.showinput = false
            this.$store.state.showlineBox = false
            this.$store.state.showWorkBox = false
            this.$store.state.showWorkBox2 = false
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleAvatarSuccess(res, file) {
            console.log(res, file);
            this.imgurl.push(res.data.url)
            console.log(this.imgurl);
        },
        filterChange(e) {
            console.log(e);
        },
        switchchange(e) {
            console.log(this.values.showDotvalue * this.values.showLinevalue);
            if (this.values.showDotvalue === this.values.showLinevalue) {
                if (this.values.showDotvalue) {
                    this.$store.state.addALLs()
                    console.log("all");
                } else {
                    this.$store.state.clearAll()
                    console.log("clearall");
                }
            } else {
                if (this.values.showDotvalue) {
                    // this.showTable()
                    this.$store.state.clearlines()

                    console.log("showDot");
                } else {
                    this.$store.state.removeAllDot()
                    // this.$store.state.clearAll()
                    console.log("showline");
                }
            }
        },
    },
    watch: {
        search: {
            handler: function (search) {
                // clearInterval()
                // console.log(search);
                if (this.timerr) {
                    clearInterval(this.timerr)
                    this.timerr = null
                }
                this.timerr = setInterval(() => {
                    // console.log(search);
                    if (!search) {
                        this.$store.state.tabledots = this.$store.state.dotsData
                        return
                    }
                    this.$store.state.dotsData.forEach(e => {
                        if (e.id == search) {
                            this.$store.state.tabledots = []
                            this.$store.state.tabledots.push(e)
                            // console.log(this.$store.state.tabledots);
                            clearInterval(this.timerr)
                            this.timerr = null
                            return
                        }
                    })
                    clearInterval(this.timerr)
                    this.timerr = null
                }, 1000);
            }
        }
    },
    mounted() {
        this.timerr = setInterval(() => {
            console.log(this.$store.state.tabledots);
            if (this.$store.state.tabledots.length>100) {
                console.log(this.$store.state.tabledots);
                this.$store.state.tabledots = this.$store.state.dotsData
                clearInterval(this.timerr)
                console.log('mv get dots');
            }
        }, 1000);
        const dt = new Date();
        var ye = dt.getFullYear();
        var mon = dt.getMonth();
        var d = dt.getDate()
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        if (d < 10) {
            d = '0' + d
        }
        this.input1 = ye + '-' + months[mon] + '-' + d
        console.log(this.input1);
    }
}
</script>

<style lang="less" scoped>
#viewDiv {
    height: 97%;
    width: 86%;
    margin-left: 5px;
    margin-top: 8px;
    position: relative;
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
    .outtable {
        position: absolute;
        top: 10%;
        left: 0;
        border-radius: 12px;
        box-shadow: 3px 3px 20px -5px rgb(0, 151, 252);
        // left: 50%;
        // transform: translate3d(50%,50%,0);
    }

    .vxe-table {
        left: 1%;
        border-radius: 12px;
        box-shadow: 3px 3px 20px -5px rgb(0, 151, 252);
        overflow: hidden;

    }

    .iptbox {
        position: absolute;
        top: 30%;
        left: 30%;
        z-index: 999;
        border-radius: 12px;
        box-shadow: 3px 3px 20px -5px rgb(0, 151, 252);
        width: 220px;

        .washid {
            .el-input-number {
                width: 220px;
            }
        }

        // .sameline{
        //     margin: 2px 0;
        // }

    }

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

            // border-top: 1px solid rgba(211,211,211);
        }

        .el-container:nth-child(2) {
            align-items: center;
            border-top: 1px solid rgba(211, 211, 211);
        }
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

// .el-input-number{
//     width: 100%;
// }
// .el-input{
//     width: 100%!important;
// }
.sameline {
    display: flex;
    background-color: rgb(255, 255, 255);
    justify-content: center;

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
        height: 35px;
        line-height: 35px;
    }

}
</style><style>
.warning-row {
    /* --el-table-tr-bg-color: var(--el-color-danger);
     */
     background-color: rgb(255,73,73);
     color: white;
}

/* .el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-3);
} */

.el-table {
    --el-table-row-hover-bg-color: var(--el-color-primary);
    --el-table-text-color: var(--el-text-color-primary);
    --el-table-header-text-color: var(--el-text-color-primary);
}

.el-upload-list {
    margin-top: 0px;

}

.el-upload-list__item {
    margin-bottom: 0px;
}

.el-table .el-table__cell {
    z-index: unset;
}

/* .el-input-number__decrease{
        border: 1px solid #dcdfe6;
    } */
.el-input__inner {
    flex: 1;
    height: 35px;
    line-height: 35px;
}

.vxe-body--row:hover {
    background-color: rgb(68, 205, 206);
}
.vxe-icon--funnel::before {
    border-color: transparent !important;
    border-top-color: inherit !important;
    /* border-right-color: rgb(248,248,249)!important;
    border-bottom-color: rgb(248,248,249)!important;
    border-left-color: rgb(248,248,249)!important; */
}
</style>
