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
// apiRoutes.post('/admin/login', function (req, res) {
//   //console.log(req.headers['x-token'])
//   var obj = {
//     id: 123,
//     username: 'shaojunyan',
//     name: '邵俊彦',
//     roles: [1, 2],
//     modules: ['a', 'b', 'c', 'd'],
//     status: 1,
//     remark: 'asdada',
//     modifyPerson: 'shao俊彦',
//     updateTime: '2017-01-02 12：21：21'
//   };
//   if (req.body.username === '123456@qq.com' && req.body.password === '111111'){
//     res.json({
//       code: '1',
//       token: '12345',
//       message: '',
//       result: obj
//     });
//   } else {
//     res.json({
//       code: 0,
//       message: '账号密码错误！'
//     });
//   }
//
// });

// apiRoutes.get('/user/info', function (req, res) {
//   if(req.query.token === '12345'){
//     res.json({
//       code: '1',
//       result: {
//         role:['a'],
//         name: 'sjy',
//         avatar: 'default'
//       }
//     });
//   } else {
//     res.json({
//       code: '14',
//       result: {
//
//       }
//     });
//   }
// });

// apiRoutes.get('/admin/logout', function (req, res) {
//
//     res.json({
//       code: '1',
//       message: '登出成功！'
//     });
// });

// apiRoutes.get('/statistics', function (req, res) {
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result: {
//       boxCount : 20,
//       userCount : 30,
//       hotelCount : 40,
//       roomCount : 50,
//       todayCheckin : 2332130,
//       todayVisitors : 21231230
//     }
//   });
// });

// apiRoutes.get('/hotels', function (req, res) {
//   var obj = {
//     hotelCode: '123123123',
//     hotelName: '如家',
//     hotelAddress: '阿萨黑色短裤',
//     hotelManager: '邵俊彦',
//     contactNumber: '15757115734',
//     totalRooom : '213',
//     totalBed : '213',
//     belongArea : '213',
//     createPerson: '213',
//     createTime: '213',
//     modifyPerson : '213',
//     modifyTime: '213',
//   };
//   var arr = []
//   for(var i =0;i<15;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });

// apiRoutes.get('/hotels/:hotelCode', function (req, res) {
//   var obj = {
//     hotelCode: '123123123',
//     hotelName: '如家22',
//     hotelAddress: '阿萨黑色短裤',
//     hotelManager: '邵俊彦',
//     contactNumber: '15757115734',
//     totalRooom : '213',
//     totalBed : '213',
//     belongArea : '213',
//     createPerson: '213',
//     createTime: '213',
//     modifyPerson : '213',
//     modifyTime: '213',
//   };
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result: obj
//   });
// });
//
// apiRoutes.get('/hotels/:hotelCode/users', function (req, res) {
//   var obj = {
//     id: '111',
//     userName: 'shaojunyan',
//     name: '邵俊彦',
//     certificateNumber :'330102199309111813',
//     phoneNumber: '15757115734',
//     type : 1,
//     hotelCode: '121312312',
//     hotelName: 'rujia',
//     createTime: '2016-01-05 21:19:11'
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });
//
// apiRoutes.patch('/users/:id/reset', function (req, res) {
//   console.log(1111);
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{}
//   });
// });
//
// apiRoutes.get('/hotels/:hotelCode/rooms', function (req, res) {
//   var obj = {
//     id :1,
//     roomNumber : '201',
//     floor : '1',
//     phoneNumber : '888888888',
//     bedCount : '2',
//     hotelCode : '12312312312'
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });
//
// apiRoutes.get('/hotels/:hotelCode/devices', function (req, res) {
//   var obj = {
//     id : '1111',
//     boxName : '登记盒子',
//     romVersion : '3.3.33',
//     clientVersion : '3.3.33',
//     serialNumber : 'AL-B20-12345678',
//     hotelCode : '324324',
//     hotelName : '如家',
//     hotelAddress : '奥术大师大所大所大',
//     hotelManager : '阿萨德',
//     contactNumber : '80890898',
//     boxStatus : 2,
//     anlvAppVersion : '3333.33',
//     mdmVersion : '3.3.33',
//     romVersion : '3.3.33',
//     mcuVersion : '3.3.33',
//     ip : '10.22.12.133',
//     mac : '94-65-FF-2A-3C-FF',
//     usb1 : 'USB Composite Device',
//     usb2 : 'USB Composite Device',
//     usb3 : 'USB Composite Device',
//     usb4 : 'USB Composite Device',
//     usb5 : 'USB Composite Device',
//     usb6 : 'USB Composite Device',
//     insideStorageUsed : '24',
//     insideStorageUnused : '24',
//     externalStorageUsed : '1000',
//     externalStorageUnused : '1000',
//     samCode : 'USB Composite Device',
//     registrationTIme : '2017-05-01 12:12:21',
//     startTime : '2017-05-01 12:12:21',
//     reportTime : '2017-05-01 12:12:21'
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });
//
// apiRoutes.get('/devices/:id', function (req, res) {
//   var obj = {
//     id : '1111',
//     boxName : '登记盒子',
//     romVersion : '3.3.33',
//     clientVersion : '3.3.33',
//     serialNumber : 'AL-B20-12345678',
//     hotelCode : '324324',
//     hotelName : '如家',
//     hotelAddress : '奥术大师大所大所大',
//     hotelManager : '阿萨德',
//     contactNumber : '80890898',
//     boxStatus : 2,
//     anlvAppVersion : '3333.33',
//     mdmVersion : '3.3.33',
//     romVersion : '3.3.33',
//     mcuVersion : '3.3.33',
//     ip : '10.22.12.133',
//     mac : '94-65-FF-2A-3C-FF',
//     usb1 : 'USB Composite Device',
//     usb2 : 'USB Composite Device',
//     usb3 : 'USB Composite Device',
//     usb4 : 'USB Composite Device',
//     usb5 : 'USB Composite Device',
//     usb6 : 'USB Composite Device',
//     insideStorageUsed : '24',
//     insideStorageUnused : '24',
//     externalStorageUsed : '1000',
//     externalStorageUnused : '1000',
//     samCode : 'USB Composite Device',
//     registrationTIme : '2017-05-01 12:12:21',
//     startTime : '2017-05-01 12:12:21',
//     reportTime : '2017-05-01 12:12:21'
//   };
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:obj
//   });
// });
//
// apiRoutes.patch('/devices/:id/restart', function (req, res) {
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{}
//   });
// });
// apiRoutes.patch('/devices/:id/unbind', function (req, res) {
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{}
//   });
// });
// apiRoutes.patch('/devices/:id/cancel', function (req, res) {
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{}
//   });
// });
// apiRoutes.delete('/devices/:id', function (req, res) {
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{}
//   });
// });
// apiRoutes.get('/devices/:id/log/catch', function (req, res) {
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{}
//   });
// });
//
// apiRoutes.get('/devices', function (req, res) {
//   var obj = {
//     id : '1111',
//     boxName : '登记盒子',
//     romVersion : '3.3.33',
//     clientVersion : '3.3.33',
//     serialNumber : 'AL-B20-12345678',
//     hotelCode : '324324',
//     hotelName : '如家',
//     hotelAddress : '奥术大师大所大所大',
//     hotelManager : '阿萨德',
//     contactNumber : '80890898',
//     boxStatus : 2,
//     anlvAppVersion : '3333.33',
//     mdmVersion : '3.3.33',
//     romVersion : '3.3.33',
//     mcuVersion : '3.3.33',
//     ip : '10.22.12.133',
//     mac : '94-65-FF-2A-3C-FF',
//     usb1 : 'USB Composite Device',
//     usb2 : 'USB Composite Device',
//     usb3 : 'USB Composite Device',
//     usb4 : 'USB Composite Device',
//     usb5 : 'USB Composite Device',
//     usb6 : 'USB Composite Device',
//     insideStorageUsed : '24',
//     insideStorageUnused : '24',
//     externalStorageUsed : '1000',
//     externalStorageUnused : '1000',
//     samCode : 'USB Composite Device',
//     registrationTIme : '2017-05-01 12:12:21',
//     startTime : '2017-05-01 12:12:21',
//     reportTime : '2017-05-01 12:12:21'
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });
//get apps
// apiRoutes.get('/admin/apps', function (req, res) {
//   var arr = []
//   for(var i =0;i<10;i++){
//     var obj = {
//       id: '',
//       appName:'adjiads-1122' ,
//       appType: 2,
//       versionName: '3213.3123',
//       updateTips: 'asdjsajd',
//       updateTime:'2017-02-01'
//     };
//     obj.id = i+1
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });

// apiRoutes.post('/devices/application', function (req, res) {
//     res.json({
//       code: '1',
//       token: '12345',
//       message: '',
//       result: {}
//     });
// });
//get firmwares
// apiRoutes.get('/admin/firmwares', function (req, res) {
//   var obj = {
//     id: '',
//     name:'adjiads-1122' ,
//     type: 1,
//     oldVersion: '3213.3123',
//     newVersion: '3213.4444',
//     updateTips: 'asdjsajd',
//     updateTime:'asdasdsa'
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     obj.id = i+1
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });

// apiRoutes.post('/devices/firmware', function (req, res) {
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: {}
//   });
// });
//
// apiRoutes.get('/devices/:id/log', function (req, res) {
//   var obj = {
//     id :'1243',
//     fileName :'log12123-1232131',
//     filePath :'/sda/sadasd',
//     updateTime : '2017-09-11'
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });
//
// apiRoutes.post('/devices/:id/log/catch', function (req, res) {
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: {}
//   });
// });

// apiRoutes.post('/devices', function (req, res) {
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: {}
//   });
// });

// apiRoutes.get('/users/', function (req, res) {
//   var obj = {
//     id: '111',
//     userName: 'shaojunyan',
//     name: '邵俊彦',
//     certificateNumber :'330102199309111813',
//     phoneNumber: '15757115734',
//     type : 1,
//     hotelCode: '121312312',
//     hotelName: 'rujia',
//     createTime: '2016-01-05 21:19:11'
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });
//
// apiRoutes.get('/messages', function (req, res) {
//   var obj = {
//     id: '1111',
//     userRange: 'asdadaad',
//     type: 1,
//     important: 1,
//     title: '应用升级通知',
//     content: '应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知',
//     img: '/asdasd',
//     publisher: 'joijij',
//     publishTime: '2017-04-06 11:41:05',
//     effectiveTime: '2017-04-06',
//     transmitState: 1,
//     sendUser: '12',
//     receiveUser: '22',
//     viewUser: '32',
//     readState: 1
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });
//
// apiRoutes.get('/messages/:id', function (req, res) {
//   var obj = {
//     id: '1111',
//     userRange: 'asdadaad',
//     type: 1,
//     important: 1,
//     title: '应用升级通知',
//     content: '应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知应用升级通知',
//     img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505041265006&di=f096e24d88ecbb2d040ba754ac18a8d8&imgtype=0&src=http%3A%2F%2Fimg.qy6.com%2Fbus%2F2009%2F1225%2F1656352.jpg',
//     publisher: 'joijij',
//     publishTime: '2017-04-06 11:41:05',
//     effectiveTime: '2017-04-06',
//     transmitState: 1,
//     sendUser: '12',
//     receiveUser: '22',
//     viewUser: '32',
//     readState: 1
//   };
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:obj
//   });
// });
//
// apiRoutes.get('/admin', function (req, res) {
//   var obj = {
//     id: 123,
//     username: 'shaojunyan',
//     name: '邵俊彦',
//     roles: [1, 2],
//     modules: [1, 2, 3],
//     status: 1,
//     remark: 'asdada',
//     modifyPerson: 'shao俊彦',
//     updateTime: '2017-01-02 12：21：21'
//   };
//   var arr = []
//   for(var i =0;i<10;i++){
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });
//
// apiRoutes.put('/admin', function (req, res) {
//   var obj = {
//     id: 123,
//     username: 'shaojunyan',
//     name: '邵俊彦',
//     roles: [1, 2],
//     modules: [1, 2, 3],
//     status: 1,
//     remark: 'asdada',
//     modifyPerson: 'shao俊彦',
//     updateTime: '2017-01-02 12：21：21'
//   };
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: obj
//   });
// });
//
// apiRoutes.patch('/admin/:id', function (req, res) {
//   var obj = {
//     id: 123,
//     username: 'shaojunyan',
//     name: '邵俊彦',
//     roles: [1, 2],
//     modules: [1, 2, 3],
//     status: 1,
//     remark: 'asdada',
//     modifyPerson: 'shao俊彦',
//     updateTime: '2017-01-02 12：21：21'
//   };
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: obj
//   });
// });
//
// apiRoutes.patch('/admin/modifyPassword', function (req, res) {
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: {}
//   });
// });
//
// apiRoutes.patch('/admin/:id/resetPassword', function (req, res) {
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: {}
//   });
// });
//
// apiRoutes.delete('/admin/:id', function (req, res) {
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: {}
//   });
// });
//
// apiRoutes.patch('/admin/:id/enable', function (req, res) {
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: {}
//   });
// });
//
// apiRoutes.patch('/admin/:id/disable', function (req, res) {
//   res.json({
//     code: '1',
//     token: '12345',
//     message: '',
//     result: {}
//   });
// });
//
// apiRoutes.get('/admin/roles', function (req, res) {
//
//   var arr = []
//   for(var i = 0; i<10; i++){
//     var obj = {
//       id: 1,
//       name: '管理员',
//       modules: '[{"id":"1","name":"DEVICE:QUERY","pid":"123"},{"id":"2","name":"DEVICE:IMPORT","pid":"123"},{"id":"3","name":"DEVICE:CANCEL","pid":"123"},{"id":"4","name":"MESSAGE:QUERY","pid":"123"},{"id":"5","name":"MESSAGE:DETAIL","pid":"123"}]',
//       remark: '所有权限',
//       modifyPerson: '管理员1',
//       updateTime: '2017-04-06 11:41:05'
//     };
//     obj.id = i+1
//     obj.name = obj.name+i+1
//     arr.push(obj);
//   }
//   res.json({
//     code: '1',
//     message: '',
//     token: '',
//     result:{
//       totalPage: 10,
//       totalCount: 100,
//       currentPage: 1,
//       pageSize: 15,
//       content: arr
//     }
//   });
// });

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
