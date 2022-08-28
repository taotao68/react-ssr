const {resolve}=require('path')
module.exports={
    // 配置打包输出的文件所在的位置
    output:{
      path:resolve(__dirname,'../dist')
    },
    module:{
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