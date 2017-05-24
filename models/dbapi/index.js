
var users_memdb = require('./users');
var users_rethinkdb = require('./users_rethinkdb');

var games_memdb = require('./games');
var games_rethinkdb = require('./games_rethinkdb');

// default to memdb
var userdbapi = users_memdb;
var gamedbapi = games_memdb;


exports.users =  users_memdb;
exports.games = games_memdb;

exports.useMemDb = ()=> {
    console.log('use memdb');
    exports.users = users_memdb;
    exports.games = games_memdb;
};

exports.useRethinkDb = ()=>{
    console.log('use rethinkdb');
    exports.users = users_rethinkdb;
    exports.games = games_rethinkdb;
};

var logs = [];

exports.logs = {
  addlog: (type, userid, content, ip, callback) => {
    var id = 1;
    if (logs.length > 0) id = logs[logs.length - 1].id + 1;

    logs.push({
      id: id,
      type: type,
      userid: userid,
      content: content,
      ip: ip,
      addtime: new Date().toLocaleString()
    });
    callback(null);
  },
  getlogs: (pageIndex, pageCount, userid, callback) => {
    var matchedLogs = null;
      if (userid == 0) matchedLogs = logs;
      else matchedLogs = logs.filter((log) => {
        return log.userid == userid;
      });

      var sliceStart = (pageIndex - 1) * pageCount;
      var sliceEnd = sliceStart + pageCount;

      var data = {
        total: matchedLogs.length,
        pageIndex: pageIndex,
        pageCount: pageCount
      };

      var logsSliced = matchedLogs.slice(sliceStart, sliceEnd);
      data.logs = logsSliced;
      callback(null, data);
  }
}
