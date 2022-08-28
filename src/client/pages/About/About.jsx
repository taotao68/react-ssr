import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './About.css'
import { NavLink } from 'react-router-dom'
// 在about页面中使用redux中的数据
import {useSelector,useDispatch} from 'react-redux'
export const getUserInfo=()=>{
    return  axios.get('http://localhost:3000/api/getUserInfo')
}

const About=()=>{
    // const [userInfo,setUserInfo]=useState({name:""})
    const name=useSelector(state=>{
        return state.name
    })
    // 将接口请求返回时我们用diaptch
    const dispatch=useDispatch()
    useEffect(()=>{
        // 这个里面就需要去做判断了，如果你是在本页面进行首页渲染的时候，服务端是不去请求的；
    // 如果你再about页面进行刷新请求时，在点击切换路由的时候，它是通过js切换到了首页，切换到首页没有进行数据请求的呃，所以你本地要重新发起数据请求
    // 判断name存在不存在，不存在再去发起请求
    if(!name){
        axios.get('http://localhost:3000/api/getUserInfo').then((res)=>{
            console.log('请求的值',res.data.data)
            dispatch({type:'CHANGE_DATA',payload:res.data.data})
           })
    }
    },[])
    return (
        <>
        <div className='about-page'>
            <h2>About 页面</h2>
            <h3>姓名是：{name}</h3>
            <NavLink to="/">跳转到Home页面</NavLink>
        </div>
        </>
    )
}

export default About