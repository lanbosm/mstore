// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {
      browsers: ['iOS 7', 'Android >= 4.3' ,'QQAndroid 5'],
    },
    "postcss-pxtorem-plus":{
      rootValue: 40,
      unitPrecision: 6,
      propList: ['*','!font-size','!font*','!border*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
    "cssnano": {
      preset: "advanced",
      autoprefixer: false,
    }


  }
}