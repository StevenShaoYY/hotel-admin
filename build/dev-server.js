require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var bodyParser = require('body-parser');
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
//接口定义
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
var appData = require('../data.json');
var apiRoutes = express.Router();
var login = appData.login;
apiRoutes.post('/admin/login', function (req, res) {
  //console.log(req.headers['x-token'])
  if(req.body.username === '123456@qq.com' && req.body.password === '111111'){
    res.json({
      code: 1,
      token: '12345',
      message: '',
      result: {}
    });
  } else {
    res.json({
      code: 0,
      message: '账号密码错误！'
    });
  }

});

apiRoutes.get('/user/info', function (req, res) {
  if(req.query.token === '12345'){
    res.json({
      code: 1,
      result: {
        role:['a'],
        name: 'sjy',
        avatar: 'default'
      }
    });
  } else {
    res.json({
      code: 14,
      result: {

      }
    });
  }
});

apiRoutes.post('/admin/logout', function (req, res) {

    res.json({
      code: 1,
      message: '登出成功！'
    });
});

apiRoutes.get('/statistics', function (req, res) {
  res.json({
    code: 1,
    message: '',
    token: '',
    result: {
      boxCount : 20,
      userCount : 30,
      hotelCount : 40,
      roomCount : 50,
      todayCheckin : 2332130,
      todayVistors : 21231230
    }
  });
});

apiRoutes.get('/hotels', function (req, res) {
  var obj = {
    hotelCode: '123123123',
    hotelName: '如家',
    hotelAddress: '阿萨黑色短裤',
    hotelManager: '邵俊彦',
    contactNumber: '15757115734',
    totalRooom : '213',
    totalBed : '213',
    belongArea : '213',
    createPerson: '213',
    createTime: '213',
    modifyPerson : '213',
    modifyTime: '213',
  };
  var arr = []
  for(var i =0;i<15;i++){
    arr.push(obj);
  }
  res.json({
    code: 1,
    message: '',
    token: '',
    result:{
      totalPage: 10,
      totalCount: 100,
      currentPage: 1,
      pageSize: 15,
      content: arr
    }
  });
});

apiRoutes.get('/hotels/:hotelCode', function (req, res) {
  var obj = {
    hotelCode: '123123123',
    hotelName: '如家22',
    hotelAddress: '阿萨黑色短裤',
    hotelManager: '邵俊彦',
    contactNumber: '15757115734',
    totalRooom : '213',
    totalBed : '213',
    belongArea : '213',
    createPerson: '213',
    createTime: '213',
    modifyPerson : '213',
    modifyTime: '213',
  };
  res.json({
    code: 1,
    message: '',
    token: '',
    result: obj
  });
});

apiRoutes.get('/hotels/:hotelCode/users', function (req, res) {
  var obj = {
    id: '111',
    userName: 'shaojunyan',
    name: '邵俊彦',
    certificateNumber :'330102199309111813',
    phoneNumber: '15757115734',
    type : 1,
    hotelCode: '121312312',
    hotelName: 'rujia',
    createTime: '2016-01-05 21:19:11'
  };
  var arr = []
  for(var i =0;i<10;i++){
    arr.push(obj);
  }
  res.json({
    code: 1,
    message: '',
    token: '',
    result:{
      totalPage: 10,
      totalCount: 100,
      currentPage: 1,
      pageSize: 15,
      content: arr
    }
  });
});

apiRoutes.patch('/users/:id/reset', function (req, res) {
  console.log(1111);
  res.json({
    code: 1,
    message: '',
    token: '',
    result:{}
  });
});

apiRoutes.get('/hotels/:hotelCode/rooms', function (req, res) {
  var obj = {
    id :1,
    roomNumber : '201',
    floor : '1',
    phoneNumber : '888888888',
    bedCount : '2',
    hotelCode : '12312312312'
  };
  var arr = []
  for(var i =0;i<10;i++){
    arr.push(obj);
  }
  res.json({
    code: 1,
    message: '',
    token: '',
    result:{
      totalPage: 10,
      totalCount: 100,
      currentPage: 1,
      pageSize: 15,
      content: arr
    }
  });
});
app.use('/ops', apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
