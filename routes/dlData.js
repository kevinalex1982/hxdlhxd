/**
 * Created by kevin on 2017/5/23.
 */
var express = require('express');
var router = express.Router();
var db = require('../models/dbapi');
db.useRethinkDb(); // 默认内存数据库，使用这个切换成实际部署数据库。*/

router.post('/getUsers', function (req, res, next) {
    console.log(Number(Number(req.body.start / req.body.length).toFixed(0)) + 1);
    console.log(req.body.length);
    console.log(Number(req.body.param.role));

// 查询所有用户
// 1：页号，从1开始，2：每页记录条数，3：role，0所有，1管理员，2团长，3团员
// 4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。users对应的用户信息
    db.users.all_users(Number(Number(req.body.start / req.body.length).toFixed(0)) + 1, Number(req.body.length), Number(req.body.param.role), (err, users) => {
        //db.users.all_users(1, 15, 1, (err, users) => {
        if (err) {

            console.log(err);
            res.send('error');
        } else {
            console.log(users);

            var jsonSend = {
                data: users.users, "iTotalDisplayRecords": users.total,
                "iTotalRecords": users.total,
                "message": "success"
            };

            res.send(jsonSend);
        }
    });
});


router.post('/addAdmin', function (req, res, next) {

    var curuser =req.body.curuser;
// 添加管理员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.addAdmin(req.body.usloginname, req.body.usnickname, req.body.usloginpsw, (err, user) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        }
        else {
            res.send(user);
            addLog(1,curuser.userid,"管理员："+curuser.nickname+"-------添加管理员："+req.body.usnickname,req);
            console.log('======= add Admin success.');
        }


    });
})

router.post('/addCaptain', function (req, res, next) {
    // 添加团长
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.addTZ(req.body.usloginname, req.body.usnickname, req.body.usloginpsw, (err, user) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        } else {
            res.send(user);
            addLog(1,curuser.userid,"管理员："+curuser.nickname+"-------添加团长："+req.body.usnickname,req);
            console.log(`======= add 团长 success`);
        }
    });
})

router.post('/addMember', function (req, res, next) {

// 添加团员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.addTY(req.body.usloginname, req.body.usnickname, req.body.usloginpsw, (err, user) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        } else {
            res.send(user);
            addLog(1,curuser.userid,"用户："+curuser.nickname+"-------添加团员："+req.body.usnickname,req);
            console.log(`======= add 团员 success`);
        }
    });
})

router.post('/updUser', function (req, res, next) {
    console.log(req.body.usloginpsw == "" ? null : req.body.usloginpsw);
// 修改用户
// 1：用户id，2：昵称，3：密码（为null不修改），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.updateUser(req.body.usID, req.body.usnickname, req.body.usloginpsw == "" ? null : req.body.usloginpsw, (err) => {
        if (err) {
            res.send("error");
            console.log(err.error);

        }
        else {
            res.send('success');
            addLog(1,curuser.userid,"用户："+curuser.nickname+"-------更新用户："+req.body.usnickname,req);
            console.log('======= 更新用户成功.');
        }
    });

})

router.post('/delUser', function (req, res, next) {
// 删除用户
// 1：用户id，2：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.delUser(req.body.usID, (err) => {
        if (err) {
            res.send("error");
            console.log(err.error);

        } else {
            res.send('success');
            addLog(1,curuser.userid,"用户："+curuser.nickname+"-------删除用户："+req.body.usID,req);
            console.log('======= del user success');
        }
    });
})


router.post('/getGames', function (req, res, next) {

    /*    console.log(Number(Number(req.body.start / req.body.length).toFixed(0))+1);
     console.log(Number(req.body.length));
     console.log(Number(req.body.usID));*/
    console.log(req.body.param.usID==''?null:req.body.param.usID);

    // 查询所有游戏 userid=0 返回所有
    db.games.all_games(Number(Number(req.body.start / req.body.length).toFixed(0)) + 1, Number(req.body.length), req.body.param.usID==''?null:req.body.param.usID, (err, games) => {
        if (err) {
            res.send('error');
        } else {
            console.log('games');
            console.log(games);
            var jsonSend = {
                data: games.games, "iTotalDisplayRecords": games.total,
                "iTotalRecords": games.total,
                "message": "success"
            };
            res.send(jsonSend);
        }
    })

});


router.post('/getGameWithAssigners', function (req, res, next) {

    // 查询是谁分配的所有游戏
// 1.pageIndex
// 2.pageCount
// 3.agsignerid
    console.log(  Number(Number(req.body.start / req.body.length).toFixed(0)) + 1);

    console.log(req.body.param.curuser.userid);
db.games.all_games_with_assigner(Number(Number(req.body.start / req.body.length).toFixed(0)) + 1, Number(req.body.length), req.body.param.curuser.userid, (err, games) => {
    if (err) {
        res.send('error');
    } else {
        console.log('games');
        console.log(games);
        var jsonSend = {
            data: games.games, "iTotalDisplayRecords": games.total,
            "iTotalRecords": games.total,
            "message": "success"
        };
        res.send(jsonSend);
    }
 });

});


router.post('/addGame', function (req, res, next) {



    // 添加一个游戏
    // 1. userid
    // 2. gnickname
    // 3. content
    // 4. 淘宝订单号
    // 5. 分配者用户id
    db.games.addGame(req.body.usID, req.body.gameNickName, req.body.gameInfo, req.body.gamettddh,req.body.curuser.userid, (err, gamn) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        } else {
            gamn.nickname=req.body.nickname;
            /*console.log(gamn);*/
            res.send(gamn);
            addLog(2,req.body.curuser.userid,"管理员："+req.body.curuser.nickname+"-------添加游戏：游戏昵称为："+req.body.gameNickName,req);
            console.log(`======= add 游戏 success`);
        }
    });
})


router.post('/addLog', function (req, res, next) {

// 添加日志
// 1. type
// 2. doer
// 3. 内容
// 4. ip?

  /*  Type 1账号 2游戏 3任务 4任务列表 5 其他
    Doer 操作者 就是userid
    Content 操作内容（who did what）*/
    var clientipaddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    if (clientipaddress.substr(0, 7) == "::ffff:") {
        clientipaddress = clientipaddress.substr(7)
    }

    db.logs.addlog(req.body.logtype, req.body.usID, req.body.logcontent,clientipaddress, (err) => {
        if (err) {
            console.log(err);
            return;
        }


        console.log("========= log added");
    });



})

router.post('/getLogs', function (req, res, next) {

    // 获取日志
    // 1. 页号
    // 2. 每页数量
    // 3. 哪个用户的日志，0表示所有，其它表示按用户id过滤
    db.logs.getlogs(1, 10, 0, (err, logs) => {
        if (err) {
            res.send('error');
        } else {
            console.log(logs);
            var jsonSend = {
                data: logs.logs, "iTotalDisplayRecords": logs.total,
                "iTotalRecords": logs.total,
                "message": "success"
            };
            res.send(jsonSend);
        }
     });


});

function  addLog(logtype, usID, logcontent,req) {

    // 添加日志
// 1. type
// 2. doer
// 3. 内容
// 4. ip?

    /*  Type 1账号 2游戏 3任务 4任务列表 5 其他
     Doer 操作者 就是userid
     Content 操作内容（who did what）*/
    var clientipaddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    if (clientipaddress.substr(0, 7) == "::ffff:") {
        clientipaddress = clientipaddress.substr(7)
    }

    db.logs.addlog(logtype, usID, logcontent,clientipaddress, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("========= log added");
    });
}

module.exports = router;
