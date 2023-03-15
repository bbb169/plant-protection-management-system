<template>
<div id="viewDiv2">
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
    name: 'TreeRoute',
    data() {
        return {
            findpalce: {},
            reloadtimes: 0,
            inordots:[],
        }
    },
    methods: {
        async initMap() {
            const [esriConfig, Map, MapView, Graphic, Point, route, RouteParameters, FeatureSet, GraphicsLayer,TileInfo,WebTileLayer] = await loadModules(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/geometry/Point", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet", "esri/layers/GraphicsLayer",'esri/layers/support/TileInfo',"esri/layers/WebTileLayer",], options)

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
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            
            const routeUrl = "https://edutrial.geoscene.cn/geoscene/rest/services/finrout/NAServer/route";
            view.graphics.removeAll();
            // 卫生站初始时创建
             var pointStart = new Point(110.324812, 20.070832)
             const originpopupTemplate = {
                            title: `美兰区卫生站`,
             }
              const pointStartgraphic = new Graphic({
                                symbol: {
                                    type: "simple-marker",
                                    color: "white",
                                    size: "16px"
                                },
                                popupTemplate: originpopupTemplate,
                                geometry: pointStart 
                            });
            graphicsLayer.add(pointStartgraphic)
            view.on('click', (e) => {
                
                const cx=e.mapPoint.longitude
                const cy=e.mapPoint.latitude
                if (e.button===2) {
                    // 新建起始点
                    
                const point = { //Create a point
                    type: "point",
                    longitude: cx,
                    latitude: cy
                }
                const simpleMarkerSymbol = {
                    type: "simple-marker",
                    color: "white",// Orange
                    size: "8px",
                    outline: {
                        color: "black", // White
                        width: 1
                    }
                    
                                    
                };
                const popupTemplate = {
                    content:  `自定义起始点：${'x:' + cx + ', y:' + cy}`
    
                }
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                    popupTemplate: popupTemplate
                });
                graphicsLayer.add(pointGraphic);
               
                    // 新建起始点
                    // 开始路径分析
                this.inordots.forEach(e=>{
                        if (e.x<(cx+0.003354)&&e.x>(cx-0.003354)&&e.y<(cy+0.003354)&&e.y>(cy-0.003354)) {
                            
                            view.graphics.removeAll()
                            var pointStop = new Point(cx, cy)
                            var pointStop2 = new Point(e.x, e.y)
                            const graphic = new Graphic({
                                geometry: pointStop
                            });
                            const graphic2 = new Graphic({
                                geometry: pointStop2
                            });
                            view.graphics.add(graphic);
                            view.graphics.add(graphic2);
                            // 
                            const routeParams = new RouteParameters({
                                stops: new FeatureSet({
                                    features: view.graphics.toArray()
                                }),

                                // returnDirections: false

                            });
                            getRoute(routeParams)
                            
                        }
                })
                }
            })
            this.inordots.forEach(e => {
                if (e.isused === '异常') {
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
                        title: "点击导航至此处",
                        id: e.id,
                    };
                    const popupTemplate = {
                        title: `id:${e.id}`,
                        content: `树类型: ${e.type}<br>日期: ${e.time}<br>健康状态: ${e.isused}`,
                        actions: [measureThisAction],

                    }
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: simpleMarkerSymbol,
                        popupTemplate: popupTemplate
                    });
                    view.popup.on("trigger-action", function (event) {
                        // If the zoom-out action is clicked, fire the zoomOut() function
                        if (event.action.id === e.id) {
                            
                            view.graphics.removeAll()
                            var pointStop = new Point(110.324812, 20.070832)
                            var pointStop2 = new Point(e.x, e.y)
                            const originpopupTemplate = {
                            title: `美兰区卫生站`,
                        }
                            const graphic = new Graphic({
                                symbol: {
                                    type: "simple-marker",
                                    color: "white",
                                    size: "8px"
                                },
                                popupTemplate: originpopupTemplate,
                                geometry: pointStop
                            });
                            const graphic2 = new Graphic({
                                symbol: {
                                    type: "simple-marker",
                                    color: "black",
                                    size: "8px"
                                },
                                geometry: pointStop2
                            });
                            view.graphics.add(graphic);
                            view.graphics.add(graphic2);
                            
                            const routeParams = new RouteParameters({
                                stops: new FeatureSet({
                                    features: view.graphics.toArray()
                                }),
                            });
                            getRoute(routeParams)
                        }
                    });
                    graphicsLayer.add(pointGraphic);
                }
            })

            function getRoute(routeParams) {
                
                view.graphics.removeAll()
                route.solve(routeUrl, routeParams).then(function (data) {

                        data.routeResults.forEach(function (result) {
                            
                            result.route.symbol = {
                                type: "simple-line",
                                color: [5, 150, 255],
                                width: 3
                            };
                            view.graphics.add(result.route);
                        });
                    })

                    .catch(function (error) {
                        
                    })

            }
        },
    },
    async mounted() {
        this.inordots=this.$store.state.tabledots
        this.initMap()
    },

}
</script>

<style lang="less" scoped>
#viewDiv2 {
    height: 97%;
    width: 84%;
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

            // border-top: 1px solid rgba(211,211,211);
        }

        .el-container:nth-child(2) {
            align-items: center;
            border-top: 1px solid rgba(211, 211, 211);
        }
    }
}

#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    //   display: none;
}
</style>
