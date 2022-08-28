import React from "react";
import './Home.css'
import { NavLink } from "react-router-dom";
const Home=()=>{
    return (
        <div className="home-page">
            <h2>home页面</h2>
            <NavLink to="/about">跳转到About页面</NavLink>
        </div>
    )
}

export default Home