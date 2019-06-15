const path = require('path')

// 导入在内存中生成html页面的插件
const htmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 这个配置文件，其实就是一个js文件，通过Node中的模块操作，向外暴露了一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口，表示要使用webpack打包哪个文件
    output: {
        path: path.join(__dirname, './dist/'), //制定打包好的文件，输出到哪个目录中去
        filename: "main.js" //制定输出的文件的名称
    },
    mode: 'development',
    plugins: [ //配置插件的节点
        new htmlWebpackPlugin({ //创建一个在内存中生成html页面的插件
            template: path.join(__dirname, './src/index.html'), //指定模板页面，将会根据指定的页面路径去生成内存中的页面
            filename: 'index.html' //制定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { //这个节点用于配置所有第三方模块的加载器
        rules: [ //所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //配置处理.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //这是处理.less文件的第三方loader规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, //这是处理.scss文件的第三方规则
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=5647&name=[hash:8]-[name].[ext]' }, //处理图片路径的loader
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, //处理字体文件的loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //配置babel来转化高级语法
            { test: /\.vue$/, use: 'vue-loader' } //处理.vue文件的loader
        ]
    },
    resolve: {
        alias: {
            //"vue$": 'vue/dist/vue.js' //修改vue被导入时候的包的路径
        }
    }
}


// 使用webpack-dev-server来实现自动打包编译功能