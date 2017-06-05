var r = require('rethinkdb');
var rconf = require('../config');

r.connect({db: rconf.db, host: rconf.host, port: rconf.port}, (err, conn) => {

  if (err != null) {
    throw err;
  } else {
    console.log("rethinkdb connect success. now initialize db.");
    exports.conn = conn;

    r.dbList().run(conn, (err, dblist) => {

      if (dblist.indexOf(rconf.db) == -1) {
        // create db.
        r.dbCreate(rconf.db).run(conn, (err, result) => {
          if (err) throw err;
          conn.use(rconf.db);
        });
      }

      r.tableList().run(conn, (err, result)=>{
        // create tables
        var tables = ['logs', 'users', 'games', 'tasks', 'progresses'];
        var indexes = {
          'logs': ['userid', 'addtime'],
          'users': ['role', 'usname'],
          'games': ['userid'],
          'tasks': ['gid'],
          'progresses': ['taskid']
        }
        tables.forEach((table)=> {
          if (result.indexOf(table) == -1) {
            r.tableCreate(table).run(conn, (err, result) => {
              if (err) throw err;
              createIndex(table, indexes[table]);// create index.
              if (table == 'users') {
                r.table(table).insert({ // 添加超级用户
                  usname: 'admin',
                  pwd: 'e10adc3949ba59abbe56e057f20f883e',
                  nickname: '亮哥哥',
                  role: 1,
                  regtime: "2017-05-23 10:20:00",
                  lasttime: "2017-05-23 10:20:00",
                  lastip: "127.0.0.1",
                  status: 0
                }).run(exports.conn)
                  .then((result)=>{}).catch((err)=>{});
              }
            });
          } else {
            createIndex(table, indexes[table]);// create index.
          }
        });
      });
    });
  }
});

function createIndex(table, indexes) {
  r.table(table).indexList().run(exports.conn, (err, result) => {
    //console.log("index list:", result, ", err:", err);
    indexes.forEach((index)=> {
      if (result.indexOf(index) == -1) {
        r.table(table).indexCreate(index).run(exports.conn, (err, result)=>{
          if (err) console.log(err);
        });
      }
    });
  });
}

exports.r = r;
