import { merge } from 'webpack-merge'
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
