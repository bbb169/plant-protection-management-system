import { createApp } from 'vue'
import { createStore } from 'vuex'

import './index.css'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/theme-chalk/index.css'
import 'xe-utils'
import VXETable from 'vxe-table'
import '../node_modules/vxe-table/lib/style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import cors from 'cors'
// import mapy from './mapy'.use(echarts)


import {
    loadModules
} from 'esri-loader';
const options = {
    url: 'https://js.arcgis.com/4.23/',
    css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css'
}
const store = createStore({
    state() {
        return {
            count: 0,
            dotsData: [],
            lineData: [
            ],
            workData: [
            ],
            advices: [{
                tipid: 1,
                message: 'no',
                id: 2,
                pic: ['http://152.136.254.142:3000/uploads/5b2169ba827a990d32750c6ecfa09c51'],
                time: '2022-05-15',
            }, {
                tipid: 2,
                message: 'no',
                id: 3,
                pic: ['http://152.136.254.142:3000/uploads/5b2169ba827a990d32750c6ecfa09c51'],
                time: '2022-05-15',
            }],
            show: false,
            showinput: false,
            showLine: false,
            showlineBox: false,
            showWork: false,
            showWorkBox: false,
            showWorkBox2: false,
            showAdivce: false,
            showechart: false,
            showMoveSlider:false,
            showWrong:false,
            loading: false,
            clearAll: [],
            typeDots: [],
            isusedDots: [],
            isusedline: [],
            clearlines: [],
            removeAllDot: [],
            addALLs: [],
            dotTimes: [],
            lineTimes: [],
            addEditors: [],
            getpositions: [],
            guideline: [],
            bufferrenders: [],
            addsketch: [],
            tabledots: [],
            gotos: [],
            renderADot: [],
            renderAline: [],
            showDotsInSet: [],
            justremoveline: [],
            toReplaceDot:[],
            toReplaceLine:[],
            odotTimeRange:[],
            olineTimeRange:[],
            pushPopDoto:[],
            pushPopDoto:[],
            operateLayers:[],
            rongtree: 0,
            yetree: 0,
            inorongtree: 0,
            inoyetree: 0,
            time8: 0,
            time7: 0,
            time6: 0,
            time5: 0,
            times: 0,
        }
    },
    mutations: {
        async showTable() {
            this.state.loading = true
            const [esriConfig, arcgisMap, MapView, Graphic, GraphicsLayer, Sketch, BufferParameters, GeometryService, SpatialReference, Point, TileInfo,WebTileLayer,geometryEngineAsync] = await loadModules(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/widgets/Sketch", "esri/rest/support/BufferParameters",
                "esri/tasks/GeometryService", "esri/geometry/SpatialReference", "esri/geometry/Point", 'esri/layers/support/TileInfo',"esri/layers/WebTileLayer","esri/geometry/geometryEngineAsync",], options)
            esriConfig.apiKey = "AAPK932f5cc544e84bbab268bba3fe84a1d7SmaFp9BOIQZjFsfOj4uzM52qSUILhferkbdExJlkTihF_9zSXO3NXumZUOh9kpIl";
            const tileInfo = new TileInfo({
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
            const map = new arcgisMap({});
            const view = new MapView({
                container: "viewDiv",
                map: map,
                center: [110.32469, 20.06039],
                zoom: 16,
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
           const geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
            const buffraphicsLayer = new GraphicsLayer();
            const pointgraphicsLayer = new GraphicsLayer();
            const linegraphicsLayer = new GraphicsLayer();
            const sketchLayer = new GraphicsLayer();
            const sketch = new Sketch({
                view,
                layer: sketchLayer,
                creationMode: "update",
                availableCreateTools:["polygon", "rectangle", "circle"],
            });
            const pointParams = new BufferParameters();
            // 缓冲区分析
            const points = []
            pointParams.distances = [0.01];
            pointParams.unit = GeometryService.UNIT_KILOMETER;
            pointParams.bufferSpatialReference = new SpatialReference({ wkid: 32662 });
            pointParams.outSpatialReference = new SpatialReference({ wkid: 4326 })

            map.add(veccLayer);
            map.add(cvacLayer);
            map.add(roadLayer);
            map.add(sketchLayer);
            map.add(pointgraphicsLayer);
            map.add(buffraphicsLayer);
            const lineDatas = this.state.lineData
            this.state.gotos = goTo
            this.state.addsketch= addSketch
            this.state.bufferrenders = bufferRender
            this.state.clearAll = clearAllLayers
            this.state.renderAline = renderLine
            this.state.renderADot = renderADots
            this.state.clearDots = removeDots
            this.state.clearlines = removeLines
            this.state.removeAllDot = removeDots
            this.state.clearlines = removeAllLine
            this.state.showDotsInSet = showDotsInSet
            this.state.justremoveline = justremovelines
            this.state.addALLs = addALL
            this.state.operateLayers = operateLayers
            this.state.dotTimes = dotTime
            this.state.odotTimeRange=dotTimeRange
            this.state.olineTimeRange=lineTimeRange
            this.state.toReplaceDot=replaceDot
            this.state.toReplaceLine=replaceLine
            this.state.lineTimes = lineTime
            this.state.guideline = guidelines
            this.state.pushPopDoto=pushPopDot
            this.state.pushPoplineo=pushPopline
            view.on('click', viewClick)
            sketch.on("update", sketchUpdate)
            view.on('layerview-create',()=>{ this.state.loading = false })
            
            // render tree dots and road line

            renderAllLines()
            renderDots(this.state.dotsData)
            function renderADots(e) {
                let normal = (e.isused === "正常")
                const point = { //Create a point
                    type: "point",
                    longitude: e.x,
                    latitude: e.y
                }
                const simpleMarkerSymbol = {
                    type: "simple-marker",
                        size: 5,
                        color: normal ? [20, 224, 175] : [245, 108, 108],
                        outline: normal ? null : {
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
                        "wrog": !normal,
                        "time": `${e.time}`,
                        "id": `${e.id}`,
                        "isused": `${e.isused}`
                    }
                });
                pointgraphicsLayer.add(pointGraphic);
            }
            // 移除所有点数据
            function removeDots() {
                map.add(linegraphicsLayer);
                map.remove(pointgraphicsLayer)
            }
            // 移除所有线数据
            function removeAllLine() {
                // graphicsLayer.removeAll()
                // renderDots(dotiData)
                map.add(pointgraphicsLayer);
                map.remove(linegraphicsLayer)
            }
            function showDotsInSet(filterResultSet) {
                pointgraphicsLayer.graphics.items.forEach(e => {
                    filterResultSet.has(e.attributes.id) ? e.visible = true : e.visible = false
                });
            }
            function justremovelines() {
                linegraphicsLayer.removeAll()
            }
            // 加载所有数据
            function addALL() {
                map.add(pointgraphicsLayer);
                map.add(linegraphicsLayer);
            }
            // 筛选时间的点数据
            function dotTime(t1, t2) {
                pointgraphicsLayer.graphics.items.forEach(e => {
                    if (`${t1}` >= e.attributes.time && e.attributes.time > `${t2}`) {
                        e.visible=true
                    }else{
                        e.visible=false
                    }
                });
            }
            function dotTimeRange(t1,t2) {
                pointgraphicsLayer.graphics.items.forEach(e => {
                    if (`${t2}` >= e.attributes.time && e.attributes.time > `${t1}`) {
                        e.visible=true
                    }else{
                        e.visible=false
                    }
                });
            }
            function lineTimeRange(t1,t2) {
                linegraphicsLayer.graphics.items.forEach(e => {
                        if (`${t2}` >= e.attributes.time && e.attributes.time > `${t1}`) {
                            e.visible=SVGComponentTransferFunctionElement
                        }else{
                            e.visible=false
                        }
                });
                
            }
            // 更新点
            function replaceDot(e) {
                pointgraphicsLayer.graphics.items.forEach(i=>{
                    if (i.attributes.id==e.id) {
                        i.visible=false
                        if (!e.x) {
                            e.x=i.geometry.longitude
                            e.y=i.geometry.latitude
                        }
                        renderADots(e)
                        return
                    }
                })
                
            }
            // 更新线
            function replaceLine(e) {
                linegraphicsLayer.graphics.items.forEach(i=>{
                    if (i.attributes.id==e.ORIG_FID) {
                        i.visible=false
                        for (let num = 0; num < e.dots.length - 1; num++) {
                            renderLine(e.dots[num], e.dots[num + 1], e)
                        }
                        return
                    }
                })
                
            }
            // 筛选时间的点线数据
            function lineTime(t1, t2) {
                linegraphicsLayer.graphics.items.forEach(e => {
                    if (`${t1}` >= e.attributes.time && e.attributes.time > `${t2}`) {
                        e.visible=true
                    }else{
                        e.visible=false
                    }
                });
            }

            function guidelines(e) {
                const way = []
                e.forEach(i => {
                    way.push([i.KL - 0.004360, i.kT + 0.002074])
                })
                const polyline = {
                    type: "polyline",
                    paths: way
                }
                const simpleLineSymbol = {
                    type: "simple-line",
                    color: [0, 217, 209], // Orange
                    width: 4
                };
                const polylineGraphic = new Graphic({
                    geometry: polyline,
                    symbol: simpleLineSymbol,
                });
                pointgraphicsLayer.add(polylineGraphic);
            }
            
            function pushPopDot(params) {
                pointgraphicsLayer.graphics.items.forEach(i=>{
                    if (i.attributes.id==e.id) {
                        view.popup.open({
                            // Set the popup's title to the coordinates of the location
                            features: i,
                            location: i.geometry,
                            content: i.popupTemplate.content,
                            title: i.popupTemplate.title,
                            fetchFeatures:true
                          });
                        return
                    }
                })
            }

            function pushPopline(params) {
                linegraphicsLayer.graphics.items.forEach(i=>{
                    if (i.attributes.id==e.ORIG_FID) {
                        const pt =new Point(i.geometry.paths[0][0][0], i.geometry.paths[0][0][1])
                        view.popup.open({
                            // Set the popup's title to the coordinates of the location
                            features: i,
                            location: pt,
                            content: i.popupTemplate.content,
                            title: i.popupTemplate.title,
                            fetchFeatures:true,
                        });
                        return
                    }
                })
            }

            function renderDots(dots) {
                dots.forEach(e => {
                    // 加载正常点数据
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
                            title: `id:${e.id}`,
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
                                "type":`${e.type}`,
                                "isused": `${e.isused}`
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
                            size: 10,
                            outline: null
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
                            "type":`${e.type}`,
                            "isused": `${e.isused}`
                        }
                        });
                        pointgraphicsLayer.add(pointGraphic);
                    }
                });
            }
            
            function renderAllLines(params) {
                lineDatas.forEach(e => {
                    for (let num = 0; num < e.dots.length - 1; num++) {
                        renderLine(e.dots[num], e.dots[num + 1], e)
                    }
                })
            }

            function removeDots() {
                map.remove(pointgraphicsLayer);
            }

            function removeLines() {
                map.remove(linegraphicsLayer);
            }

            function addSketch() {
                view.ui.add(sketch, "bottom-right");
            }

            function goTo(e) {
                view.goTo({
                    center: [e.x-0.0009, e.y],
                    zoom: 17,
                })
            }

            function viewClick(e) {
                if (e.button === 2) {
                    const point = { //Create a point
                        type: "point",
                        longitude: e.mapPoint.longitude.toFixed(6),
                        latitude: e.mapPoint.latitude.toFixed(6)
                    }
                    const simpleMarkerSymbol = {
                        type: "simple-marker",
                        color: [149, 212, 117], // Orange
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const popupTemplate = {
                        content: `${'x:' + e.mapPoint.longitude.toFixed(6) + ', y:' + e.mapPoint.latitude.toFixed(6)}`

                    }
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: simpleMarkerSymbol,
                        popupTemplate: popupTemplate
                    });
                    pointgraphicsLayer.add(pointGraphic);
                }
            }

            function queryGraphicByPolygon(geometry) {
                this.state.showechart = false
                this.state.yetree = 0
                this.state.rongtree = 0
                this.state.inoyetree = 0
                this.state.inorongtree = 0
                this.state.time8 = 0,
                this.state.time7 = 0,
                this.state.time6 = 0,
                this.state.time5 = 0,
                points = []
                for (var i = 0, total = pointgraphicsLayer.graphics.items.length; i < total; i++) {
                    if (geometry.contains(pointgraphicsLayer.graphics.items[i].geometry)) {
                        
                        if (points.length>200) {
                            this.state.showWrong=true
                            setTimeout(() => {
                                this.state.showWrong=false
                            }, 3000);
                        }else{
                            points.push(pointgraphicsLayer.graphics.items[i].geometry)
                        }
                        const res = pointgraphicsLayer.graphics.items[i].attributes

                        if (res.type === '椰树') {
                            this.state.yetree++
                        } if (res.type === '榕树') {
                            this.state.rongtree++
                        }
                        if (res.isused === "异常") {
                            if (res.type === '椰树') {
                                this.state.inoyetree++
                            } if (res.type === '榕树') {
                                this.state.inorongtree++
                            }
                            if ("2022-05-01"<=res.time&&res.time<"2022-05-31"&&res.isused==="异常") {
                                this.state.time5++
                            }if ("2022-06-01"<=res.time&&res.time<"2022-06-30"&&res.isused==="异常") {
                                this.state.time6++
                            }if ("2022-07-01"<=res.time&&res.time<"2022-07-31"&&res.isused==="异常") {
                                this.state.time7++
                            }if (res.time>"2022-07-01"&&res.isused==="异常"){
                                this.state.time8++
                            }
                        }
                    }
                }
                this.state.showechart = true
                pointParams.geometries = points;

            }
            
            async function sketchUpdate(e) {
                if (e.graphics[0].symbol.type !="simple-fill") return

                // this polygon will be used to query features that intersect it
                const geometries = sketchLayer.graphics.map(function (graphic) {
                    return graphic.geometry
                });
                const queryGeometry = await geometryEngineAsync.union(geometries.toArray());
                queryGraphicByPolygon(queryGeometry)
            }

            function bufferRender(meter) {
                pointParams.distances = [meter/1000];
                if (!pointParams.geometries||pointParams.geometries.length<1) {
                    return
                }
                this.state.loading = true
                geometryService.buffer(pointParams).then((features)=> {
                   const symbol = {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color: [0, 218, 116, 0.5],
                        style: "solid",
                        outline: {  // autocasts as new SimpleLineSymbol()
                            color: "white",
                            width: 1
                        }
                    };

                    for (var i = 0; i < features.length; i++) {
                        buffraphicsLayer.add(new Graphic(features[i], symbol))
                    }
                    this.state.loading = false
                });
            }
            
            function renderLine(e1, e2, line) {
                let normal = (line.isused === "已清洗")
                const polyline = {
                    type: "polyline",
                    paths: [
                        [e1.x, e1.y], //Longitude, latitude
                        [e2.x, e2.y], //Longitude, latitude
                    ]
                }
                const simpleLineSymbol = {
                    type: "simple-line",
                    color: normal?[96, 193, 224]:[245, 108, 108], // Orange
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
                        "wrog": !normal,
                        "time": `${line.time}`,
                        "id": `${line.ORIG_FID}`,
                    }
                });
                linegraphicsLayer.add(polylineGraphic);
            }

            function clearAllLayers() {
                map.remove(pointgraphicsLayer);
                map.remove(linegraphicsLayer);;
            }

            function operateLayers(points,layers) { //-1 do nothing, 0 remove, 1 add.
                if (points>-1) points? map.add(pointgraphicsLayer):map.remove(pointgraphicsLayer) 
                if (layers>-1) layers? map.add(linegraphicsLayer):map.remove(linegraphicsLayer)
            }
        },
    },
})
const app = createApp(App)
app.use(VXETable)
app.config.globalProperties.$http = axios
app.use(cors).use(router).use(ElementPlus).use(store).mount('#app')