import React from 'react'
// Swicth是版本5的API 版本6应该用Routes
import {Route, Switch} from 'react-router-dom'

// 引入组件 
import Home from '../pages/Home/Home'
import About,{getUserInfo}from '../pages/About/About'

// 导出去，方便服务端的使用
export const routes=[
    {
        path:'/',
        exact:true,  //是否是严格匹配的标志
        component:Home
    },
    {
        path:'/about',
        exact:true,
        component:About,
        loadData:getUserInfo
    }
]
// 这个地方一定要导出，是没有导出的，所以导致没有展示出内容，（）默认是导出内容的
export const RouteSwitch=()=>(
   <Switch>
    {
        routes.map((route)=>{
            const {path,exact,component}=route
            return (
                <Route key={path} path={path} component={component} exact />
            )
        })
    }
    {/* 一般这个地方还会有一个没有匹配上的组件  NotFound */}
    {/* <Route component={NotFound}/> */}
   </Switch>
)