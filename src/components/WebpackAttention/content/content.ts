export const common = `import webpack from 'webpack'
import path from 'path'
import MiniCssExtract from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MonacoEditor from 'monaco-editor-webpack-plugin'

const moduleConfig = {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'esbuild-loader',
      exclude: '/node_modules/',
      options: {
       loader: 'tsx',  
       target: 'es2015'
      }
    },
    {
      test: /\.css$/i,
      // 采用css modules的解析方式时，排除对node_modules文件处理
      exclude: [/node_modules/],
      use: [
        {
          loader: MiniCssExtract.loader,
          options: {
            esModule: true,
          },
        },
        {
          loader: "css-loader",
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        },
        'postcss-loader'
      ]
    },
    // 解决使用css modules时antd样式不生效
    {
      test: /\.css$/,
      exclude: [/src/],
      use: [
        'style-loader', 
        'css-loader'
      ]
    },
    // 图扑图片资源
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/image',
    },
  ]
}

const pluginsConfig = [
  new HtmlWebpackPlugin({
    title: 'L7',
    template: path.resolve(__dirname, '../index.html'),
  }),
  new MiniCssExtract({
    runtime: false,
    filename: "css/l7_[contenthash:6].css",
  }),
  new MonacoEditor({
    languages:['typescript', 'javascript']
  }),
  // 打包体积分析
  // new BundleAnalyzerPlugin()
]

const common: 
webpack.Configuration | 
webpack.WebpackOptionsNormalized = {
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },
  module:moduleConfig,
  plugins: pluginsConfig,
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    modules: [
      'node_modules',
       './src',
    ],
    symlinks: false // 不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false，减少解析工作量。
  },
}

export default common
`

export const dev = `import { merge } from 'webpack-merge'
import path from 'path'
import common from './webpack.common'

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 为加快生产环境打包速度，不为生产环境配置 devtool。
  output: {
    filename: 'js/l7_[name]_bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  devServer: {
    compress: true,
    port: 9000
  },
  cache: { // 大幅提升二次构建速度、打包速度，当构建突然中断，二次进行构建时，可以直接从缓存中拉取，可提速 90% 左右。
    type: 'filesystem' // 使用文件缓存
  },
  // watch: true //监听更新
})

export default devConfig

`

export const prod = `
import { merge } from 'webpack-merge'
import common from './webpack.common'
import path from 'path'
import TerserPlugin  from 'terser-webpack-plugin'

const prodConfig = merge(common, {
  mode: 'production',
  output: {
    // bundle 文件名称 【只有这里和开发环境不一样】
    filename: 'js/l7_[name]_[contenthash:6]_bundle.js',
    
    // bundle 文件路径
    path: path.resolve(__dirname, '../dist'),
    
    // 编译前清除目录
    clean: true,
  },
  optimization: {
    runtimeChunk: true,
    minimizer: [
        new TerserPlugin({
          parallel: 4,
          terserOptions: {
            parse: {
              ecma: 5,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups:{
        vendors:{ // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true 
        }
      }
    }
  },
  
})

export default prodConfig
`