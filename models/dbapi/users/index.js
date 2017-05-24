var users = require('./users_data.js');

exports.all_users = (pageIndex, pageCount, callback) => {

  var sliceStart = (pageIndex - 1) * pageCount;
  var sliceEnd = sliceStart + pageCount;

  var data = {
    usersCount: users.length,
    pageIndex: pageIndex,
    pageCount: pageCount
  };

  var usersSliced = users.slice(sliceStart, sliceEnd);

  var u = [];
  usersSliced.forEach((user) => {
    u.push({
      id: user.id,
      nickname: user.nickname,
      role: user.role,
      lastip: user.lastip,
      regtime: user.regtime,
      lasttime: user.lasttime,
      status: user.status
    });
  });

  data.users = u;

  callback(null, data);
};

function addUser(user, callback)
{
  if (users.length == 0) user.id = 1;
  else user.id = users[users.length - 1].id + 1;

  var d = new Date();
  user.regtime = d.toLocaleString();
  user.lasttime = d.toLocaleString();
  users.push(user);

  callback(null);
}

exports.addAdmin = (usname, nickname, pwd, callback) => {
  addUser({
      usname: usname,
      pwd: pwd,
      nickname: nickname,
      role: 1,
      lastip: "127.0.0.1",
      status: 0
  }, callback);
};

// 添加团长
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
exports.addTZ = (usname, nickname, pwd, callback) => {
  addUser({
      usname: usname,
      pwd: pwd,
      nickname: nickname,
      role: 2,
      lastip: "127.0.0.1",
      status: 0
  }, callback);
};

// 添加团员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
exports.addTY = (usname, nickname, pwd, callback) => {
  addUser({
      usname: usname,
      pwd: pwd,
      nickname: nickname,
      role: 3,
      lastip: "127.0.0.1",
      status: 0
  }, callback);
};

exports.updateUser = (id, nickname, pwd, callback) => {
  var error = { error: "not found" };
  var index = -1;
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      index = i;
      error = null;
      break;
    }
  }

  if (index > -1)
  {
    users[index].nickname = nickname;
    if (pwd != null || pwd != '')
      users[index].pwd = pwd;
  }

  callback(error);
};

exports.delUser = (id, callback) => {

  var error = { error: "not found" };
  var index = -1;
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      index = i;
      error = null;
      break;
    }
  }

  if (index > -1)
    users.splice(index,1);
  callback(error);
};

exports.changeUserStatus = (id, status, callback) => {
  var error = { error: "not found" };
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users[i].status = status;
      error = null;
      break;
    }
  }

  callback(error);
};
