#react ssr

客户端渲染：
优点：可见即可操作  页面操作流程自然
缺点：白屏时间长  SEO不友好
服务端渲染：
优点：seo友好  首屏加载快（服务端返回渲染的）
缺点：页面体验不好  可见不一定可操作性  服务器压力大（每次页面切换都要重新请求服务器）

SSR是结合了客户端和服务端渲染的优点
优点：SEO友好  首屏加载时间快  页面切换自然（只有首屏是服务端返回渲染的）
缺点：配置复杂  服务端压力大  不分开发受限

权衡选择技术方案：
预渲染：单纯的SEO  （如果只是单纯的想要SEO，可以选择预渲染）
SSR：性能，SEO  （如果想要极致的性能，比如页面秒开，就可以选SSR了）


技术栈：
react react-router axios redux +koa

关键点：
客户端搭建
服务端搭建
SSR处理：
     -路由处理
     -请求处理

1.首先是项目初始化  yarn init -y  或者pnpm init 
2.搭建项目目录，我们还是自己配置脚手架
  src 
    --build  //配置文件放在这里
    --client  //客户端的文件
    --server  //服务端的文件
3.安装技术框架 react react-dom
pnpm add react react-dom
4.然后创建服务端的代码文件
 cilent 
     --pages  //页面文件
        --Home
        --About
     --App.jsx  //根主文件
     --entry.cilent.jsx  //客户端主入口文件
5.页面写完了，想要进行页面的切换 就需要安装router了react-router-dom
pnpm add react-router-dom
接下来进行路由的书写，先用router5版本的写  写成一个组件，方便服务端也要使用的
新建router文件夹  index.jsx文件  和vue操作一样，代码如下
import React from 'react'
import {Switch,Route} from 'react-router-dom'

// 引入组件 
import Home from '../pages/Home/Home'
import About from '../pages/About/About'

// 导出去，方便服务端的使用
export const routes=[
    {
        path:'/home',
        exact:true,  //是否是严格匹配的标志
        component:Home
    },
    {
        path:'/about',
        exact:true,
        component:About
    }
]

export const Routes=()=>{
   <Switch>
    {
        routes.map((route)=>{
            const {path,exact,component}=route
            return (
                <Route key={path} path={path} component={component} exact={exact}/>
            )
        })
    }
    {/* 一般这个地方还会有一个没有匹配上的组件  NotFound */}
    {/* <Route component={NotFound}/> */}
   </Switch>
}


然后在根文件APP.jsx中进行渲染展示路由，代码如下
客户端路由渲染用BrowserRouter  服务端路由渲染用StaticRouter  两者的作用是一样的
import React from 'react'
import Routes from './router/index'
// 还需要引入客户端路由渲染的包裹标签
import { BrowserRouter as Router } from 'react-router-dom'
const App=()=>{
    return (
         <Router>
            {/* 引入路由是一个组件引入的，所以直接函数调用即可 */}
            {(Routes())}
         </Router>
    )
}

export default App

6.进行webpack的配置  将页面渲染出来进行展示
安装 webpack webpack-cli  webpack-dev-server     命令：pnpm add webpack webpack-cli webpack-dev-server -D
然后是和vue-ssr中webpack配置几乎是一样的
在build文件夹新建是三个文件
  build 
     --webpcak.base.js   //webpack 的基础配置  客户端和服务端都会用到的
     --webpack.client.dev.js  //webapck  客户端的配置
     --webpack.server.dev.js  //webpack  服务端的配置
先配置webpack.base.js的配置
const {resolve}=require('path')
module.exports={
    // 配置打包输出的文件所在的位置
    output:{
      path:resolve(__dirname,'../dist')
    },
    module:{  //webpack中配置中modules是不带s的配置  一定注意不能带s
        rules:[
            // 首先配置的解析js与jsx的文件  babel-loader插件来编译
            {
                test:/\.js(x)$/,
                use:['babel-loader'],
                exclude:/node_modules/
            }
        ]
    },
    // 配置项目的别名
    resolve:{
        // 配置这个后 引入文件后面就不用再写后缀名了
       extensions:['.jsx','.js']
    }
}

需要利用babel来解析react语法的,进入到babel官网里面进行查找和react的配置
安装@babel/preset-react  以及babel-loader 还有使用babel的核心代码@babel/core
pnpm add babel-loader @babel/core @babel/preset-react -D
安装好之后哈需要配置我们的.babelrc文件  新建.babelrc文件  配置如下
{
  "presets": ["@babel/preset-react"]
}

这样我们的babel解析就完成了，配置如上面那样
接下来还有css的解析配置，但是客户端和服务端的配置就不一样了，需要进行单独的配置
首先是客户端配置 webpack.client.dev.js
首先也是需要  html-webapck-plugin   mini-css-extract-plugin 两个插件的；以及将基础webapkc.base.js文件和客户端webpack.client.dev.js合并的插件webpack-merge
安装这三个插件 pnpm add webpack-merge html-webpack-plugin mini-css-extract-plugin -D
然后进行配置，代码如下
const {resolve} =require('path')
const {merge}=require('webpack-merge')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')

const baseConfig=require('webpack.base.js')
const devConfig={
    mode:'development',  //开发模式 生产模式是production
    entry:resolve(__dirname,'../src/client/entry.client.jsx'), //入口文件
    output:{   //输出文件的配置  因为webpack.base.js中已经配置了输出的文件目录位置  这个地方只需要写输出的文件名是啥即可
        filename:'cilent-bundle.js'
    },
    // 这个配置devServer是干嘛用的，需要去看下
    // devServer 模式是寻找打包后的index.html文件的，所以在使用HtmlWebpackPlugin的时候，注意要生成index.html文件
    devServer:{
        // 指定路径作为请求的资源路径
      static:resolve(__dirname,'../dist'),
    //   是否开启压缩
      compress:true,
    //   端口号
      port:'8080',
    //   是否自动打开默认浏览器
      open:true,
    //   当你使用HTML5的history API的时候，当404出现的时候你可能希望使用index.html来作为请求的资源，这时候你可以使用这个配置historyApiFallback:true。
      historyApiFallback:true
    },
    module:{   //webapck配置这个地方不是modules  而是不带s的配置，一定注意
      rules:[
        {
            test:/\.css$/,
            use:[MiniCssExtractPlugin.loader,'css-loader']
        }
      ]
    },
    plugins:[
        new MiniCssExtractPlugin(),
        // HtmlWebpackPlugin生成指定模板的html，这是单页面  也可以配置多页面的
        new HtmlWebpackPlugin({
           template:resolve(__dirname,'../src/client/index.template.html')
        })
    ]
}

// 配置完还要导出，注意一点时和webpack.base.js合并后在导出
module.export=merge(baseConfig,devConfig)

然后去修改package.json文件中的打包的命令：就是修改scripts的配置
  "scripts": {
    // 启动客户端在浏览器中渲染页面的命令
     "client:server":"webpack serve --config ./build/webpack.client.dev.js",
    //  打包客户端文件的命令
     "client:dev":"webpack --config ./build/webpack.client.dev.js",
    //  打包服务端的命令
     "server:dev":"webpack --config ./build/webpack.server.dev.js",
    //  打包命令  包括客户端和服务端
     "dev:build":"pnpm client:dev && pnpm server:dev",
    //  启动服务端服务的命令
     "dev:server":"nodemon ./src/server/app.js"
  },

  接下里是配置路由，版本5与版本6之间是有很大的区别的
  index.jsx配置路由
  import React from 'react'
// Swicth是版本5的API 版本6应该用Routes
import {Route, Switch} from 'react-router-dom'

// 引入组件 
import Home from '../pages/Home/Home'
import About from '../pages/About/About'

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
        component:About
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

客户端的搭建也就是像上面的步骤，基本是可以的了；

接下来是配置服务端的配置，搭建，和上节vue的代码几乎是一样的
server 
   --router
      --index.js  //配置服务端的路由
   --app.js  //启动服务端的服务，使用koa
安装 koa  koa-router koa-static
pnpm add koa @koa/router koa-static 
app.js文件代码：
const Koa=require('koa')
const server=require('koa-static')
const router=require('./router')
const {resolve}=require('path')

const app=new Koa()
// 所以这个地方传入一个参数，app
router(app)
app.use(server(resolve(__dirname,'../../dist')))
app.listen(3000,()=>{
    console.log('server is running http://localhost:3000')
})

router-index.js的代码
// 配置服务端的路由使用 @koa/router
const Router=require('@koa/router')

const {resolve}=require('path')

const router=new Router()

// 导出的是一个函数，并且是传入参数的函数
module.exports=app=>{
    router.get(['/','/about'],async(ctx,next)=>{
        ctx.body="服务端启动成功"
    })
    app.use(router.routes()).use(router.allowedMethods())
}

接下来配置服务端的入口文件，在client 新建服务端的入口文件entry.server.js文件，代码如下：
import React from 'react'
// 需要用到客户端配置的路由内容
import {routes,RouteSwitch} from './router/index'
// 还有就是需要服务端的路由标签，引入
import { StaticRouter as Router } from 'react-router-dom'

// 调用下面这个函数，我们就能拿到组件内容，然后从服务端返回出来
export default (ctx)=>{
    return new Promise((resolve)=>{
        // 这个地方没有resolve出去，所以一直加载
        resolve( <Router location={ctx.req.url}>{RouteSwitch()}</Router>)
    })
}
接下来配置webpack.server.dev.js文件
/**
 * 打包的代码给谁用  服务端  node
 * target:node 
 * commonjs
 * webpack-node-externals
 * css的问题？ null-loader ignore-loader 忽略掉css的依赖处理
 */
const {resolve}=require('path')
const nodeExternals=require('webpack-node-externals')
const { merge } =require('webpack-merge')
const baseConfig=require('./webpack.base')



const serverConfig={
    mode:"development",
    entry:resolve(__dirname,'../src/client/entry.server.jsx'),
    output:{
        filename:'server-bundle.js',
        libraryTarget:'commonjs'
    },
    // 为了忽略诸如path、fs等内置模块。
    target:'node',
    // 以忽略节点\模块文件夹中的所有模块
    externals:nodeExternals(),
    module:{
        rules:[
            {
                test:/\.css$/,
                use:'ignore-loader'
            }
        ]
    }
}

// 将合并的配置导出
module.exports=merge(baseConfig,serverConfig)

然后运行pnpm server:dev命令  打包服务端的打包文件  server.bundle.js  
server-bundle.js打包出来后就可以在服务端使用了
// 配置服务端的路由使用 @koa/router
const Router=require('@koa/router')

const {resolve}=require('path')

const router=new Router()

const serverBundle=require('../../../dist/server-bundle').default;

const {renderToString}=require('react-dom/server')


// 导出的是一个函数，并且是传入参数的函数
module.exports=app=>{
    router.get(['/','/about'],async(ctx,next)=>{
        // 这个地方就是传入上下文，然后返回jsx代码
        const jsx=await serverBundle(ctx)
        // 将我们的jsx渲染为字符串
        const html=await renderToString(jsx)
        // 服务端返回html渲染
        ctx.body=html
    })
    app.use(router.routes()).use(router.allowedMethods())
}

这样配置完了  打包命令 pnpm dev:build   然后启动服务端命令  pnpm dev:server
虽然实现了服务端渲染  但是还有一个问题就是路由切换的时候，还是会请求服务端，没有实现我们的切换的不需要请求服务端，只是在首屏的时候请求服务端
需要本地js接管才可以自由切换，不用请求服务端
我们需要把资源模板放到里面,index.js代码如下  加入template的模板  将资源也带过去渲染
// 配置服务端的路由使用 @koa/router
const Router=require('@koa/router')

const {resolve}=require('path')
const fs=require('fs')
const router=new Router()

const serverBundle=require('../../../dist/server-bundle').default;

const {renderToString}=require('react-dom/server')
// 将要引入的文件单独出去
const fileResolve=file=>resolve(__dirname,file)
const template=fs.readFileSync(fileResolve('../../../dist/index.html'),'utf-8')
// 模板获取到了，然后再处理替代的模板,封装成函数来处理
const handleTemplate=template=>{
    return props=>template.replace('<div id="root"></div>',`<div id="root">${props.html}</div>`)
}

// 导出的是一个函数，并且是传入参数的函数
module.exports=app=>{
    router.get(['/','/about'],async(ctx,next)=>{
        const render=handleTemplate(template)
        // 这个地方就是传入上下文，然后返回jsx代码
        const jsx=await serverBundle(ctx)
        // 将我们的jsx渲染为字符串
        const html=await renderToString(jsx)
        // 服务端返回html渲染
        ctx.body=render({
            html
        })
    })
    app.use(router.routes()).use(router.allowedMethods())
}


接下来是处理请求的处理这个过程
安装  axios  pnpm add axios
我们可以直接在node中起个请求，不用再mock了
 router.get('/api/getUserInfo',ctx=>{
        ctx.body={
            code:0,
            message:'ok',
            data:{
                name:'taotao'
            }
        }
    })
然后再about页面去请求处理,我们请求是放在了about页面，可是有个问题是，首页不会请求这个接口，只有切换路由到about页面
才会请求这个接口
但是，我们想实现首页就在服务端请求返回数据  在路由出进行处理，并且进行数据的预请求
import React from 'react'
// 需要用到客户端配置的路由内容
import {routes,RouteSwitch} from './router/index'
// 还有就是需要服务端的路由标签，引入
import { StaticRouter as Router } from 'react-router-dom'

// 调用下面这个函数，我们就能拿到组件内容，然后从服务端返回出来
export default (ctx)=>{
    return new Promise((resolve)=>{
        // 创建promises数组来保存预请求的
        const promises=[]
        // 在这个地方进行路由的匹配处理以及数据的请求
        routes.forEach((route)=>{
            // 两个判断，一个是路由的匹配，另外一个是预请求的处理
            if(route.path===ctx.request.path && route.loadData){
               promises.push(route.loadData)
            }
        })
        // 然后在这个地方将所有的预请求都发出去,使用Promise.all()方法，返回的是一个数组
        Promise.all(promises).then(data=>{
            // 在下面的数据中是可以获取到的，我们就可以做注水与脱水的过程了
            // 也就是在服务端我们可以拿到这个预请求的东西，但是我们怎么给客户端呢？有什么方法吗？
            // 我们使用redux来处理  vue中我们使用的是vuex来实现的
            console.log('promise的all的请求数据',data[0])
            // promsie.all的请求完后在把数据返回出去
            // 这个地方没有resolve出去，所以一直加载
        resolve( <Router location={ctx.req.url}>{RouteSwitch()}</Router>)
        })
        
    })
}
接下来使用redux来实现服务端预请求拿到数据后，如果给客户端呢？ redux
安装   pnpm add redux react-redux  react-redux是将react与redux关联起来的插件
在client新建store文件夹  下面新建index.jsx文件
在入口文件中，客户端的
import React from 'react'
import App from './App'
import {createRoot} from 'react-dom/client'
const container=document.getElementById('root')
const root=createRoot(container)
<!-- redux的使用 -->
import {Provider} from 'react-redux'
import {createCilentStore} from './store'
<!-- 这个地方一定要注意  createClientStore（）一定要执行下 -->
root.render(<Provider store={createCilentStore()}><App/></Provider>)

实现注水与脱水，就是我们在服务端也能拿到redux  store中的数据来
需要第一步是在
 Promise.all(promises).then((data) => {
      // 在下面的数据中是可以获取到的，我们就可以做注水与脱水的过程了
      // 也就是在服务端我们可以拿到这个预请求的东西，但是我们怎么给客户端呢？有什么方法吗？
      // 我们使用redux来处理  vue中我们使用的是vuex来实现的
      console.log("promise的all的请求数据", data[0]);
      ctx.window= data.length && data[0].data.data    将请求的数据放在上下文的属性上
      // promsie.all的请求完后在把数据返回出去
      // 这个地方没有resolve出去，所以一直加载
      resolve(
        <Provider store={createServerStore()}>
          <Router location={ctx.req.url}>{RouteSwitch()}</Router>
        </Provider>
      );
    });
  });

第二步是将数据放在服务端路由的模板中
// 配置服务端的路由使用 @koa/router
const Router=require('@koa/router')

const {resolve}=require('path')
const fs=require('fs')
const router=new Router()

const serverBundle=require('../../../dist/server-bundle').default;

const {renderToString}=require('react-dom/server')
// 将要引入的文件单独出去
const fileResolve=file=>resolve(__dirname,file)
const template=fs.readFileSync(fileResolve('../../../dist/index.html'),'utf-8')
// 模板获取到了，然后再处理替代的模板,封装成函数来处理
const handleTemplate=template=>{
    return props=>template.replace('<div id="root"></div>',`<div id="root">${props.html}</div>${props.store}`)
}

// 导出的是一个函数，并且是传入参数的函数
module.exports=app=>{
    router.get(['/','/about'],async(ctx,next)=>{
        const render=handleTemplate(template)
        // 这个地方就是传入上下文，然后返回jsx代码
        const jsx=await serverBundle(ctx)
        // 将我们的jsx渲染为字符串
        const html=await renderToString(jsx)
        // 服务端返回html渲染
        const body=render({
            html,
            store:`<script>window.REDUX_STORE=${JSON.stringify(ctx.window)}</script>`
        })
        ctx.body=body
    })
    router.get('/api/getUserInfo',ctx=>{
        ctx.body={
            code:0,
            message:'ok',
            data:{
                name:'taotao'
            }
        }
    })
    app.use(router.routes()).use(router.allowedMethods())
}
第三步是在store中的客户端中加入初始值
// 客户端,后面要加一个初始值来
export function createClientStore(){
    return createStore(reducer,window.REDUX_STORE)
}
