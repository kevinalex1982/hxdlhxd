var rdb = require('../rdb');
var r = rdb.r;

exports.checkUserPwd = (usname, password, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('users').filter({usname: usname, pwd: password}).run(rdb.conn, (err, cursor)=>{
    if (err) callback(err.msg);
    else {
      cursor.toArray(function(err, users) {
        if (err) callback(err.msg);
        else {
          if (users.length == 0) {
            callback(`${usname} not valid.`);
          } else {
            callback(null, {
              id: users[0].id,
              nickname: users[0].nickname,
              role: users[0].role,
              lastip: users[0].lastip,
              regtime: users[0].regtime,
              lasttime: users[0].lasttime,
              status: users[0].status,
              usname: users[0].usname
            });
          }
        }
      });
    }
  });
}

exports.single_user = (id, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('users').get(id).run(rdb.conn, (err, user) => {
    //console.log("api: single_user: ", user);
    if (err) callback(err.msg);
    else {
      if (user == null) callback(`${id} not exists.`);
      else {
        callback(null, {
          id: user.id,
          nickname: user.nickname,
          role: user.role,
          lastip: user.lastip,
          regtime: user.regtime,
          lasttime: user.lasttime,
          status: user.status,
          usname: user.usname
        });
      }
    }
  });
};

exports.all_users = (pageIndex, pageCount, role, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var q = r.table('users');
  if (role > 0) q = q.filter({role: role}); // 按role来查找，为0时表示所有，否则按指定的用户角色。

  var qcount = q.count(); // 指定了查询条件后，统计该查询的结果总数。
  qcount.run(rdb.conn, (err, count) => {
    if (err) callback(err.msg);
    else {
      if (count == 0) {
        // 未找到记录
        callback(null, {total: 0, pageIndex: pageIndex, pageCount: pageCount, users:[]});
      } else {
        // 基于指定的查询获取分页数据
        var sliceStart = (pageIndex - 1) * pageCount;
        q = q.slice(sliceStart, sliceStart + pageCount); // 从源头指定需要的数据区间，而不是返回大集合体后获取子区间，提高查询性能。
        q.run(rdb.conn, (err, cursor)=>{
          if (err) callback(err.msg);
          else {
            cursor.toArray(function(err, result) {
              if (err) callback(err.msg);
              else {
                var data = {
                  total: count,
                  pageIndex: pageIndex,
                  pageCount: pageCount
                };

                var u = [];
                result.forEach((user) => {
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
              }
            });
          }
        });
      }
    }
  });
};

function addUser(user, callback)
{
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var d = new Date();
  user.regtime = d.toLocaleString();
  user.lasttime = "";
  user.lastip = "";
  user.status = 0;

  r.table('users').filter({usname: user.usname}).count().run(rdb.conn, (err, result)=>{
    if (result != 0) {
      callback(`${user.usname} already exists.`);
      return;
    }

    r.table('users').insert(user).run(rdb.conn, (err, result) => {
      if (err) callback(err.msg);
      else {
        callback(null, {
          id: result.generated_keys[0],
          nickname: user.nickname,
          role: user.role,
          regtime: user.regtime,
          status: user.status,
          usname: user.usname,
          lasttime: user.lasttime,
          lastip: user.lastip
        });
      }
    });
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

    if (rdb.conn == null) {
      callback("rdb.conn is null");
      return;
    }

    var newvalue = {nickname: nickname};
    if (pwd != null && pwd != '')
      newvalue.pwd = pwd;

    r.table("users").get(id).update(newvalue).run(rdb.conn, (err, result) => {
      if (err) callback(err.msg);
      else {
        //console.log(result);
        if (result.replaced == 1 || result.unchanged == 1) {
          callback(null);
        } else {
          callback(`${id} not found!`);
        }
      }
    });
};

exports.delUser = (id, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table("users").get(id).delete().run(rdb.conn, (err, result) => {
    if (err) callback(err.msg);
    else {
      callback(null);
    }
  });
};

exports.changeUserStatus = (id, status, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var newvalue = {status: status};

  r.table("users").get(id).update(newvalue).run(rdb.conn, (err, result) => {
    if (err) callback(err.msg);
    else {
      //console.log(result);
      if (result.replaced == 1 || result.unchanged == 1) {
        callback(null);
      } else {
        callback(`${id} not found!`);
      }
    }
  });
};

exports.updateUserLastIp = (id, newip, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var newvalue = {lastip: newip};

  r.table("users").get(id).update(newvalue).run(rdb.conn, (err, result) => {
    if (err) callback(err.msg);
    else {
      //console.log(result);
      if (result.replaced == 1 || result.unchanged == 1) {
        callback(null);
      } else {
        callback(`${id} not found!`);
      }
    }
  });
};

exports.updateUserLastTime = (id, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var newvalue = {lasttime: new Date().toLocaleString()};

  r.table("users").get(id).update(newvalue).run(rdb.conn, (err, result) => {
    if (err) callback(err.msg);
    else {
      //console.log(result);
      if (result.replaced == 1 || result.unchanged == 1) {
        callback(null);
      } else {
        callback(`${id} not found!`);
      }
    }
  });
};
