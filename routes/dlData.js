/**
 * Created by kevin on 2017/5/23.
 */
var express = require('express');
var router = express.Router();
var db = require('../models/dbapi');

/* GET users listing. */
router.post('/getUsers', function (req, res, next) {
    console.log(req.body);
    console.log(req.body.start);
    console.log(req.body.length);

// 查询所有用户
// 1：页号，从1开始，2：每页记录条数，3：role，0所有，1管理员，2团长，3团员
// 4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。users对应的用户信息
    db.users.all_users(Number(req.body.start / req.body.length) + 1, req.body.length, req.body.param.role, (err, users) => {
        if (err) {
            console.log(err.error);
            return;
        }
        ;
        console.log(users);
        var jsonSend = {
            data: users.users, "iTotalDisplayRecords": users.total,
            "iTotalRecords": users.total,
            "message": "success"
        };
        res.send(jsonSend);
    });
});


router.post('/addAdmin', function (req, res, next) {

// 添加管理员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.addAdmin(req.body.usloginname, req.body.usnickname, req.body.usloginpsw, (err, user) => {
        if (err) {
            res.send("error");
            console.log(err.error);
        }
        else {
            res.send(user);
            console.log('======= add Admin success.');
        }


    });
})


router.post('/updUser', function (req, res, next) {
    console.log(req.body.usloginpsw==""?null:req.body.usloginpsw);
// 修改用户
// 1：用户id，2：昵称，3：密码（为null不修改），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
    db.users.updateUser(req.body.usID, req.body.usnickname, req.body.usloginpsw==""?null:req.body.usloginpsw, (err) => {
        if (err) {
            res.send("error");
            console.log(err.error);

        }
        else {
            res.send('success');
            console.log('======= 更新用户成功.');
        }
    });

})


module.exports = router;
