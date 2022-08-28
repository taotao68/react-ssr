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