<template>
    <div id="viewDiv-c">
        <!-- 编辑植物信息 -->
        <div class="iptbox" v-show="this.showinput">
            <div class="idtitle" v-if="this.eidtOne">ID: {{ this.eidtOne }}</div>
            <div>
                <el-date-picker v-model="input1" type="date" placeholder="日期" format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD" :editable="false" />
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
            <div class="mt-4 washid">
                <el-input-number v-model="input5" :min="1" placeholder="所属区域ID" />
            </div>
            <div class="mt-4">
                <div class="butplace">

                    <el-button size="default" @click="submit" type="danger">确定</el-button>
                    <el-button size="default" @click="cancel" type="primary">取消</el-button>
                </div>

            </div>
            <el-upload class="upload-demo" :action="uploadImgUrl" :on-preview="handlePreview" :on-remove="handleRemove"
                :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList"
                ref="upload1" :on-success="handleAvatarSuccess" :auto-upload="false">
                <el-button size="default" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
        </div>
        <!-- 编辑浇水路段信息 -->
        <div class="iptbox" v-show="this.showlineBox">
            <div class="idtitle" v-if="this.eidtOne">ID: {{ this.eidtOne }}</div>
            <div>
                <el-date-picker v-model="input1" type="date" placeholder="上次清洗日期" format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD" :editable="false" class="dateipt" />
            </div>
            <div class="mt-4">
                <el-select v-model="input2" class="m-2" placeholder="清洗状态" size="default">
                    <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="mt-4 washid">
                <el-input-number v-model="input4" :min="1" placeholder="工人ID" />
            </div>
            <div class="mt-4 washid">
                <el-input-number v-model="input5" :min="1" placeholder="所属区域ID" />
            </div>
            <div class="mt-4">
                <div class="butplace">
                    <el-button size="default" @click="submit2" type="danger">确定</el-button>
                    <el-button size="default" @click="cancel" type="primary">取消</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {
    loadModules
} from 'esri-loader';
const options = {
    url: 'https://js.arcgis.com/4.23/',
    css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css'
}
export default {
    name: 'EditPostion',
    data() {
        return {
            showinput: false,
            showlineBox: false,
            renderdots: [],
            lineDatas: [],
            cgdots: [],
            cgdot: {},
            input1: '',
            input2: '',
            input3: '',
            input4: NaN,
            input5: NaN,
            eidtOne: 0,
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
            fileList: [],
            uploadImgUrl: `http://152.136.254.142:3000/api/blog/uploadimg`,
            posturl: '',
            imgurl: [],
            renderADot: [],
            renderAline: [],
            toReplaceDot: [],
            toReplaceLine: [],
        }
    },
    methods: {
        async initMap() {
            const [esriConfig, Map, MapView, Graphic, Point, route, RouteParameters, FeatureSet, GraphicsLayer, TileInfo, WebTileLayer, Sketch,Swipe,TileLayer,] = await loadModules(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/geometry/Point", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet", "esri/layers/GraphicsLayer", 'esri/layers/support/TileInfo', "esri/layers/WebTileLayer", "esri/widgets/Sketch","esri/widgets/Swipe","esri/layers/TileLayer",], options)

            esriConfig.apiKey = "AAPK932f5cc544e84bbab268bba3fe84a1d7SmaFp9BOIQZjFsfOj4uzM52qSUILhferkbdExJlkTihF_9zSXO3NXumZUOh9kpIl";
            var tileInfo = new TileInfo({
                "rows": 256,
                "cols": 256,
                "compressionQuality": 0,
                "origin": {
                    "x": -180,
                    "y": 90
                },
                "spatialReference": {
                    "wkid": 4490
                },
                "lods": [{
                    "level": "1",
                    "scale": 295829355.45,
                    "resolution": 0.703125
                },
                {
                    "level": "2",
                    "scale": 147914677.725,
                    "resolution": 0.3515625
                },
                {
                    "level": "3",
                    "scale": 73957338.8625,
                    "resolution": 0.17578125
                },
                {
                    "level": "4",
                    "scale": 36978669.43125,
                    "resolution": 0.087890625
                },
                {
                    "level": "5",
                    "scale": 18489334.715625,
                    "resolution": 0.0439453125
                },
                {
                    "level": "6",
                    "scale": 9244667.3578125,
                    "resolution": 0.02197265625
                },
                {
                    "level": "7",
                    "scale": 4622333.67890625,
                    "resolution": 0.010986328125
                },
                {
                    "level": "8",
                    "scale": 2311166.839453125,
                    "resolution": 0.0054931640625
                },
                {
                    "level": "9",
                    "scale": 1155583.4197265625,
                    "resolution": 0.00274658203125
                },
                {
                    "level": "10",
                    "scale": 577791.7098632812,
                    "resolution": 0.001373291015625
                },
                {
                    "level": "11",
                    "scale": 288895.8549316406,
                    "resolution": 0.0006866455078125
                },
                {
                    "level": "12",
                    "scale": 144447.9274658203,
                    "resolution": 0.00034332275390625
                },
                {
                    "level": "13",
                    "scale": 72223.96373291015,
                    "resolution": 0.000171661376953125
                },
                {
                    "level": "14",
                    "scale": 36111.98186645508,
                    "resolution": 0.0000858306884765625
                },
                {
                    "level": "15",
                    "scale": 18055.99093322754,
                    "resolution": 0.00004291534423828125
                },
                {
                    "level": "16",
                    "scale": 9027.99546661377,
                    "resolution": 0.000021457672119140625
                },
                {
                    "level": "17",
                    "scale": 4513.997733306885,
                    "resolution": 0.000010728836059570312
                },
                {
                    "level": "18",
                    "scale": 2256.9988666534423,
                    "resolution": 0.000005364418029785156
                },
                {
                    "level": "19",
                    "scale": 1128.4994333267211,
                    "resolution": 0.000002682209014892578
                }
                ]
            })
            const map = new Map({});
            const veccLayer = new WebTileLayer({
                urlTemplate: "https://{subDomain}.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=d49f2500d194b59fd2fb57f7d00dc891",
                tileInfo: tileInfo,
                spatialReference: {
                    wkid: 4490
                },

                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            });
            const nearInfrared = new WebTileLayer({
                urlTemplate: "https://{subDomain}.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=d49f2500d194b59fd2fb57f7d00dc891",
                tileInfo: tileInfo,
                spatialReference: {
                    wkid: 4490
                },

                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            });
            const cvacLayer = new WebTileLayer({
                urlTemplate: "https://{subDomain}.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=d49f2500d194b59fd2fb57f7d00dc891",
                tileInfo: tileInfo,
                spatialReference: {
                    wkid: 4490
                },
                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            });
            const roadLayer = new WebTileLayer({
                urlTemplate: "https://{subDomain}.tianditu.gov.cn/TDTService/wfs?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=d49f2500d194b59fd2fb57f7d00dc891",
                tileInfo: tileInfo,
                spatialReference: {
                    wkid: 4490
                },
                subDomains: ["gisserver"],
            });

            map.add(veccLayer);
            map.add(cvacLayer);
            map.add(roadLayer);
            map.add(nearInfrared);
            
            const view = new MapView({
                container: "viewDiv-c",
                map: map,
                center: [110.32469, 20.06039],
                zoom: 16
            });
            const swipe = new Swipe({
                leadingLayers: [veccLayer],
                trailingLayers: [nearInfrared],
                position: 65, // set position of widget to 35%
                view: view
            });

            view.ui.add(swipe);
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            const sketch = new Sketch({
                view,
                layer: graphicsLayer,
                creationMode: "update",
                availableCreateTools: ["point", "polyline",],
            });

            view.ui.add(sketch, "bottom-right");
            sketch.on("update", async (e) => {
                if (e.state === "complete") {
                    console.log(e.graphics[0]);
                    if (e.graphics[0].geometry.type === "polyline") {
                        console.log(e.graphics[0].geometry.paths[0]);
                        e.graphics[0].geometry.paths[0].forEach(e => {
                            const d = {
                                x: e[0],
                                y: e[1],
                            }
                            this.cgdots.push(d)
                        })
                        console.log(this.cgdots);
                        if (e.graphics[0].attributes) {
                            this.eidtOne = e.graphics[0].attributes.id
                            this.input5 = e.graphics[0].attributes.areaid
                        } else {
                            setTimeout(() => {
                                e.graphics[0].visible = false
                            }, 3000);

                        }

                        this.showlineBox = true
                    } else {
                        console.log(e.graphics[0].geometry.x, e.graphics[0].geometry.y);
                        this.cgdot = {
                            x: e.graphics[0].geometry.x,
                            y: e.graphics[0].geometry.y
                        }
                        console.log(this.cgdot);
                        if (e.graphics[0].attributes) {
                            this.eidtOne = e.graphics[0].attributes.id
                        } else {
                            setTimeout(() => {
                                e.graphics[0].visible = false
                            }, 3000);
                        }
                        this.showinput = true
                    }
                }
            })

            function renderADots(e) {
                if (e.isused === "正常") {
                    const point = { //Create a point
                        type: "point",
                        longitude: e.x,
                        latitude: e.y
                    }
                    const simpleMarkerSymbol = {
                        type: "simple-marker",
                        size: 5,
                        color: [20, 224, 175],
                        outline: null
                    };
                    const popupTemplate = {
                        title: `${e.id ? `id:${e.id}` : ''}`,
                        content: `树类型: ${e.type}<br>日期: ${e.time}<br>健康状态: ${e.isused}`

                    }
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: simpleMarkerSymbol,
                        popupTemplate: popupTemplate,
                        attributes: {
                            "wrog": false,
                            "time": `${e.time}`,
                            "id": `${e.id}`,
                        }
                    });
                    graphicsLayer.add(pointGraphic);

                } else {
                    // add inormal dots data
                    const point = { //Create a point
                        type: "point",
                        longitude: e.x,
                        latitude: e.y
                    }
                    const simpleMarkerSymbol = {
                        type: "simple-marker",
                        color: [245, 108, 108], // Orange
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const popupTemplate = {
                        title: `id:${e.id}`,
                        content: `树类型: ${e.type}<br>日期: ${e.time}<br>健康状态: ${e.isused}`

                    }
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: simpleMarkerSymbol,
                        popupTemplate: popupTemplate,
                        attributes: {
                            "wrog": true,
                            "time": `${e.time}`,
                            "id": `${e.id}`,
                        }
                    });
                    graphicsLayer.add(pointGraphic);
                }
            }
            this.renderADot = renderADots
            this.renderdots.forEach(e => {
                renderADots(e)
            })

            function renderLine(e1, e2, line) {
                if (line.isused === "已清洗") {
                    const polyline = {
                        type: "polyline",
                        paths: [
                            [e1.x, e1.y], //Longitude, latitude
                            [e2.x, e2.y], //Longitude, latitude
                        ]
                    }
                    const simpleLineSymbol = {
                        type: "simple-line",
                        color: [96, 193, 224], // Orange
                        width: 2,
                    };
                    const popupTemplate = {
                        title: `路段id:${line.ORIG_FID}`,
                        content: `所属区域Id: ${line.cardid}<br>上次清洗日期: ${line.time}<br>是否清洗: ${line.isused}`

                    }
                    const polylineGraphic = new Graphic({
                        geometry: polyline,
                        symbol: simpleLineSymbol,
                        popupTemplate: popupTemplate,
                        attributes: {
                            "wrog": false,
                            "time": `${line.time}`,
                            "id": `${line.ORIG_FID}`,
                            "areaid": `${line.areaid}`,
                        }
                    });
                    graphicsLayer.add(polylineGraphic);
                } else {
                    const polyline = {
                        type: "polyline",
                        paths: [
                            [e1.x, e1.y], //Longitude, latitude
                            [e2.x, e2.y], //Longitude, latitude
                        ]
                    }
                    const simpleLineSymbol = {
                        type: "simple-line",
                        color: [245, 108, 108], // Orange
                        width: 2
                    };
                    const popupTemplate = {
                        title: `路段id:${line.ORIG_FID}`,
                        content: `所属区域Id: ${line.cardid}<br>上次清洗日期: ${line.time}<br>是否清洗: ${line.isused}`

                    }
                    const polylineGraphic = new Graphic({
                        geometry: polyline,
                        symbol: simpleLineSymbol,
                        popupTemplate: popupTemplate,
                        attributes: {
                            "wrog": true,
                            "time": `${line.time}`,
                            "id": `${line.ORIG_FID}`,
                            "areaid": `${line.areaid}`,
                        }
                    });
                    graphicsLayer.add(polylineGraphic);
                }
            }

            this.renderAline = renderLine
            this.lineDatas.forEach(e => {
                for (let num = 0; num < e.dots.length - 1; num++) {
                    renderLine(e.dots[num], e.dots[num + 1], e)
                }
            })

            function replaceDot(e) {
                console.log(e, graphicsLayer);
                graphicsLayer.graphics.items.forEach(i => {
                    if (i.attributes && i.attributes.id == e.id && i.symbol.type === "simple-marker") {
                        i.visible = false
                        // i.symbol.color.a=0
                        // i.destroy() 

                        console.log(i);
                        renderADots(e)
                        return
                    }
                })

            }
            this.toReplaceDot = replaceDot
            // 更新线
            function replaceLine(e) {
                console.log(e);
                graphicsLayer.graphics.items.forEach(i => {
                    if (i.attributes && i.attributes.id == e.ORIG_FID && i.symbol.type != "simple-marker") {
                        i.visible = false
                        console.log(i);
                        for (let num = 0; num < e.dots.length - 1; num++) {
                            renderLine(e.dots[num], e.dots[num + 1], e)
                        }
                        return
                    }
                })

            }
            this.toReplaceLine = replaceLine
        },
        clearAlldata() {
            this.eidtOne = 0
            // this.input1 = ''
            this.input2 = ''
            this.input3 = ''
            this.input4 = NaN
            this.input5 = NaN
            this.imgurl = []
            this.showlineBox = false
            this.showinput = false
            this.cgdots = []
            this.cgdot = {}
        },
        typeCheck(is) {
            if (is) {
                if (this.input2 === '' || this.input3 === '' || this.input5 === '') {
                    this.$message({
                        message: '类型、状态、区域id不能为空',
                        type: 'error'
                    });
                    return 0
                } else {
                    return 1
                }
            } else {
                if (this.input2 === '' || this.input5 === NaN || this.input4 === NaN) {
                    this.$message({
                        message: '清洗状态、工人id、区域id不能为空',
                        type: 'error'
                    })
                    return 0
                } else {
                    return 1
                }
            }

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

            this.$refs.upload1.submit()
            if (this.eidtOne) {
                this.renderdots.forEach(e => {
                    if (e.id == this.eidtOne) {
                        if (this.input1) {
                            e.time = this.input1
                        }
                        if (this.input2) {
                            e.type = this.input2
                        }
                        if (this.input5) {
                            e.areaid = this.input5
                        }
                        if (this.input3 === 0) {
                            e.isused = '异常'
                        }
                        if (this.input3 === 1) {
                            e.isused = '正常'
                        }

                        e.x = this.cgdot.x
                        e.y = this.cgdot.y
                        console.log(this.toReplaceDot, e);
                        this.toReplaceDot(e)
                        this.showinput = !this.showinput
                        setTimeout(() => {
                            e.imgurl = this.imgurl
                        }, 3000);
                        return
                    }
                });
                const timerr = setInterval(() => {
                    console.log(this.imgurl, this.renderdots);

                    this.posturl = `http://152.136.254.142:5000/api/edit?id=${this.eidtOne}`
                    if (this.input1) {
                        this.posturl = this.posturl + `&time=${this.input1}`
                    }
                    if (this.input2) {
                        this.posturl = this.posturl + `&type=${this.input2}`
                    }
                    if (this.input3 != '') {
                        this.posturl = this.posturl + `&isused=${this.input3==='异常'?'0':'1'}`
                    }
                    if (this.imgurl.length != 0) {
                        this.posturl = this.posturl + `&imgurl=${this.imgurl}`
                    }
                    if (this.input5 != NaN) {
                        this.posturl = this.posturl + `&areaid=${this.input5}`
                    }
                    if (this.cgdot != {}) {
                        const data = JSON.stringify(this.cgdot)
                        this.posturl = this.posturl + `&dot=${data}`
                    }
                    console.log(this.posturl);
                    this.$http.post(`${this.posturl}`)
                    this.clearAlldata()
                    clearInterval(timerr)
                }, 3000)
            } else {
                const is = this.typeCheck(1)
                console.log(is);
                if (is) {
                    if (!this.input3) {
                        this.input3 = '异常'
                    } else {
                        this.input3 = '正常'
                    }
                    const renditem = {
                        areaid: this.input5,
                        id: '请刷新',
                        time: this.input1,
                        type: this.input2,
                        isused: this.input3,
                        x: this.cgdot.x,
                        y: this.cgdot.y

                    }
                    this.$store.state.dotsData.push(renditem)
                    console.log(renditem,this.$store.state.dotsData);
                    this.renderADot(renditem)
                    this.showinput = !this.showinput
                    const timerr = setInterval(() => {
                        console.log(this.imgurl, this.renderdots);

                        this.posturl = `http://152.136.254.142:5000/api/edit`
                        if (this.input1) {
                            this.posturl = this.posturl + `?time=${this.input1}`
                        }
                        if (this.input2) {
                            this.posturl = this.posturl + `&type=${this.input2}`
                        }
                        if (this.input3 != '') {
                            this.posturl = this.posturl + `&isused=${this.input3==='异常'?'0':'1'}`
                        }
                        if (this.imgurl.length != 0) {
                            this.posturl = this.posturl + `&imgurl=${this.imgurl}`
                        }
                        if (this.cgdot != {}) {
                            const data = JSON.stringify(this.cgdot)
                            this.posturl = this.posturl + `&dot=${data}`
                        }
                        if (this.input5 != NaN) {
                            this.posturl = this.posturl + `&areaid=${this.input5}`
                        }
                        console.log(this.posturl);
                        this.$http.post(`${this.posturl}`)
                        this.clearAlldata()
                        clearInterval(timerr)
                    }, 3000)
                    // this.clearAlldata()
                } else {

                }


            }

        },
        submit2() {

            this.input1.replace('/', '-')
            console.log(this.input2);

            if (this.input2 === '已清洗') {
                this.input2 = 1
            }
            if (this.input2 === '未清洗') {
                this.input2 = 0
            }
            console.log(this.input2);
            if (this.eidtOne) {
                this.lineDatas.forEach(e => {
                    if (e.ORIG_FID == this.eidtOne) {
                        if (this.input1) {
                            e.time = this.input1
                        }
                        if (this.input4) {
                            e.cardid = this.input4
                        }
                        if (this.input5) {
                            e.areaid = this.input5
                        }
                        if (this.input2 === 0) {
                            e.isused = '未清洗'
                        }
                        if (this.input2 === 1) {
                            e.isused = '已清洗'
                        }
                        e.dots = this.cgdots
                        console.log(this.toReplaceLine);
                        this.toReplaceLine(e)
                        return
                    }
                });
                this.posturl = `http://152.136.254.142:5000/api/editline?id=${this.eidtOne}`
                if (this.input1) {
                    this.posturl = this.posturl + `&time=${this.input1}`
                }
                if (this.input2) {
                    this.posturl = this.posturl + `&isused=${this.input2==='未清洗'?'0':'1'}`
                }
                if (this.input4) {
                    this.posturl = this.posturl + `&cardid=${this.input4}`
                }
                if (this.input5) {
                    this.posturl = this.posturl + `&areaid=${this.input5}`
                }
                if (this.cgdots != {}) {
                    const data = JSON.stringify(this.cgdots)
                    this.posturl = this.posturl + `&dots=${data}`
                }
                console.log(this.posturl);
                this.$http.post(`${this.posturl}`)

                this.clearAlldata()
            } else {
                const is = this.typeCheck(0)
                console.log(is);
                if (is) {
                    if (!this.input2) {
                        this.input2 = '未清洗'
                    } else {
                        this.input2 = '已清洗'
                    }
                    const renditem = {
                        areaid: this.input5,
                        cardid: this.input4,
                        ORIG_FID: null,
                        time: this.input1,
                        isused: this.input2,
                        dots: this.cgdots

                    }
                    
                    this.$store.state.lineData.push(renditem)
                    console.log(renditem,this.$store.state.lineData);
                    for (let num = 0; num < renditem.dots.length - 1; num++) {
                            this.renderAline(renditem.dots[num], renditem.dots[num + 1], renditem)
                    }
                    // this.renderAline(renditem)
                    this.showinput = !this.showinput
                    this.posturl = `http://152.136.254.142:5000/api/editline`
                    if (this.input1) {
                        this.posturl = this.posturl + `?time=${this.input1}`
                    }
                    if (this.input2) {
                        this.posturl = this.posturl + `&isused=${this.input2==='未清洗'?'0':'1'}`
                    }
                    if (this.input4) {
                        this.posturl = this.posturl + `&cardid=${this.input4}`
                    }
                    if (this.input5) {
                        this.posturl = this.posturl + `&areaid=${this.input5}`
                    }
                    if (this.cgdots != {}) {
                        const data = JSON.stringify(this.cgdots)
                        this.posturl = this.posturl + `&dots=${data}`
                    }
                    console.log(this.posturl);
                    this.$http.post(`${this.posturl}`)
                    this.clearAlldata()
                }
            }

            // this.uploadImgUrl=`http://152.136.254.142:3000/api/blog/uploadimg?id=${this.eidtOne+1}&time=${this.input1}&type=${this.input2}&isused=${this.input3}`
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
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handleAvatarSuccess(res, file) {
            console.log(res, file);
            this.imgurl.push(res.data.url)
            console.log(this.imgurl);
        },
        cancel() {
            this.showinput = false
            this.showlineBox = false
            this.clearAlldata()
        },
    },
    async mounted() {
        this.renderdots = this.$store.state.dotsData
        this.lineDatas = this.$store.state.lineData
        this.initMap()
        const dt = new Date();
        var ye = dt.getFullYear();
        var mon = dt.getMonth();
        var d = dt.getDate()
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        if (d < 10) {
            d = '0' + d
        }
        this.input1 = ye + '-' + months[mon] + '-' + d
    },

}
</script>

<style lang="less" scoped>
#viewDiv-c {
    height: 97%;
    width: 84%;
    margin-left: 5px;
    margin-top: 8px;
    position: relative;

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
    }
}

.mt-4 {
    .el-button {
        width: 100%;
    }
}

.m-2 {
    width: 100%;
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

.butplace {
    display: flex;
    background-color: #fff;

    .el-button {
        margin: 0 0px;
        padding: 0 5px;
        border-radius: 5px;
    }
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

#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
}
</style>
