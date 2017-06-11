// require('./dbapi')前，先在项目目录下执行 npm install rethinkdb , 安装rethnkdb的nodejs driver.
// dbapi/config/index.js文件中指定rethinkdb的地址和端口.

var db = require('./dbapi'); // 后台数据库相关api
// var app = require('express')();
// var http = require('http').Server(app);

// 要启用socket.io，后端按照A1，A2，A3三个步骤。前端按index.html文件的script实现。

// A1. 添加引用
// var sio = require('./sio');

// app.get('/', (req, res)=>{
//   res.sendFile(__dirname + '/index.html');
// });

// http.listen(3000, ()=>{
//   console.log('listening on *:3000');
// });

db.useRethinkDb(); // 默认内存数据库，使用这个切换成实际部署数据库。

setTimeout(()=> {

  // A2. 将socket.io绑定到http上。
  //sio.configSio(http);
  // A3. 开始监听消息，目前只示范实现了一个游戏添加的消息。前端代码具体参考index.html中的script。
  //sio.watch();

  // 添加管理员
  // 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
  // db.users.addAdmin('admin2', '昵称2', 'e10adc3949ba59abbe56e057f20f883e', (err, user)=> {
  //   if (err) { console.log(err); return; };
  //   console.log(`======= add Admin success. user = `, user);
  // });

  // 添加团长
  // 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
  // db.users.addTZ('tz2', '团长2', 'e10adc3949ba59abbe56e057f20f883e', (err, user)=> {
  //   if (err) { console.log(err); return; };
  //   console.log(`======= add 团长 success. user = `, user);
  // });

  // 添加团员
  // 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
  // db.users.addTY('ty2', '团员3', 'e10adc3949ba59abbe56e057f20f883e', (err, user)=> {
  //   if (err) { console.log(err); return; };
  //   console.log(`======= add 团员 success. user = `, user);
  // });

  // 登录时检查是否可以登录
  // 1：usname, 2：密码（前端输入的密码加密后的md5串，小写
  // 3：回调 ，err不空时表示错误，空时user为相应的用户信息
  // db.users.checkUserPwd('admin2', 'e10adc3949ba59abbe56e057f20f883e', (err, user) => {
  //   if (err) { console.log(err); return; }
  //   console.log(`admin valid!user:`, user);
  // });

  // 返回单个用户信息
  // 1. id: uuid
  // 2. 回调，err: 不为空时表示有错误。为空user则为查找到的用户信息
  // db.users.single_user('756f0c1d-769e-4b51-849f-b0a1e80e4bfe', (err, user) => {
  //   if (err) { console.log("single_user: " + err); return; };
  //   console.log(user);
  // });

  // 查询所有用户
  // 1：页号，从1开始，2：每页记录条数，3：role，0所有，1管理员，2团长，3团员
  // 4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。users对应的用户信息
  // db.users.all_users(1, 2, 2, (err, users) => {
  //   if (err) { console.log(err); return; };
  //   console.log(users);
  // });

  // 添加日志
  // 1. type
  // 2. doer
  // 3. 内容
  // 4. ip?
  // db.logs.addlog(1, 1, "log 1", "122.21.23.11", (err) => {
  //   if (err) { console.log(err); return; };
  //
  //   console.log("========= log added");
  // });
  //
  // db.logs.addlog(2, 'd2007270-30e7-4471-af99-a910303f9047', "log 2", "122.21.23.11", (err) => {
  //   if (err) { console.log(err); return; };
  //
  //   console.log("========= log added");
  // });

  // 获取日志
  // 1. 页号
  // 2. 每页数量
  // 3. 哪个用户的日志，null或者''表示所有，其它表示按用户id过滤
  // db.logs.getlogs(1, 10, '', (err, logs) => {
  //  if (err) { console.log(err); return; };
  //
  //   console.log(logs);
  //   console.log(logs.logs[0].addtime.toLocaleString());
  // });

  // 修改用户
  // 1：用户id，2：昵称，3：密码（为null不修改），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
  // db.users.updateUser('6e681a22-b137-4afd-85b8-edadfe06a06f', '团员团员', 'e10adc3949ba59abbe56e057f20f883e', (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log('======= edit success');
  // });

  // 删除用户
  // 1：用户id，2：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
  // db.users.delUser('3460caad-3560-4ed8-903d-a61e62f530bc', (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log('======= del success');
  // });

  // 更新用户状态
  // 1：用户id，2：status值，3：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
  // db.users.changeUserStatus('6e681a22-b137-4afd-85b8-edadfe06a06f', 2, (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log(`======= changed`);
  // });

  // 更新用户上次登录IP
  // 1. userid
  // 2. 新的IP
  // 3. 回调，err如果成功为null，否则表示失败。属性error表示错误描述。
  // db.users.updateUserLastIp('6e681a22-b137-4afd-85b8-edadfe06a06f', "1.1.1.3", (err) => {
  //   if (err) { console.log(err); return; }
  //   console.log("update last ip success!");
  // });

  // 更新用户上次登录时间
  // 1. userid
  // 2. 回调，err如果成功为null，否则表示失败。属性error表示错误描述。
  // db.users.updateUserLastTime('6e681a22-b137-4afd-85b8-edadfe06a06f', (err) => {
  //   if (err) { console.log(err); return; }
  //   console.log("update last time success!");
  // });

  // 添加一个游戏
  // 1. userid
  // 2. gnickname
  // 3. content
  // 4. 淘宝订单号
  // 5. 分配者用户id
  // db.games.addGame('1732152d-a7f7-43cd-9ee0-83e9105cb44d', "游戏昵称6", "游戏信息6", "tbdd6", '1732152d-a7f7-43cd-9ee0-83e9105cb44d', (err, game) => {
  //   if (err) { console.log(err); return; }
  //   console.log('======== added game.', game);
  // });

  // 查询所有游戏
  // 1.pageIndex
  // 2.pageCount
  // 3.userid, 为''或null时不限制用户，返回所有，否则返回已经被分配到用户的游戏列表。
  // 4.status, 将status加进查询条件，为null时不使用此条件。
  // 5.assignerid, 将 assignerid加进查询条件，为null不使用此条件。
  // db.games.all_games(1, 20, '1732152d-a7f7-43cd-9ee0-83e9105cb44d', 1, null, (err, games) => {
  //   if (err) { console.log(err); return; };
  //   console.log(games);
  // });

  // 查询是谁分配的所有游戏
  // 1.pageIndex
  // 2.pageCount
  // 3.agsignerid
  // db.games.all_games_with_assigner(1, 20, 'cb5c2c5c-2669-4a36-b8be-fe25ba59b859', (err, games) => {
  //   if (err) { console.log(err); return; };
  //   console.log(games);
  // });

  // 按任务状态来查询游戏
  // 1.pageIndex
  // 2.pageCount
  // 3.status 按任务来查询游戏
  // db.games.all_games_with_status(1, 20, 0, (err, games) => {
  //   if (err) { console.log(err); return; };
  //   console.log(games);
  // });


  // 修改游戏
  // 1. id
  // 2. userid,为null或者''时，表示不更改分配的用户。否则将更改分配到的用户。
  // 3. gnickname
  // 4. content
  // 5. 淘宝订单号
  // 6. 分配者用户id，为null或者''时，表示不更改，否则将更改为新指定的分配者。
  // db.games.updateGame('481cc2f6-37d0-44bc-94ef-76786b040f13', '70c46afc-88de-40de-b11c-f87bd72398e9', "gnickname76786b040f13", "content76786b040f13", "tbdd76786b040f13", 'd2007270-30e7-4471-af99-a910303f9047', (err) => {
  //   if (err) { console.log(err); return; }
  //   console.log('======== updated game.');
  // });

  // 删除游戏
  // 1. id
  // db.games.delGame('dc5e9213-08b6-4841-a4b7-d8b4de0a1b84', (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log("======== deleted game.");
  // });

  // 更新游戏状态
  // 1. id
  // 2. status, 见需求文档
  // db.games.updateGameStatus('14933ec2-4e5d-43a7-b253-ea71bae4fb1f', 2, (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log("======== updated game status.");
  // });

  // 添加游戏任务
  // 1. gameid
  // 2. 任务标题
  // 3. 任务内容
  db.games.addtask('b3d09403-77f5-4ae1-b4e3-b52472b6f540', "task2", "task2", (err, task) => {
    if (err) { console.log(err); return; };
    console.log("======= task added", task);
  });

  // 获取任务
  // 1. gameid
  // 由于任务数记录条数不会很多，基本不用分页
  // db.games.gettasks('499bcb63-d54a-4e25-bb47-2708b94ea7ef', (err, tasks) => {
  //   if (err) { console.log(err); return; };
  //   console.log(tasks);
  // });

  // 更新任务
  // 1. 任务id
  // 2. 任务标题
  // 3. 任务内容
  // db.games.updatetask('c00adefe-249f-422f-a6c4-95a644985560', "title", "content", (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log('========= updated task');
  // });

  // 更新任务状态
  // 1. 任务id
  // 2. 新状态，见需求文档
  // db.games.changeTaskStatus('c00adefe-249f-422f-a6c4-95a644985560', 2, (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log('========= changeTaskStatus ok');
  // });

  // 删除任务
  // 1.任务id
  // db.games.deltask('c368e478-023f-4ac3-95b1-0682b0f7c5e5', (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log('==== deleted task');
  // });

  // 添加进度
  // 1. taskid
  // 2. content
  db.games.addprogress('c36f1e36-75ed-4940-bbf9-1c3adf0dd441', "progress content 1", (err, progress) => {
    if (err) { console.log(err); return; };
    console.log("======= progress added", progress);
  });

  // 获取进度
  // 1. 任务id
  // db.games.getprogresss('14933ec2-4e5d-43a7-b253-ea71bae4fb1f', (err, progresses) => {
  //   if (err) { console.log(err); return; };
  //   console.log(progresses);
  // });

  // 更新进度
  // 1. 进度id
  // 2. 进度内容
  // db.games.updateprogresss('135bb902-5e33-44fd-88af-50d0fc7c78d7', "content 33333333", (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log('========= updated progress');
  // });

  // 删除进度
  // 1. 进度id
  // db.games.delprogress('135bb902-5e33-44fd-88af-50d0fc7c78d7', (err) => {
  //   if (err) { console.log(err); return; };
  //   console.log('==== deleted progress');
  // });

}, 1000);
