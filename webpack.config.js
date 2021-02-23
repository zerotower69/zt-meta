//引入一个包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

//webpack 所有的配置信息都在module.exports中

module.exports = {
    devServer:{
        //解决   Invalid Host/Origin header
        disableHostCheck:true
    },

    //解决控制台的报错
    devtool:'source-map',
    //指定入口文件
    entry: './lib/index.js',

    //指定打包文件的目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        //打包后的文件
        filename: "bundle.js",
        //告诉webpack不适用箭头函数以兼容ie
        environment:{
            arrowFunction:false,
            const:false
        }
    },
    mode: 'development', // 设置mode
    //指定webpack打包使用的模块
    module: {
        //指定加载的规则
        rules: [
            {
            //test指定的是规则生效的文件
            test: /\.ts$/, //指定是ts后缀的文件
            // use:'ts-loader',  //指定使用的模块
            use: [
                //后面的先执行
                {
                    //指定加载器
                    loader: 'babel-loader',
                    //设置 babel
                    options: {
                        //设置预定义的环境
                        presets: [
                            ["@babel/preset-env", {
                            "targets": {
                              "chrome": "88",
                              "ie":"7"
                            },
                            "modules":"commonjs",  //没有这里就会 exports not defined
                            "corejs": "3.9.0",
                            "useBuiltIns": "usage"
                          }]
                          ]
                    }
                },
                "ts-loader"
            ],
            //要排除的文件
            exclude: '/node_modules/'
        },
        //设置less文件的处理
        {
            test:/\.less$/,
            //less-laoder  --->  css-loader ---> style-loader
            use:[
                'style-loader',
                'css-loader',
                //引入postcss
                {
                    loader:'postcss-loader',
                    options:{
                        postcssOptions:{
                            plugins:[
                                [
                                    "postcss-preset-env",
                                    {
                                        browsers:'last 2 versions'
                                    }
                                ]
                            ]
                        }
                    }
                },
                'less-loader'
            ]
        }
    ]
    },

    //配置webpack插件
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "这是一个自定义的title",
            template: './src/index.html'
        })
    ],

    //用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}