import React from "react";
// 需要用到客户端配置的路由内容
import { routes, RouteSwitch } from "./router/index";
// 还有就是需要服务端的路由标签，引入
import { StaticRouter as Router } from "react-router-dom";
// 服务端的入口文件
import { Provider } from "react-redux";
import { createServerStore } from "./store";

// 调用下面这个函数，我们就能拿到组件内容，然后从服务端返回出来
export default (ctx) => {
  return new Promise((resolve) => {
    // 创建promises数组来保存预请求的
    const promises = [];
    // 在这个地方进行路由的匹配处理以及数据的请求
    routes.forEach((route) => {
      // 两个判断，一个是路由的匹配，另外一个是预请求的处理
      if (route.path === ctx.request.path && route.loadData) {
        // 这个地方一定要执行
        promises.push(route.loadData());
      }
    });
    // 然后在这个地方将所有的预请求都发出去,使用Promise.all()方法，返回的是一个数组
    Promise.all(promises).then((data) => {
      // 在下面的数据中是可以获取到的，我们就可以做注水与脱水的过程了
      // 也就是在服务端我们可以拿到这个预请求的东西，但是我们怎么给客户端呢？有什么方法吗？
      // 我们使用redux来处理  vue中我们使用的是vuex来实现的
      console.log("promise的all的请求数据", data[0]);
      ctx.window= data.length && data[0].data.data
      // promsie.all的请求完后在把数据返回出去
      // 这个地方没有resolve出去，所以一直加载
      resolve(
        <Provider store={createServerStore()}>
          <Router location={ctx.req.url}>{RouteSwitch()}</Router>
        </Provider>
      );
    });
  });
};
