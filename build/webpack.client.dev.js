const {resolve} =require('path')
const {merge}=require('webpack-merge')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')

const baseConfig=require('./webpack.base')
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
    module:{
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
module.exports=merge(baseConfig,devConfig)