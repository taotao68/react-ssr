import React from 'react'
import {RouteSwitch} from './router/index'
// 还需要引入客户端路由渲染的包裹标签
import { BrowserRouter as Router } from 'react-router-dom'
const App=()=>{
    console.log(RouteSwitch)
    return (
         <Router>
            {/* 引入路由是一个组件引入的，所以直接函数调用即可 */}
            {RouteSwitch()}
         </Router>
    )
}

export default App