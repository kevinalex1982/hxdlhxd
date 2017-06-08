var rdb = require('../rdb');
var r = rdb.r;

exports.addGame = (userid, gnickname, content, tbdd, assignerid, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var game = {
    userid: userid,
    gnickname: gnickname,
    content: content,
    tbdd: tbdd,
    addtime: new Date().toLocaleString(),
    status: 0,
    assignerid: assignerid
  };

  r.table('games').insert(game).run(rdb.conn, (err, result) => {
    console.log(result);
    if (err) callback(err.msg);
    else {
      game.id = result.generated_keys[0];
      callback(null, game);
    }
  });
};

exports.addtask = (gameid, tasktitle, taskcontent, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('tasks').insert({
    gid: gameid,
    title: tasktitle,
    content: taskcontent,
    addtime: new Date().toLocaleString(),
    status: 0
  }).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else {
      callback(null);
    }
  });
};


// 进度
exports.addprogress = (taskid, content, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('progresses').insert({
    taskid: taskid,
    content: content,
    addtime: new Date().toLocaleString()
  }).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else {
      callback(null);
    }
  });
};

exports.getprogresss = (taskid, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('progresses').filter({taskid: taskid}).run(rdb.conn, (err, cursor)=>{
    if (err) callback(err.msg);
    else {
      cursor.toArray(function(err, result) {
        if (err) callback(err.msg);
        else {
          callback(null, result);
        }
      });
    }
  });
};

exports.gettasks = (gameid, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('tasks').filter({gid: gameid}).run(rdb.conn, (err, cursor)=>{
    if (err) callback(err.msg);
    else {
      cursor.toArray(function(err, result) {
        if (err) callback(err.msg);
        else {
          callback(null, result);
        }
      });
    }
  });
};

exports.updatetask = (taskid, title, content, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var newvalue = {
    title: title,
    content: content
  };

  r.table('tasks').get(taskid).update(newvalue).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else {
      if (result.replaced == 1 || result.unchanged == 1) {
        callback(null);
      } else {
        callback(`${id} not found!`);
      }
    }
  });
};

exports.updateprogresss = (id, content, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('progresses').get(id).update({content: content}).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else {
      if (result.replaced == 1 || result.unchanged == 1) {
        callback(null);
      } else {
        callback(`${id} not found!`);
      }
    }
  });
};


exports.delprogress = (id, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table("progresses").get(id).delete().run(rdb.conn, (err, result) => {
    if (err) callback(err.msg);
    else {
      callback(null);
    }
  });
};

exports.changeTaskStatus = (taskid, status, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('tasks').get(taskid).update({status: status}).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else {
      if (result.replaced == 1 || result.unchanged == 1) {
        callback(null);
      } else {
        callback(`${id} not found!`);
      }
    }
  });
};

exports.deltask = (id, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table("tasks").get(id).delete().run(rdb.conn, (err, result) => {
    if (err) callback(err.msg);
    else {
      // 删除进度
      r.table("progresses").filter({taskid: id}).delete().run(rdb.conn);
      callback(null);
    }
  });
};

exports.updateGame = (id, userid, gnickname, content, tbdd, assignerid, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var newvalue = {
    gnickname: gnickname,
    content: content,
    tbdd: tbdd
  };

  if (userid != null && userid != '') newvalue.userid = userid;
  if (assignerid != null && assignerid != '') newvalue.assignerid = assignerid;

  r.table('games').get(id).update(newvalue).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else {
      if (result.replaced == 1 || result.unchanged == 1) {
        callback(null);
      } else {
        callback(`${id} not found!`);
      }
    }
  });
};

exports.delGame = (id, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table("games").get(id).delete().run(rdb.conn, (err, result) => {
    if (err) callback(err.msg);
    else {
      callback(null);
    }
  });

  // 删除所有任务
  r.table("tasks").filter({gid: id}).run(rdb.conn, (err, cursor)=>{
    if (!err) {
      cursor.toArray((err, result)=>{
        if (!err && result.length > 0) {
          // 删除进度
          result.forEach((task)=>{
            r.table("progresses").filter({taskid: task.id}).delete().run(rdb.conn);
          });
        }
      });
    }
  });

  r.table("tasks").filter({gid: id}).delete().run(rdb.conn);
};

exports.updateGameStatus = (id, status, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  r.table('games').get(id).update({status: status}).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else {
      if (result.replaced == 1 || result.unchanged == 1) {
        callback(null);
      } else {
        callback(`${id} not found!`);
      }
    }
  });
};

exports.all_games_with_assigner = (pageIndex, pageCount, assignerid, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var q = r.table('games');
  q = q.filter({assignerid: assignerid});
  q = q.eqJoin('userid', r.table('users'));
  q = q.without({right: ["id",'pwd','lastip','lasttime','role','status','regtime']});
  q = q.zip();

  var qcount = q.count(); // 指定了查询条件后，统计该查询的结果总数。
  qcount.run(rdb.conn, (err, count) => {
    if (err) callback(err.msg);
    else {
      if (count == 0) {
        // 未找到记录
        callback(null, {total: 0, pageIndex: pageIndex, pageCount: pageCount, games:[]});
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

                data.games = result;
                callback(null, data);
              }
            });
          }
        });
      }
    }
  });

};

exports.all_games = (pageIndex, pageCount, userid, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var q = r.table('games');
  if (userid != null && userid != '') q = q.filter({userid: userid});
  q = q.eqJoin('userid', r.table('users'));
  q = q.without({right: ["id",'pwd','lastip','lasttime','role','status','regtime']});
  q = q.zip();

  var qcount = q.count(); // 指定了查询条件后，统计该查询的结果总数。
  qcount.run(rdb.conn, (err, count) => {
    if (err) callback(err.msg);
    else {
      if (count == 0) {
        // 未找到记录
        callback(null, {total: 0, pageIndex: pageIndex, pageCount: pageCount, games:[]});
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

                data.games = result;
                callback(null, data);
              }
            });
          }
        });
      }
    }
  });
};
