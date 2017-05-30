var db = require('./dbapi'); // 后台数据库相关api

// 添加管理员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.addAdmin('admin2', '昵称2', 'e10adc3949ba59abbe56e057f20f883e', (err, user)=> {
  if (err) { console.log(err.error); return; };
  console.log(`======= add Admin success. user = `, user);
});

// 添加团长
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.addTZ('tz2', '团长2', 'e10adc3949ba59abbe56e057f20f883e', (err, user)=> {
  if (err) { console.log(err.error); return; };
  console.log(`======= add 团长 success. user = `, user);
});

// 添加团员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.addTY('ty2', '团员3', 'e10adc3949ba59abbe56e057f20f883e', (err, user)=> {
  if (err) { console.log(err.error); return; };
  console.log(`======= add 团员 success. user = `, user);
});

// 查询所有用户
// 1：页号，从1开始，2：每页记录条数，3：role，0所有，1管理员，2团长，3团员
// 4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。users对应的用户信息
// db.users.all_users(1, 2, 3, (err, users) => {
//   if (err) { console.log(err.error); return; };
//   console.log(users);
// });

// db.users.single_user(1, (err, user) => {
//   if (err) { console.log("single_user: " + err.error); return; };
//   console.log(user);
// });

// 修改用户
// 1：用户id，2：昵称，3：密码（为null不修改），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.updateUser(4, '昵称3', null, (err) => {
  if (err) { console.log(err.error); return; };
  console.log('======= edit success');
});

// db.users.all_users(1, 20, 0, (err, users) => {
//   if (err) { console.log(err.error); return; };
//   console.log(users);
// });

// 删除用户
// 1：用户id，2：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.delUser(4, (err) => {
  if (err) { console.log(err.error); return; };
  console.log('======= del success');
});

// db.users.all_users(1, 20, 0, (err, users) => {
//   if (err) { console.log(err.error); return; };
//   console.log(users);
// });

// 更新用户状态
// 1：用户id，2：status值，3：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.changeUserStatus(3, 0, (err) => {
  if (err) { console.log(err.error); return; };
  console.log(`======= changed`);
});

// 登录时检查是否可以登录
// 1：usname, 2：密码（前端输入的密码加密后的md5串，小写
// 3：回调 ，err不空时表示错误，空时user为相应的用户信息
db.users.checkUserPwd('admin', 'e10adc3949ba59abbe56e057f20f883e', (err, user) => {
  if (err) { console.log(err); return; }
  console.log(`admin valid!user:`, user);
});

// 更新用户上次登录IP
// 1. userid
// 2. 新的IP
// 3. 回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.updateUserLastIp(1, "1.1.1.2", (err) => {
  if (err) { console.log(err); return; }
  console.log("update last ip success!");
});

// 更新用户上次登录时间
// 1. userid
// 2. 回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.updateUserLastTime(1, (err) => {
  if (err) { console.log(err); return; }
  console.log("update last time success!");
});

// 查询所有用户
db.users.all_users(1, 10, 0, (err, users) => {
  if (err) { console.log(err.error); return; };
  console.log(users);
});

// 查询所有游戏
db.games.all_games(1, 20, 1, (err, games) => {
  if (err) { console.log(err.error); return; };
  console.log(games);
});

// 添加一个游戏
// 1. userid
// 2. gnickname
// 3. content
// 4. 淘宝订单号
db.games.addGame(1, "游戏昵称4", "游戏信息4", "tbdd4", (err) => {
  if (err) { console.log(err.error); return; }
  console.log('======== added game.');
});

// 查询所有游戏
// 1. pageIndex
// 2. pageCount
// 3. userid
db.games.all_games(1, 20, 1, (err, games) => {
  if (err) { console.log(err.error); return; };
  console.log(games);
});

// 修改游戏
// 1. id
// 2. userid
// 3. gnickname
// 4. content
// 5. 淘宝订单号
db.games.updateGame(4, 2, "游戏昵称5", "游戏信息5", "tbdd5", (err) => {
  if (err) { console.log(err.error); return; }
  console.log('======== updated game.');
});

// 删除游戏
// 1. id
db.games.delGame(1, (err) => {
  if (err) { console.log(err.error); return; };
  console.log("======== deleted game.");
});

// 更新游戏状态
// 1. id
// 2. status, 见需求文档
db.games.updateGameStatus(3, 2, (err) => {
  if (err) { console.log(err.error); return; };
  console.log("======== updated game status.");
});

db.games.all_games(1, 20, 3, (err, games) => {
  if (err) { console.log(err.error); return; };
  console.log(games);
});

// 添加游戏任务
// 1. gameid
// 2. 任务标题
// 3. 任务内容
db.games.addtask(3, "tasktitle", "taskcontent", (err) => {
  if (err) { console.log(err.error); return; };
  console.log("======= task added");
});

// 获取任务
// 1. gameid
// 由于任务数记录条数不会很多，基本不用分页
db.games.gettasks(3, (err, tasks) => {
  if (err) { console.log(err.error); return; };
  console.log(tasks);
});

// 更新任务
// 1. 任务id
// 2. 任务标题
// 3. 任务内容
db.games.updatetask(1, "title", "content", (err) => {
  if (err) { console.log(err.error); return; };
  console.log('========= updated task');
});

// 更新任务状态
// 1. 任务id
// 2. 新状态，见需求文档
db.games.changeTaskStatus(1, 1, (err) => {
  if (err) { console.log(err.error); return; };
  console.log('========= changeTaskStatus ok');
});

db.games.gettasks(3, (err, tasks) => {
  if (err) { console.log(err.error); return; };
  console.log(tasks);
});

// 删除任务
// 1.任务id
db.games.deltask(1, (err) => {
  if (err) { console.log(err.error); return; };
  console.log('==== deleted task');
});
db.games.gettasks(3, (err, tasks) => {
  if (err) { console.log(err.error); return; };
  console.log(tasks);
});

db.games.addtask(3, "tasktitle", "taskcontent", (err) => {
  if (err) { console.log(err.error); return; };
  console.log("======= task added");
});
// 进度
// 1. taskid
// 2. content
db.games.addprogress(1, "progress content", (err) => {
  if (err) { console.log(err.error); return; };
  console.log("======= progress added");
});
// 获取进度
// 1. 任务id
db.games.getprogresss(1, (err, progresses) => {
  if (err) { console.log(err.error); return; };
  console.log(progresses);
});

// 更新进度
// 1. 进度id
// 2. 进度内容
db.games.updateprogresss(1, "content", (err) => {
  if (err) { console.log(err.error); return; };
  console.log('========= updated progress');
});

db.games.getprogresss(1, (err, progresses) => {
  if (err) { console.log(err.error); return; };
  console.log(progresses);
});

// 删除进度
// 1. 进度id
db.games.delprogress(1, (err) => {
  if (err) { console.log(err.error); return; };
  console.log('==== deleted progress');
});

db.games.getprogresss(1, (err, progresses) => {
  if (err) { console.log(err.error); return; };
  console.log(progresses);
});

// 添加日志
// 1. type
// 2. doer
// 3. 内容
// 4. ip?
db.logs.addlog(1, 1, "log 1", "122.21.23.11", (err) => {
  console.log("========= log added");
});

db.logs.addlog(2, 2, "log 2", "122.21.23.11", (err) => {
  console.log("========= log added");
});

// 获取日志
// 1. 页号
// 2. 每页数量
// 3. 哪个用户的日志，0表示所有，其它表示按用户id过滤
db.logs.getlogs(1, 20, 0, (err, logs) => {
  console.log(logs);
});
