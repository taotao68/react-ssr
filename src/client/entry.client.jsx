// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App'

// // 渲染
// ReactDOM.render(<App/>,document.getElementById('root'))

// 上面的写法是react.17的写法，由于安装的是18,所以要用最新版的语法。
// 下面是react18的写法：
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);

import { Provider } from "react-redux";
import { createClientStore } from "./store";

root.render(
  <Provider store={createClientStore()}>
    <App />
  </Provider>
);
