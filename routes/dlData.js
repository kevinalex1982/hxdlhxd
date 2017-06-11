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

    var curuser = req.body.curuser;
// 添加管理员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.addAdmin(req.body.usloginname, req.body.usnickname, req.body.usloginpsw, (err, user) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        }
        else {
            res.send(user);
            addLog(1, curuser.userid, "管理员：" + curuser.nickname + "-------添加管理员：" + req.body.usnickname, req);
            console.log('======= add Admin success.');
        }


    });
})

router.post('/addCaptain', function (req, res, next) {
    var curuser = req.body.curuser;
    // 添加团长
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.addTZ(req.body.usloginname, req.body.usnickname, req.body.usloginpsw, (err, user) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        } else {
            res.send(user);
            addLog(1, curuser.userid, "管理员：" + curuser.nickname + "-------添加团长：" + req.body.usnickname, req);
            console.log(`======= add 团长 success`);
        }
    });
})

router.post('/addMember', function (req, res, next) {
    var curuser = req.body.curuser;

// 添加团员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.addTY(req.body.usloginname, req.body.usnickname, req.body.usloginpsw, (err, user) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        } else {
            res.send(user);
            addLog(1, curuser.userid, "用户：" + curuser.nickname + "-------添加团员：" + req.body.usnickname, req);
            console.log(`======= add 团员 success`);
        }
    });
})

router.post('/updUser', function (req, res, next) {
    var curuser = req.body.curuser;
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
            addLog(1, curuser.userid, "用户：" + curuser.nickname + "-------更新用户：" + req.body.usnickname, req);
            console.log('======= 更新用户成功.');
        }
    });

})

router.post('/delUser', function (req, res, next) {
    var curuser = req.body.curuser;
// 删除用户
// 1：用户id，2：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.delUser(req.body.user.id, (err) => {
        if (err) {
            res.send("error");
            console.log(err.error);

        } else {
            res.send('success');
            addLog(1, curuser.userid, "用户：" + curuser.nickname + "-------删除用户：" + req.body.user.usname, req);
            console.log('======= del user success');
        }
    });
})

router.post('/getGames', function (req, res, next) {
    var curstatus = req.body.param.status == '' ? null : req.body.param.status;
    if (curstatus != null) {
        curstatus = Number(curstatus);
    }
    // 查询所有游戏
    // 1.pageIndex
    // 2.pageCount
    // 3.userid, 为''或null时不限制用户，返回所有，否则返回已经被分配到用户的游戏列表。
    // 4.status, 将status加进查询条件，为null时不使用此条件。
    // 5.assignerid, 将 assignerid加进查询条件，为null不使用此条件。
    // db.games.all_games(1, 20, '1732152d-a7f7-43cd-9ee0-83e9105cb44d', 1, null, (err, games) => {
    /*req.body.param.usID ,req.body.param.status, req.body.param.assignerid*/
    db.games.all_games(Number(Number(req.body.start / req.body.length).toFixed(0)) + 1, Number(req.body.length), req.body.param.usID == '' ? null : req.body.param.usID,
        curstatus, req.body.param.assignerid == '' ? null : req.body.param.assignerid, (err, games) => {
            if (err) {
                res.send('error');
            } else {
                console.log('games');
                console.log(games);
                for (var i = 0; i < games.games.length; i++) {
                    if (games.games[i].nickname == null) {
                        games.games[i].nickname = '未分配';
                    }
                }
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
    //console.log(req);
    //console.log(req.body);
    // 查询是谁分配的所有游戏
// 1.pageIndex
// 2.pageCount
// 3.agsignerid
    console.log(Number(Number(req.body.start / req.body.length).toFixed(0)) + 1);

    console.log(req.body.param.curuser.userid);
    db.games.all_games_with_assigner(Number(Number(req.body.start / req.body.length).toFixed(0)) + 1, Number(req.body.length), req.body.param.curuser.userid, (err, games) => {
        if (err) {
            res.send('error');
        } else {
            for (var i = 0; i < games.games.length; i++) {
                if (games.games[i].nickname == null) {
                    games.games[i].nickname = '未分配';
                }
            }
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
    db.games.addGame(req.body.usID, req.body.gameNickName, req.body.gameInfo, req.body.gamettddh, req.body.curuser.userid, (err, gamn) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        } else {
            gamn.nickname = req.body.nickname;
            /*console.log(gamn);*/
            res.send(gamn);
            addLog(2, req.body.curuser.userid, "管理员：" + req.body.curuser.nickname + "-------添加游戏：游戏昵称为：" + req.body.gameNickName, req);
            console.log(`======= add 游戏 success`);
        }
    });
})

router.post('/updGame', function (req, res, next) {
    var curuser = req.body.curuser;

    // 修改游戏
// 1. id
// 2. userid,为null或者''时，表示不更改分配的用户。否则将更改分配到的用户。
// 3. gnickname
// 4. content
// 5. 淘宝订单号
// 6. 分配者用户id，为null或者''时，表示不更改，否则将更改为新指定的分配者。
    db.games.updateGame(req.body.gameid, req.body.usID, req.body.gameNickName, req.body.gameInfo, req.body.gamettddh, req.body.curuser.userid, (err) => {
        if (err) {
            res.send("error");
            console.log(err.error);

        }
        else {
            res.send('success');
            addLog(2, curuser.userid, "用户：" + curuser.nickname + "-------更新游戏：" + req.body.gameNickName, req);
            console.log('======= 更新游戏成功.');
        }

    })

})

router.post('/delGame', function (req, res, next) {
    console.log(req.body.game);
    var curuser = req.body.curuser;
    // 删除游戏
    // 1. id
    db.games.delGame(req.body.game.id, (err) => {
        if (err) {
            res.send("error");
            console.log(err.error);

        } else {
            res.send('success');
            addLog(2, curuser.userid, "用户：" + curuser.nickname + "-------删除游戏：" + req.body.game.gnickname, req);
            console.log('======= del user success');
        }
    });
})

router.post('/changeGameStatus', function (req, res, next) {

    var curuser = req.body.curuser;
    var curstatus = req.body.status == '' ? null : req.body.status;
    if (curstatus != null) {
        curstatus = Number(curstatus);
    }
// 更新游戏状态
// 1. id
// 2. status, 见需求文档
    db.games.updateGameStatus(req.body.game.id, curstatus, (err) => {
        var curstatusText;
        switch (curstatus) {
            case 0: {
                curstatusText = '未完成';
                break;
            }
            case 1: {
                curstatusText = '正在进行';
                break;
            }
            case 2: {
                curstatusText = '完成';
                break;
            }
        }
        if (err) {
            res.send("error");
            console.log(err.error);

        } else {
            res.send('success');
            addLog(2, curuser.userid, "用户：" + curuser.nickname + "-------更新游戏  " + req.body.game.gnickname + "  的完成状态为：" + curstatusText, req);
            console.log('======= del user success');
        }
    });
})


router.post('/getTasks', function (req, res, next) {



    // 获取任务
    // 1. gameid
    // 由于任务数记录条数不会很多，基本不用分页
    db.games.gettasks(req.body.gameid, (err, tasks) => {
        if (err) {
            res.send('error');
        } else {
            console.log(tasks);
            res.send(tasks);
        }
    })


});


router.post('/addTask', function (req, res, next) {
    var curuser = req.body.curuser;
    // 添加游戏任务
// 1. gameid
// 2. 任务标题
// 3. 任务内容
    db.games.addtask(req.body.gameid, req.body.tasktitle, req.body.taskcontent, (err, task) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        } else {
            addLog(3, req.body.curuser.userid, "用户：" + req.body.curuser.nickname + "-------添加游戏任务-----游戏昵称为：" + req.body.gameNickName + "&&任务名称为：" + req.body.tasktitle, req);
            res.send(task);

            console.log(`======= add 游戏 success`);
        }
    });
})


router.post('/updTask', function (req, res, next) {
    var curuser = req.body.curuser;

    // 更新任务
// 1. 任务id
// 2. 任务标题
// 3. 任务内容
    db.games.updatetask(req.body.taskid, req.body.tasktitle, req.body.taskcontent, (err) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        }
        else {
            res.send('success');
            addLog(3, curuser.userid, "用户：" + curuser.nickname + "-------删除游戏 " + req.body.gameNickName + " 的任务：" + req.body.tasktitle, req);
            console.log('======= 更新任务成功.');
        }

    })

})

router.post('/delTask', function (req, res, next) {
    var curuser = req.body.curuser;

// 删除任务
// 1.任务id
    db.games.deltask(req.body.taskid, (err) => {
        if (err) {
            res.send("error");
            console.log(err.error);

        } else {
            res.send('success');
            addLog(3, curuser.userid, "用户：" + curuser.nickname + "-------删除游戏 " + req.body.gamenickname + " 的任务：" + req.body.taskname, req);
            console.log('======= del task success');
        }
    });
})


router.post('/addProgress', function (req, res, next) {
    var curuser = req.body.curuser;
    // 添加进度
// 1. taskid
// 2. content
    console.log(req.body.taskid);
    console.log(req.body.content);
    db.games.addprogress(req.body.taskid, req.body.content, (err, progress) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        } else {
            console.log(progress);
            addLog(4, req.body.curuser.userid, "用户：" + req.body.curuser.nickname + "-------添加游戏进度" + progress.content + "-----游戏昵称为："
                + req.body.gameNickName + "&&任务名称为：" + req.body.tasktitle, req);
            res.send(progress);

            console.log(`======= add 进度 success`);
        }
    });


})

router.post('/getProgresses', function (req, res, next) {

// 获取进度
// 1. 任务id
    db.games.getprogresss(req.body.taskid, (err, progresses) => {

        if (err) {
            res.send('error');
        } else {
            console.log(progresses);
            res.send(progresses);
        }
    })


});


// 更新进度
// 1. 进度id
// 2. 进度内容
// db.games.updateprogresss('135bb902-5e33-44fd-88af-50d0fc7c78d7', "content 33333333", (err) => {
//   if (err) { console.log(err); return; };
//   console.log('========= updated progress');
// });
router.post('/delProgress', function (req, res, next) {
    var curuser = req.body.curuser;

// 删除进度
// 1. 进度id
    db.games.delprogress(req.body.progressid, (err) => {


        if (err) {
            res.send("error");
            console.log(err.error);

        } else {
            res.send('success');
            addLog(4, req.body.curuser.userid, "用户：" + req.body.curuser.nickname + "-------删除游戏进度-----游戏昵称为："
                + req.body.gamenickname + "&&任务名称为：" + req.body.tasktitle, req);
            console.log('======= del progress success');
        }
    });
})


router.post('/changeTaskStatus', function (req, res, next) {
    var curuser = req.body.curuser;

// 更新任务状态
// 1. 任务id
// 2. 新状态，见需求文档
    db.games.changeTaskStatus(req.body.taskid, req.body.status, (err) => {

        if (err) {
            res.send("error");
            console.log(err.error);

        } else {
            res.send('success');
            var wcstatus = req.body.status == '0' ? "未完成" : "完成";

            addLog(3, curuser.userid, "用户：" + curuser.nickname + "-------更新游戏 " + req.body.gamenickname + " 的任务： " + req.body.taskname + " 的状态为" + wcstatus, req);
            console.log('======= changeTaskStatus success');
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

    db.logs.addlog(req.body.logtype, req.body.usID, req.body.logcontent, clientipaddress, (err) => {
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
    db.logs.getlogs(Number(Number(req.body.start / req.body.length).toFixed(0)) + 1, Number(req.body.length), 0, (err, logs) => {
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

function addLog(logtype, usID, logcontent, req) {

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

    db.logs.addlog(logtype, usID, logcontent, clientipaddress, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("========= log added");
    });
}

module.exports = router;
