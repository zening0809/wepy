const path = require('path');
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
        '@': path.join(__dirname, 'src'),
        'components': path.join(__dirname, 'src/components'),
        'asserts': path.join(__dirname, 'src/asserts'),
        'config': path.join(__dirname, 'src/config'),
        'mixins': path.join(__dirname, 'src/mixins'),
        'pages': path.join(__dirname, 'src/pages'),
        'service': path.join(__dirname, 'src/service'),
        'utils': path.join(__dirname, 'src/utils')
      },
      modules: ['node_modules']
  },
  eslint: true,
  compilers: {
    less: {
      compress: true
    },
    sass: {
        outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  // 复制生产环境配置文件
  shell.cp('-R', './config/prod.env.js', './config/env.js')

  delete module.exports.compilers.babel.sourcesMap
  // 压缩sass
  module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
      
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
