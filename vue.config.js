const webpack = require('webpack');
const path = require('path');
const appData = require('./public/mock/data.json');
const home = appData.home;
const publicPath = process.env.NODE_ENV === "production" ? "/" : "./";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: publicPath,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '中丹',
      chunks: ['chunk-vendors', 'index'],
      favicon: 'public/favicon.ico'
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('js', resolve('src/common/js'));
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  },
  devServer: {
    proxy: {
      '/data': {
        target: 'http://localhost:8080/api/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/data': '/data'
        }
      },
      '/img': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/img': '/imgs'
        }
      },
    },
    before(app) {
      app.get('/api/data', function (req, res) {
        res.json({
          errno: 0,
          data: home
        });
      });
    }
  }
}
