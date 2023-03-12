<template>
<div id="viewDiv2">
    <div class="iptbox" v-show="this.showinput">
        <div class="mt-4">
            <div class="idtitle">ID: {{this.eidtOne}}</div>
        </div>
        <div class="mt-4">
            <el-date-picker v-model="input1" type="date" placeholder="日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :editable="false" />
        </div>
        <div class="mt-4" v-if="$route.query.id != '0'">
            <el-select v-model="input2" class="m-2" placeholder="类型" size="default">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="mt-4" v-if="$route.query.id != '0'">
            <el-select v-model="input3" class="m-2" placeholder="状态" size="default">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="mt-4" v-if="$route.query.id === '0'">
            <el-input v-model="input3" placeholder="请输入内容" clearable type="textarea" autosize></el-input>
        </div>
        <el-upload class="upload-demo" :action="uploadImgUrl" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" ref="upload1" :on-success="handleAvatarSuccess" :auto-upload="false">
            <el-button size="default" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <div class="mt-4">
            <div class="butplace">

                <el-button size="default" @click="submit" type="danger">确定</el-button>
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
import axios from 'axios';
import qs from 'qs'

import Vconsole from 'vconsole';

export default {
    name: 'WeChat',
    data() {
        return {
            findpalce: {},
            reloadtimes: 0,
            inordots: [],
            loadDots: [],
            loadLines: [],
            position: {},
            renderDot: [],
            renderAline: [],
            imgurl: [],
            showinput: false,
            input1: '',
            input2: '',
            input3: '',
            uploadImgUrl: `http://152.136.254.142:3000/api/blog/uploadimg`,
            eidtOne: 1,
            areaId: '',
            fillist: [],
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
            posturl: '',
            fileList: [],
            img64: '',
            recogzres: {},
            toReplaceDot: [],
            toReplaceLine: [],
            orenderPosition: [],
            oremovepostion: [],
        }
    },
    methods: {
        async initMap() {
            const options = {
                url: 'https://js.arcgis.com/4.23/',
                css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css'
            }
            const [esriConfig, Map, MapView, Graphic, Point, route, RouteParameters, FeatureSet, GraphicsLayer, Locate, Track, TileInfo,WebTileLayer ] = await loadModules(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/geometry/Point", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet", "esri/layers/GraphicsLayer", "esri/widgets/Locate", "esri/widgets/Track", 'esri/layers/support/TileInfo',"esri/layers/WebTileLayer",], options)
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
                "lods": [
                    { "level": "1", "scale": 295829355.45, "resolution": 0.703125 },
                    { "level": "2", "scale": 147914677.725, "resolution": 0.3515625 },
                    { "level": "3", "scale": 73957338.8625, "resolution": 0.17578125 },
                    { "level": "4", "scale": 36978669.43125, "resolution": 0.087890625 },
                    { "level": "5", "scale": 18489334.715625, "resolution": 0.0439453125 },
                    { "level": "6", "scale": 9244667.3578125, "resolution": 0.02197265625 },
                    { "level": "7", "scale": 4622333.67890625, "resolution": 0.010986328125 },
                    { "level": "8", "scale": 2311166.839453125, "resolution": 0.0054931640625 },
                    { "level": "9", "scale": 1155583.4197265625, "resolution": 0.00274658203125 },
                    { "level": "10", "scale": 577791.7098632812, "resolution": 0.001373291015625 },
                    { "level": "11", "scale": 288895.8549316406, "resolution": 0.0006866455078125 },
                    { "level": "12", "scale": 144447.9274658203, "resolution": 0.00034332275390625 },
                    { "level": "13", "scale": 72223.96373291015, "resolution": 0.000171661376953125 },
                    { "level": "14", "scale": 36111.98186645508, "resolution": 0.0000858306884765625 },
                    { "level": "15", "scale": 18055.99093322754, "resolution": 0.00004291534423828125 },
                    { "level": "16", "scale": 9027.99546661377, "resolution": 0.000021457672119140625 },
                    { "level": "17", "scale": 4513.997733306885, "resolution": 0.000010728836059570312 },
                    { "level": "18", "scale": 2256.9988666534423, "resolution": 0.000005364418029785156 },
                    { "level": "19", "scale": 1128.4994333267211, "resolution": 0.000002682209014892578 }
                ]
            })
            const map = new Map({
                // basemap: "osm-streets-relief" // Basemap layer service

            });
            const veccLayer = new WebTileLayer({
                urlTemplate:
                  "https://{subDomain}.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=d49f2500d194b59fd2fb57f7d00dc891",
                tileInfo: tileInfo,
                spatialReference: { wkid: 4490 },

                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],         
              });
              const cvacLayer = new WebTileLayer({
                urlTemplate:
                  "https://{subDomain}.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=d49f2500d194b59fd2fb57f7d00dc891",
                tileInfo: tileInfo,
                spatialReference: { wkid: 4490 },
                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],         
              });
              const roadLayer = new WebTileLayer({
                urlTemplate:
                  "https://{subDomain}.tianditu.gov.cn/TDTService/wfs?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=d49f2500d194b59fd2fb57f7d00dc891",
                tileInfo: tileInfo,
                spatialReference: { wkid: 4490 },
                subDomains: ["gisserver"],         
              });
              map.add(veccLayer);
              map.add(cvacLayer);
              map.add(roadLayer);
            const view = new MapView({
                container: "viewDiv2",
                map: map,
                center: [110.32469, 20.06039],
                zoom: 16
            });
            // const routeUrl = "https://edutrial.geoscene.cn/geoscene/rest/services/finrout/NAServer/route";
            // view.on('click', (e) => {
            //     console.log(e);
            //     const cx=e.mapPoint.longitude
            //     const cy=e.mapPoint.latitude
            //         // 新建起始点
            //         console.log('x:' + cx + ', y:' + cy);
            //     const point = { //Create a point
            //         type: "point",
            //         longitude: cx,
            //         latitude: cy
            //     }
            //     const simpleMarkerSymbol = {
            //         type: "simple-marker",
            //         color: "white",// Orange
            //         size: "8px",
            //         outline: {
            //             color: "black", // White
            //             width: 1
            //         }
                    
                                    
            //     };
            //     const popupTemplate = {
            //         content:  `自定义起始点：${'x:' + cx + ', y:' + cy}`
    
            //     }
            //     const pointGraphic = new Graphic({
            //         geometry: point,
            //         symbol: simpleMarkerSymbol,
            //         popupTemplate: popupTemplate
            //     });
            //     graphicsLayer.add(pointGraphic);
               
            //         // 新建起始点
            //         // 开始路径分析
            //     this.inordots.forEach(e=>{
            //             if (e.x<(cx+0.003354)&&e.x>(cx-0.003354)&&e.y<(cy+0.003354)&&e.y>(cy-0.003354)) {
            //                 console.log(cx,cy);
            //                 view.graphics.removeAll()
            //                 var pointStop = new Point(cx, cy)
            //                 var pointStop2 = new Point(e.x, e.y)
            //                 const graphic = new Graphic({
            //                     geometry: pointStop
            //                 });
            //                 const graphic2 = new Graphic({
            //                     geometry: pointStop2
            //                 });
            //                 view.graphics.add(graphic);
            //                 view.graphics.add(graphic2);
            //                 // console.log(view.graphics);
            //                 const routeParams = new RouteParameters({
            //                     stops: new FeatureSet({
            //                         features: view.graphics.toArray()
            //                     }),

            //                     // returnDirections: false

            //                 });
            //                 getRoute(routeParams)
                            
            //             }
            //     })
            // })
            const graphicsLayer = new GraphicsLayer();
            const pointgraphicsLayer = new GraphicsLayer();
            const linegraphicsLayer = new GraphicsLayer();
            const positongraphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            map.add(pointgraphicsLayer);
            map.add(positongraphicsLayer);
            map.add(linegraphicsLayer);
            // if (this.$route.query.id != '0' || !this.$route.query.id) {
            //     const routeUrl = "http://localhost:6080/arcgis/rest/services/finr/NAServer/路径";

            //     this.loadDots.forEach(e => {
            //         if (e.isused === '异常') {

            //             // If the zoom-out action is clicked, fire the zoomOut() function

            //             console.log(e);
            //             view.graphics.removeAll()
            //             var pointStop = new Point(this.position.x, this.position.y)
            //             var pointStop2 = new Point(e.x, e.y)
            //             const originpopupTemplate = {
            //                 title: `美兰区卫生站`,
            //             }
            //             const graphic = new Graphic({
            //                 symbol: {
            //                     type: "simple-marker",
            //                     color: "white",
            //                     size: "8px"
            //                 },
            //                 popupTemplate: originpopupTemplate,
            //                 geometry: pointStop
            //             });
            //             const graphic2 = new Graphic({
            //                 symbol: {
            //                     type: "simple-marker",
            //                     color: "black",
            //                     size: "8px"
            //                 },
            //                 geometry: pointStop2
            //             });
            //             view.graphics.add(graphic);
            //             view.graphics.add(graphic2);
            //             console.log(view.graphics);
            //             const routeParams = new RouteParameters({
            //                 stops: new FeatureSet({
            //                     features: view.graphics.toArray()
            //                 }),

            //                 returnDirections: true

            //             });
            //             getRoute(routeParams)
            //             view.graphics.remove(graphic2);
            //             view.graphics.remove(graphic);
            //             // This event fires for each click on any action
            //             // Notice this event is handled on the default popup of the View
            //             // NOT on an instance of PopupTemplate
            //             // view.popup.on("trigger-action", function(event){
            //             // // If the zoom-out action is clicked, fire the zoomOut() function
            //             // if(event.action.id === "measure-this"){
            //             //     console.log(event);
            //             // }
            //             // });
            //             graphicsLayer.add(pointGraphic);
            //         }
            //     })
            //     function getRoute(routeParams) {
            //     console.log(123);
            //     view.graphics.removeAll()
            //     route.solve(routeUrl, routeParams).then(function (data) {

            //             data.routeResults.forEach(function (result) {
            //                 console.log(result);
            //                 result.route.symbol = {
            //                     type: "simple-line",
            //                     color: [5, 150, 255],
            //                     width: 3
            //                 };
            //                 view.graphics.add(result.route);
            //             });
            //         })

            //         .catch(function (error) {
            //             console.log(error);
            //         })

            // }
            //     // console.log(view.popup);
            // }

            // const track = new Track({
            //     view: view,
            //     graphic: new Graphic({
            //         symbol: {
            //             type: "simple-marker",
            //             size: "12px",
            //             color: "green",
            //             outline: {
            //                 color: "#efefef",
            //                 width: "1.5px"
            //             }
            //         }
            //     }),
            //     useHeadingEnabled: false,
            //     // tracking:false,
            // });
            // view.ui.add(track, "top-left");
            // track.on("track", (trackEvent) => {
            //     console.log(trackEvent);
            //     // JSON.stringify(trackEvent.position)
            //     // this.position=JSON.parse(trackEvent.position)

            //     // console.log("track: %s", mapView.scale);
            // })
            // console.log('555555555555555');
            // console.log(this.loadDots);
            const renderADots = (e) => {
                if (e.isused === "正常") {
                    const point = { //Create a point
                        type: "point",
                        longitude: e.x,
                        latitude: e.y
                    }
                    const simpleMarkerSymbol = {
                        type: "simple-marker",
                        size: 10,
                        color: [20, 224, 175],
                        outline: null
                    };
                    const measureThisAction = {
                        title: "点击提交反馈",
                        id: e.id,
                    };
                    const popupTemplate = {
                        title: `id:${e.id}`,
                        content: `树类型: ${e.type}<br>日期: ${e.time}<br>健康状态: ${e.isused}<img src=${e.imgurl[0]}>`,
                        actions: [measureThisAction],
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
                    view.popup.on("trigger-action", (event) => {
                        // If the zoom-out action is clicked, fire the zoomOut() function
                        if (event.action.id === e.id) {
                            console.log(event, e, this.showinput);
                            this.eidtOne = e.id
                            this.areaId = e.areaid
                            this.showinput = true

                        }
                    });
                    pointgraphicsLayer.add(pointGraphic);

                } else {
                    // 加载异常点数据
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
                    const measureThisAction = {
                        title: "点击提交反馈",
                        id: e.id,
                    };
                    const popupTemplate = {
                        title: `id:${e.id}`,
                        content: `树类型: ${e.type}<br>日期: ${e.time}<br>健康状态: ${e.isused}<img src=${e.imgurl[0]}>`,
                        actions: [measureThisAction],
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
                    view.popup.on("trigger-action", (event) => {
                        // If the zoom-out action is clicked, fire the zoomOut() function
                        if (event.action.id === e.id) {
                            console.log(event, e, this.showinput);
                            this.eidtOne = e.id
                            this.showinput = true

                        }
                    });
                    // pointGraphic.on('click',(e)=>{
                    //     console.log(e);
                    // })
                    pointgraphicsLayer.add(pointGraphic);
                }
            }
            this.renderDot = renderADots
            const renderLine = (e1, e2, line) => {
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
                        // color: [0,85*(line.cardid*2%3),255-85*(line.cardid*2%3)], // Orange
                        color: [96, 193, 224], // Orange
                        width: 2,
                        // marker: { // autocasts from LineSymbolMarker
                        //     style: "circle",
                        //     color: [45,214,191],
                        //     placement: "begin",
                        //     // size:"8px",
                        //  },
                    };
                    const measureThisAction = {
                        title: "点击通过清洗路段",
                        id: line.ORIG_FID,
                    };
                    const popupTemplate = {
                        title: `路段id:${line.ORIG_FID}`,
                        content: `所属区域Id: ${line.cardid}<br>上次清洗日期: ${line.time}<br>是否清洗: ${line.isused}`,
                        actions: [measureThisAction],

                    }
                    const polylineGraphic = new Graphic({
                        geometry: polyline,
                        symbol: simpleLineSymbol,
                        popupTemplate: popupTemplate,
                        attributes: {
                            "wrog": false,
                            "time": `${line.time}`,
                            "id": `${line.ORIG_FID}`,
                        }
                    });
                    view.popup.on("trigger-action", (event) => {
                        // If the zoom-out action is clicked, fire the zoomOut() function
                        if (event.action.id === line.ORIG_FID) {
                            this.$http.post(`http://152.136.254.142:5000/api/editline?id=${line.ORIG_FID}&time=${this.input1}&isused=1`)
                            this.loadLines.forEach(e => {
                                if (e.ORIG_FID === line.ORIG_FID) {
                                    if (this.input1) {
                                        e.time = this.input1
                                    }
                                    e.isused = '已清洗'
                                    console.log(this.toReplaceLine);
                                    this.toReplaceLine(e)
                                    return
                                }
                            });

                        }
                    });
                    linegraphicsLayer.add(polylineGraphic);
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
                    const measureThisAction = {
                        title: "点击通过清洗路段",
                        id: line.ORIG_FID,
                    };
                    const popupTemplate = {
                        title: `路段id:${line.ORIG_FID}`,
                        content: `所属区域Id: ${line.cardid}<br>上次清洗日期: ${line.time}<br>是否清洗: ${line.isused}`,
                        actions: [measureThisAction],

                    }
                    const polylineGraphic = new Graphic({
                        geometry: polyline,
                        symbol: simpleLineSymbol,
                        popupTemplate: popupTemplate,
                        attributes: {
                            "wrog": true,
                            "time": `${line.time}`,
                            "id": `${line.ORIG_FID}`,
                        }
                    });
                    view.popup.on("trigger-action", (event) => {
                        // If the zoom-out action is clicked, fire the zoomOut() function
                        if (event.action.id === line.ORIG_FID) {
                            this.$http.post(`http://152.136.254.142:5000/api/editline?id=${line.ORIG_FID}&time=${this.input1}&isused=1`)
                            this.loadLines.forEach(e => {
                                if (e.ORIG_FID === line.ORIG_FID) {
                                    if (this.input1) {
                                        e.time = this.input1
                                    }
                                    e.isused = '已清洗'
                                    console.log(this.toReplaceLine);
                                    this.toReplaceLine(e)
                                    return
                                }
                            });

                        }
                    });
                    linegraphicsLayer.add(polylineGraphic);
                }
            }
            this.renderAline = renderLine
            const renderPosition = (e) => {
                positongraphicsLayer.removeAll()
                // console.log(e);
                const point = { //Create a point
                    type: "point",
                    longitude: e.x,
                    latitude: e.y
                }
                const simpleMarkerSymbol = {
                    type: "simple-marker",
                    size: 20,
                    // color: [252,255,255],
                    outline: {
                        color: [13, 110, 253], // White
                        width: 1
                    },
                    path: 'M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
                };
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                });
                console.log(pointGraphic);
                positongraphicsLayer.add(pointGraphic);
            }
            this.orenderPosition = renderPosition
            // function removepostion(){
            //     // console.log(e);
            //     console.log(123154);
            //     positongraphicsLayer.removeAll()
            // }
            // this.oremovepostion=removepostion
            function replaceDot(e) {
                console.log(e, pointgraphicsLayer);
                pointgraphicsLayer.graphics.items.forEach(i => {
                    if (i.attributes.id == e.id) {
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

            function replaceLine(e) {
                console.log(e);
                linegraphicsLayer.graphics.items.forEach(i => {
                    if (i.attributes.id == e.ORIG_FID) {
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
            function getRoute(routeParams) {
                console.log(123);
                view.graphics.removeAll()
                route.solve(routeUrl, routeParams).then(function (data) {

                        data.routeResults.forEach(function (result) {
                            console.log(result);
                            result.route.symbol = {
                                type: "simple-line",
                                color: [5, 150, 255],
                                width: 3
                            };
                            view.graphics.add(result.route);
                        });
                    })

                    .catch(function (error) {
                        console.log(error);
                    })

            }
            // this.position=1264565

            // let locateWidget = new Locate({
            //     view: view, // Attaches the Locate button to the view
            //     graphic: new Graphic({
            //         symbol: {
            //             type: "simple-marker"
            //         } // overwrites the default symbol used for the
            //         // graphic placed at the location of the user when found
            //     })
            // });

            // view.ui.add(locateWidget, "top-right");
            // const routeUrl = "http://localhost:6080/arcgis/rest/services/finr/NAServer/路径";
            // view.graphics.removeAll();
            // 卫生站初始时创建
            //  var pointStart = new Point(110.324812, 20.070832)
            //  const originpopupTemplate = {
            //                 title: `美兰区卫生站`,
            //  }
            //   const pointStartgraphic = new Graphic({
            //                     symbol: {
            //                         type: "simple-marker",
            //                         color: "white",
            //                         size: "16px"
            //                     },
            //                     popupTemplate: originpopupTemplate,
            //                     geometry: pointStart 
            //                 });
            // graphicsLayer.add(pointStartgraphic)
            // view.on('click', (e) => {
            //     console.log(e);
            //     const cx=e.mapPoint.longitude
            //     const cy=e.mapPoint.latitude
            //     if (e.button===2) {
            //         // 新建起始点
            //         console.log('x:' + cx + ', y:' + cy);
            //     const point = { //Create a point
            //         type: "point",
            //         longitude: cx,
            //         latitude: cy
            //     }
            //     const simpleMarkerSymbol = {
            //         type: "simple-marker",
            //         color: "white",// Orange
            //         size: "8px",
            //         outline: {
            //             color: "black", // White
            //             width: 1
            //         }

            //     };
            //     const popupTemplate = {
            //         content:  `自定义起始点：${'x:' + cx + ', y:' + cy}`

            //     }
            //     const pointGraphic = new Graphic({
            //         geometry: point,
            //         symbol: simpleMarkerSymbol,
            //         popupTemplate: popupTemplate
            //     });
            //     graphicsLayer.add(pointGraphic);

            //         // 新建起始点
            //         // 开始路径分析
            //     this.inordots.forEach(e=>{
            //             if (e.x<(cx+0.003354)&&e.x>(cx-0.003354)&&e.y<(cy+0.003354)&&e.y>(cy-0.003354)) {
            //                 console.log(cx,cy);
            //                 view.graphics.removeAll()
            //                 var pointStop = new Point(cx, cy)
            //                 var pointStop2 = new Point(e.x, e.y)
            //                 const graphic = new Graphic({
            //                     geometry: pointStop
            //                 });
            //                 const graphic2 = new Graphic({
            //                     geometry: pointStop2
            //                 });
            //                 view.graphics.add(graphic);
            //                 view.graphics.add(graphic2);
            //                 // console.log(view.graphics);
            //                 const routeParams = new RouteParameters({
            //                     stops: new FeatureSet({
            //                         features: view.graphics.toArray()
            //                     }),

            //                     returnDirections: true

            //                 });
            //                 getRoute(routeParams)

            //             }
            //     })
            //     }
            // })
            // this.inordots.forEach(e => {
            //     if (e.isused === '异常') {
            //         const point = { //Create a point
            //             type: "point",
            //             longitude: e.x,
            //             latitude: e.y
            //         }
            //         const simpleMarkerSymbol = {
            //             type: "simple-marker",
            //             color: [245, 108, 108], // Orange
            //             outline: {
            //                 color: [255, 255, 255], // White
            //                 width: 1
            //             }
            //         };
            //         const measureThisAction = {
            //             title: "点击导航至此处",
            //             id: e.id,
            //         };
            //         const popupTemplate = {
            //             title: `id:${e.id}`,
            //             content: `树类型: ${e.type}<br>日期: ${e.time}<br>健康状态: ${e.isused}<div @click="console.log(1)">123</div>`,
            //             actions: [measureThisAction],

            //         }
            //         const pointGraphic = new Graphic({
            //             geometry: point,
            //             symbol: simpleMarkerSymbol,
            //             popupTemplate: popupTemplate
            //         });
            //         view.popup.on("trigger-action", function (event) {
            //             // If the zoom-out action is clicked, fire the zoomOut() function
            //             if (event.action.id === e.id) {
            //                 console.log(e);
            //                 view.graphics.removeAll()
            //                 var pointStop = new Point(110.324812, 20.070832)
            //                 var pointStop2 = new Point(e.x, e.y)
            //                 const originpopupTemplate = {
            //                 title: `美兰区卫生站`,
            //             }
            //                 const graphic = new Graphic({
            //                     symbol: {
            //                         type: "simple-marker",
            //                         color: "white",
            //                         size: "8px"
            //                     },
            //                     popupTemplate: originpopupTemplate,
            //                     geometry: pointStop
            //                 });
            //                 const graphic2 = new Graphic({
            //                     symbol: {
            //                         type: "simple-marker",
            //                         color: "black",
            //                         size: "8px"
            //                     },
            //                     geometry: pointStop2
            //                 });
            //                 view.graphics.add(graphic);
            //                 view.graphics.add(graphic2);
            //                 console.log(view.graphics);
            //                 const routeParams = new RouteParameters({
            //                     stops: new FeatureSet({
            //                         features: view.graphics.toArray()
            //                     }),

            //                     returnDirections: true

            //                 });
            //                 getRoute(routeParams)
            //             }
            //         });
            //         // This event fires for each click on any action
            //         // Notice this event is handled on the default popup of the View
            //         // NOT on an instance of PopupTemplate
            //         // view.popup.on("trigger-action", function(event){
            //         // // If the zoom-out action is clicked, fire the zoomOut() function
            //         // if(event.action.id === "measure-this"){
            //         //     console.log(event);
            //         // }
            //         // });
            //         graphicsLayer.add(pointGraphic);
            //     }
            // })
            // console.log(view.popup);
            // // var pointStop2 = new Point(110.324812, 20.065132)
            // // addGraphic("destination", pointStop2);
            // // getRoute()
            // // function addGraphic(type, point) {
            // //     const graphic = new Graphic({
            // //         symbol: {
            // //             type: "simple-marker",
            // //             color: (type === "origin") ? "white" : "black",
            // //             size: "8px"
            // //         },
            // //         geometry: point
            // //     });
            // //     graphic.attributes = {
            // //         "name": "end",
            // //     };
            // //     view.graphics.add(graphic);
            // //     console.log(view.graphics);
            // // }

            // function getRoute(routeParams) {
            //     console.log(123);
            //     view.graphics.removeAll()
            //     route.solve(routeUrl, routeParams).then(function (data) {

            //             data.routeResults.forEach(function (result) {
            //                 console.log(result);
            //                 result.route.symbol = {
            //                     type: "simple-line",
            //                     color: [5, 150, 255],
            //                     width: 3
            //                 };
            //                 view.graphics.add(result.route);
            //             });
            //         })

            //         .catch(function (error) {
            //             console.log(error);
            //         })

            // }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        cancel() {
            this.showinput = false
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
            // console.log(res.data.url)
            this.imgurl.push(res.data.url)
            console.log(this.imgurl);
            // this.imageUrl = res.data.url;
            // this.$emit("childRightFn", {
            //     ...this.rightData,
            //     ...{ imageUrl: this.imageUrl}, 
            //     ...{props: {src: this.imageUrl}} 
            // });
        },
        clearAlldata(){
            this.input1= ''
            this.input2= ''
            this.input3= ''
            this.imgurl= []
        },
        async submit() {
            // console.log(this.eidtOne);
            // console.log(this.input3, this.input1, this.input2);
            if (this.input3 === '正常') {
                this.input3 = 1
            }
            if (this.input3 === '异常') {
                this.input3 = 0
            }
            this.input1.replace('/', '-')
            console.log(this.input1);
            this.showinput = !this.showinput
            this.$refs.upload1.submit()
            if (this.$route.query.id != '0') {
                console.log(this.imgurl);
                console.log(1564561);
                this.posturl = `http://152.136.254.142:5000/api/edit?id=${this.eidtOne}`
                // if (this.recogzres.length>1) {
                //     console.log(this.recogzres);
                //     this.posturl = this.posturl + `&recognize=${this.recogzres}`
                //     this.recogzres={}
                // }
                if (this.input1) {
                    this.posturl = this.posturl + `&time=${this.input1}`
                }
                if (this.input2) {
                    this.posturl = this.posturl + `&type=${this.input2}`
                }
                if (this.input3 != null) {
                    this.posturl = this.posturl + `&isused=${this.input3}`
                }
                // if (this.input3 != '') {
                //     this.posturl = this.posturl + `&message=${this.input3}`
                // }
                if (this.imgurl.length > 0) {
                    this.posturl = this.posturl + `&imgurl=${this.imgurl}`
                    this.imgurl = {}
                }
                console.log(this.posturl);
                this.$http.post(`${this.posturl}`)
                this.imgurl = []
                this.loadDots.forEach(e => {
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
                        console.log(this.toReplaceDot);
                        this.toReplaceDot(e)
                        return
                    }
                });
            } else {
                setTimeout(async () => {
                    console.log(this.imgurl);
                    console.log('******************');
                    // this.postUrl()
                    this.imgto64(this.imgurl)
                    // console.log(this.recogzres);
                    // const recog=JSON.stringify(this.recogzres)
                    // console.log(recog);

                }, 2000)
            }
            this.clearAlldata()
        },
        postUrl() {
            this.posturl = `http://152.136.254.142:5000/api/advice?id=${this.eidtOne}&areaid=${this.areaId}`
            if (this.recogzres.length > 1) {
                console.log(this.recogzres);
                this.posturl = this.posturl + `&recognize=${this.recogzres}`
                this.recogzres = {}
            }
            if (this.input1) {
                this.posturl = this.posturl + `&time=${this.input1}`
            }
            // if (this.input2) {
            //     this.posturl = this.posturl + `&type=${this.input2}`
            // }
            if (this.input3 != '') {
                this.posturl = this.posturl + `&message=${this.input3}`
            }
            if (this.imgurl.length > 0) {
                this.posturl = this.posturl + `&pic=${this.imgurl}`
                this.imgurl = {}
            }
            console.log(this.posturl);
            this.$http.post(`${this.posturl}`)
            this.imgurl = []
        },
        imgto64(img) {
            // Image对象转base64
            function imageToBase64(image) {
                let canvas = document.createElement('canvas')
                let width = image.width
                let height = image.height

                canvas.width = width
                canvas.height = height
                let context = canvas.getContext('2d')
                context.drawImage(image, 0, 0, width, height)
                return canvas.toDataURL('image/jpeg')
            }

            // 回调方式
            function urlToBase64(url, callback = null) {
                let image = new Image()

                image.setAttribute('crossOrigin', 'Anonymous')
                image.src = url + '?v=' + Math.random()

                image.onload = function () {
                    let dataURL = imageToBase64(image)
                    if (callback) {
                        callback(dataURL)
                    }
                }
            }

            // Promise方式
            function urlToBase64Async(url) {
                return new Promise((resolve, reject) => {
                    urlToBase64(url, (data) => {
                        resolve(data)
                    })
                })
            }
            console.log(1564456);

            (async () => {
                let image_url = img
                console.log(1564);
                const dataURL = await urlToBase64Async(image_url)
                console.log(dataURL);
                var img_base64 = dataURL.replace('data:image/jpeg;base64,', '');
                var formData = {
                    img_base64: img_base64
                };

                var APP_CODE = "4948c90c139c450b90ebd8019a9b8278";
                let results = await axios({
                    url: 'http://plantgw.nongbangzhu.cn/plant/recognize2',
                    method: 'post',
                    headers: {
                        'Authorization': 'APPCODE ' + APP_CODE,
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    data: qs.stringify(formData)
                })
                this.recogzres.AliasName = results.data.Result[0].AliasName
                this.recogzres.Family = results.data.Result[0].Family
                this.recogzres.Genus = results.data.Result[0].Genus
                this.recogzres.Name = results.data.Result[0].Name
                this.recogzres.Score = results.data.Result[0].Score
                // console.log(this.recogzres);
                console.log(this.recogzres);
                this.recogzres = JSON.stringify(this.recogzres)
                console.log(this.recogzres);
                this.postUrl()
                // console.log(dataURL)
                // this.img64=dataURL
                // return dataURL
                // data:image/png;base64,iVBORw0KGgoAAAANSU
            })()
        },
    },
    async created() {
        let vConsole = new Vconsole();

        console.log(this.$route.query.id);
        const {
            data: res
        } = await this.$http.get('http://152.136.254.142:5000/api/gettrees')
        console.log(res);
        console.log('ressssssss');
        const {
            data: res2
        } = await this.$http.get('http://152.136.254.142:5000/api/getworker')
        console.log(res2.personinfo);
        res2.personinfo.forEach(e => {
            e.manpic = (e.manpic || "").split(",")
        });
        if (this.$route.query.id === '0') {
            if (navigator.geolocation) {
                var id = navigator.geolocation.getCurrentPosition(async (position) => {
                        console.log("纬度" + position.coords.latitude + "经度" + position.coords.longitude)
                        this.position.y = position.coords.latitude
                        this.position.x = position.coords.longitude

                        console.log('-----------');
                        console.log(this.position);

                        res.treeinfo.forEach(e => {
                            if (e.x < (this.position.x + 0.003) && e.x > (this.position.x - 0.003) && e.y > (this.position.y - 0.003) && e.y < (this.position.y + 0.003)) {
                                e.imgurl = (e.imgurl || "").split(",")
                                if (e.isused) {
                                    e.isused = '正常'
                                } else {
                                    e.isused = '异常'
                                }
                                this.loadDots.push(e)
                            }
                        });
                        console.log(this.loadDots);
                        setTimeout(() => {
                            this.loadDots.forEach(e => {
                                this.renderDot(e)
                            })

                        }, 1000);
                    },
                    function (err) {
                        switch (err.code) {
                            case err.PERMISSION_DENIED:
                                return "PERMISSION_DENIED";
                            case err.POSITION_UNAVAILABLE:
                                return "POSITION_UNAVAILABLE";
                            case err.TIMEOUT:
                                return "TIMEOUT";
                            default:
                                return "UNKNOWN_ERROR";
                        }
                    })
                // navigator.geolocation.clearWatch(id); 停止监视
            } else {
                console.log("你的浏览器不支持geolocation");
            }
        }
        if (this.$route.query.id == 1) {
            console.log(res);
            res.treeinfo.forEach(e => {
                if (e.isused === 0) {
                    e.isused = '异常'
                    this.loadDots.push(e)
                }
            })
            setTimeout(() => {
                this.loadDots.forEach(e => {
                    this.renderDot(e)
                })

            }, 1000);
        } else {
            const {
                data: res1
            } = await this.$http.get('http://152.136.254.142:5000/api/line')
            this.loadLines = []
            res1.lines.forEach(e => {
                if (e.areaid && e.areaid == this.$route.query.wid) {
                    if (e.isused) {
                        e.isused = '已清洗'
                    } else {
                        e.isused = '未清洗'
                        
                    }
                    this.loadLines.push(e)
                }
            })
            console.log(this.loadLines);
            res.treeinfo.forEach(e => {
                if (e.areaid === this.$route.query.wid) {

                    if (e.isused) {
                        e.isused = '正常'
                    } else {
                        e.isused = '异常'
                        this.inordots.push(e)
                    }
                    this.loadDots.push(e)
                }
            })
            console.log(this.loadDots,this.inordots);
            setTimeout(() => {
                this.loadDots.forEach(e => {
                    this.renderDot(e)
                })
                this.loadLines.forEach(e => {
                    for (let num = 0; num < e.dots.length - 1; num++) {
                        // renderLine(e.dots[num],e.dots[num+1],e)
                        this.renderAline(e.dots[num], e.dots[num + 1], e)
                    }
                    // this.renderAline(e)
                })
            }, 1000);
        }

    },
    async mounted() {
        this.initMap()
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                let inerposition = {}
                inerposition.y = position.coords.latitude
                inerposition.x = position.coords.longitude
                this.orenderPosition(inerposition)

            }, function (err) {
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        return "PERMISSION_DENIED";
                    case err.POSITION_UNAVAILABLE:
                        return "POSITION_UNAVAILABLE";
                    case err.TIMEOUT:
                        return "TIMEOUT";
                    default:
                        return "UNKNOWN_ERROR";
                }
            });
        } else {
            alert("浏览器不支持地理定位。");
        }
        // id3()
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
    },

}
</script>

<style lang="less" scoped>
#viewDiv2 {
    height: 100%;
    width: 100%;
    position: relative;

    .iptbox {
        position: absolute;
        top: 15%;
        left: 20%;
        z-index: 999;
        border-radius: 12px;
        box-shadow: 3px 3px 20px 3px rgb(17 53 75);
        width: 250px;
        background-color: #fff;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
        .idtitle {
            font-size: inherit;
            height: 32px;
            line-height: 32px;
            // outline: 0px;
            padding: 0px 11px;
            border: 1px solid #dcdfe6;
            // border: none;
            border-radius: 4px;
            overflow: hidden;
            font-size: 14px;
        }

        :deep(.upload-demo) {
            width: 100%;
            // display: flex;
            align-items: center;
            flex-direction: column;
            overflow: hidden;
            text-overflow: ellipsis;

            // justify-content: space-between;
            .el-button {
                margin-right: 5px;
                // margin-left: -3px;
            }

            .el-upload__tip {
                margin: 0;
            }

            .el-upload-list__item {
                margin-bottom: 0px;
            }

            .el-upload-list {
                margin-top: 0px;
            }

            .el-upload-list__item {
                .el-upload-list__item-name {
                    width: 200px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        /deep/.mt-4 {
            width: 100%;

            .el-input {
                width: 100% !important;
            }

            .el-select {
                width: 100% !important;
            }

            .butplace {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .el-button {
                    width: 50%;
                }
            }
        }

        .washid {
            .el-input-number {
                width: 220px;
            }
        }
    }

    .position {
        position: absolute;
        top: 20%;
        left: 20px;
        background-color: #fff;
        width: 200px;
        height: 200px;
    }
}

#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
}
</style>
