import { createRouter, createWebHashHistory } from 'vue-router'
import ManagePage from './components/ManagePage.vue'
import MyLogin from './components/MyLogin.vue'
import InfoTablesMap from './components/InfoTablesMap.vue'
import TreeStats from './components/TreeStats.vue'
import RoadStats from './components/RoadStats.vue'
import PeopleAdvice from './components/PeopleAdvice.vue'
import TimeFilterBar from './components/TimeFilterBar.vue'
import AreaCount from './components/area-count.vue'
import TreeRoute from './components/TreeRoute.vue'
import PointBuffer from './components/PointBuffer.vue'
import WeChat from './components/WeChat.vue'
import EditPostion from './components/EditPostion.vue'
const router = createRouter({
    history: createWebHashHistory(),
    mode:'hash',
    routes: [
        { path: '/', redirect: '/login'},
        { path: '/login', component: MyLogin },
        {path:'/manage-page',redirect:'/manage-page/info-tables-map'},
        {path:'/wechat',component: WeChat},
        { path: '/manage-page', component: ManagePage ,
        children:[{
            path: 'info-tables-map', component: InfoTablesMap
        },
        {
            path: 'tree-stats', component: TreeStats
        },
        {
            path: 'road-stats', component: RoadStats
        },
        {
            path: 'people-advice', component: PeopleAdvice
        },{
            path: 'time-filter-bar', component: TimeFilterBar
        },{
            path: 'area-count', component: AreaCount
        },{
            path: 'tree-route', component: TreeRoute
        },{
            path: 'point-buffer', component: PointBuffer
        },{
            path: 'edit-postion', component: EditPostion
        }]}
    ],
})
// router.beforeEach((to,from,next)=>{
//     console.log(from);
// })
// const VueRouterPush = Router.prototype.push
export default router