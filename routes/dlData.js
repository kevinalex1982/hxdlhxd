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
// 1：页号，从1开始，2：每页记录条数，3：回调，err如果成功为null，否则表示失败。属性error表示错误描述。users对应的用户信息
    db.users.all_users(req.body.start+1, req.body.length, (err, users) => {
        if (err) {
            console.log(err.error);
            return;
        };
        console.log(users);
        var jsonSend={data:users.users,"iTotalDisplayRecords":users.usersCount,
            "iTotalRecords": users.usersCount,
            "message": "success" };
        res.send(jsonSend);
    });
});

module.exports = router;
