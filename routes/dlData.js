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
    db.users.all_users(req.body.start+1, req.body.length,req.body.param.role, (err, users) => {
        if (err) {
            console.log(err.error);
            return;
        };
        console.log(users);
        var jsonSend={data:users.users,"iTotalDisplayRecords":users.total,
            "iTotalRecords": users.total,
            "message": "success" };
        res.send(jsonSend);
    });
});

module.exports = router;
