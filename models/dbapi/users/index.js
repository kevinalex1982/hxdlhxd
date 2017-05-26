var users = require('./users_data.js');

exports.checkUserPwd = (usname, password, callback) => {
  var user = users.filter((u) => {
    return u.usname == usname && u.pwd == password;
  });

  if (user != null && user.length == 1) {
    callback(null, {
      id: user[0].id,
      nickname: user[0].nickname,
      role: user[0].role,
      lastip: user[0].lastip,
      regtime: user[0].regtime,
      lasttime: user[0].lasttime,
      status: user[0].status,
      usname: user[0].usname
    });
  } else {
    callback({error: `${usname} not valid`});
  }
}

exports.single_user = (id, callback) => {
  var user = users.filter((u) => { return u.id == id; });
  if (user != null && user.length > 0) callback(null, {
    id: user[0].id,
    nickname: user[0].nickname,
    role: user[0].role,
    lastip: user[0].lastip,
    regtime: user[0].regtime,
    lasttime: user[0].lasttime,
    status: user[0].status,
    usname: user[0].usname
  });
  else callback({error: `user id ${id} not found!`});
};

exports.all_users = (pageIndex, pageCount, role, callback) => {

  var matchedUsers = null;
  if (role == 0) {
    matchedUsers = users;
  } else {
    matchedUsers = users.filter((user) => {
      return user.role == role;
    });
  }

  var sliceStart = (pageIndex - 1) * pageCount;
  var sliceEnd = sliceStart + pageCount;

  var data = {
    total: matchedUsers.length,
    pageIndex: pageIndex,
    pageCount: pageCount
  };

  var usersSliced = matchedUsers.slice(sliceStart, sliceEnd);

  var u = [];
  usersSliced.forEach((user) => {
    u.push({
      id: user.id,
      nickname: user.nickname,
      role: user.role,
      lastip: user.lastip,
      regtime: user.regtime,
      lasttime: user.lasttime,
      status: user.status,
      usname: user.usname
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
  user.lasttime = "";//d.toLocaleString();
  user.lastip = "";
  user.status = 0;
  users.push(user);

  callback(null, {
    id: user.id,
    nickname: user.nickname,
    role: user.role,
    regtime: user.regtime,
    status: user.status,
    usname: user.usname,
    lasttime: user.lasttime,
    lastip: user.lastip
  });
}

exports.addAdmin = (usname, nickname, pwd, callback) => {
  addUser({
      usname: usname,
      pwd: pwd,
      nickname: nickname,
      role: 1
  }, callback);
};

// 添加团长
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
exports.addTZ = (usname, nickname, pwd, callback) => {
  addUser({
      usname: usname,
      pwd: pwd,
      nickname: nickname,
      role: 2
  }, callback);
};

// 添加团员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
exports.addTY = (usname, nickname, pwd, callback) => {
  addUser({
      usname: usname,
      pwd: pwd,
      nickname: nickname,
      role: 3
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

exports.updateUserLastIp = (id, newip, callback) => {
  var error = { error: "not found" };
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users[i].lastip = newip;
      error = null;
      break;
    }
  }

  callback(error);
};
