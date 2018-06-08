const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    aliases:{
      '@src': path.resolve('src'),
      '@lib': path.resolve('lib'),
      '@es': path.resolve('es'),
      '@media': path.resolve('src/media'),
    },
    rules: {
      'sass-css': {
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      },
      svg: {
        use: ['svgr/webpack', 'url-loader']
      }
    }
  }
}
