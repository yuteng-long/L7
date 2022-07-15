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
    // clean: true,
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