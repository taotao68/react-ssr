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