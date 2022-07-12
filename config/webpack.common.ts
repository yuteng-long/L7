import webpack from 'webpack'
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
