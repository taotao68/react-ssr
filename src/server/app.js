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

