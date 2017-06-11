var sio = require('socket.io');
var rdb = require('../dbapi/rdb');
var io = null;

var connected_users = [];

exports.configSio = (http)=>{
  if (!io) {
    io = sio(http);
  }

  io.on('connection', (socket)=>{
    //console.log('a user connected');

    socket.on('usr_reg', function(msg) {
      console.log(msg, 'registered!');
      //console.log(msg.role);

      connected_users.push({userinfo: msg, s: socket});
      //console.log(connected_users);
    });

    socket.on('disconnect', ()=>{
      console.log('user disconnected');

      var cu = connected_users.filter((u)=>{
        return u.s === socket;
      });

      if (cu && cu.length > 0) {
        connected_users.splice(connected_users.indexOf(cu[0]), 1);
        console.log(connected_users);
      }

    });
  });

};

exports.watch = ()=> {

    rdb.r.table('games').changes({includeTypes: true}).run(rdb.conn, (err, cursor)=>{
      if (!err) {
        cursor.each((err, row)=>{
          //console.log(row);
          if (row.type == 'change') {
            // updated
          } else if (row.type == 'add') {
            // inserted
            var connected_user = connected_users.filter((u)=>{
      //        console.log(u.userinfo.userid);
        //      console.log(row.new_val.userid);
              return u.userinfo.userid === row.new_val.userid;
            });
            if (connected_user) {
          //    console.log(connected_user);
              connected_user[0].s.emit('mygame', {content: row.new_val.content})
            }
          } else if (row.type == 'remove') {
            // deleted
          }
        });
      }
    });

};
