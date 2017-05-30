var express = require('express');
var router = express.Router();
var getImages = require('../models/imgList');
var getDataG = require('../models/DataFromMongo');
var db = require('../models/dbapi');
var moment = require('moment');

/* GET home page. */


router.get('/', function (req, res, next) {
    res.render('index.html');

});

router.post('/checkuserhxdl', function (req, res, next) {
    //console.log(req.body.username);
    //console.log(req.body.password);
    db.users.checkUserPwd(req.body.username, req.body.password, (err, user) => {
        if (err) {
            console.log('err');
            res.render('index', {loginstatus: '登录失败', username: req.body.username});
            return;
        }
        console.log(user);

        var clientipaddress = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        if (clientipaddress.substr(0, 7) == "::ffff:") {
            clientipaddress = clientipaddress.substr(7)
        }


        moment.locale('zh-cn');

        console.log(moment().format('lll'));


        // 更新用户上次登录时间
// 1. userid
// 2. 回调，err如果成功为null，否则表示失败。属性error表示错误描述。
        db.users.updateUserLastTime(user.id, (err) => {
            if (err) {
                console.log(err);

                // 更新用户上次登录IP
                // 1. userid
                // 2. 新的IP
                // 3. 回调，err如果成功为null，否则表示失败。属性error表示错误描述。
                db.users.updateUserLastIp(user.id, clientipaddress, (err) => {
                    if (err) {

                    }
                    user.lasttime = moment().format('lll');
                    user.last_login_ip = clientipaddress;
                    res.render('main', {user: user});
                    console.log("update last ip success!");
                });

                return;
            }
            console.log("update last time success!");

            // 更新用户上次登录IP
            // 1. userid
            // 2. 新的IP
            // 3. 回调，err如果成功为null，否则表示失败。属性error表示错误描述。
            db.users.updateUserLastIp(user.id, clientipaddress, (err) => {
                if (err) {

                }
                user.lasttime = moment().format('lll');
                user.last_login_ip = clientipaddress;
                res.render('main', {user: user});
                console.log("update last ip success!");
            });

        });


    });


});


router.get('/getValueNAEIO', function (req, resH, next) {
    //发送Get请求
    var http = require('http');
    var options = {
        hostname: '192.168.10.66',
        port: 4000,
        path: '/?QueryBy=3&QueryContent=NAEIO.FCBLocalApplicationYH&ForceUpdate=true',
        method: 'GET'
    }
    var dataVal;
//创建请求
    var req = http.request(options, function (res) {
        /*console.log('STATUS:' + res.statusCode);
         console.log('HEADERS:' + JSON.stringify(res.headers));*/
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            /*  console.log('数据片段分隔-----------------------\r\n');
             console.log(chunk);*/
            resH.send(chunk);
        });
        res.on('end', function () {
            /*console.log('响应结束********');*/
        });
    });
    req.on('error', function (err) {
        resH.send(err);
        console.error(err);
    });

    req.end();

});


router.post('/dataTest', function (req, res, next) {
    console.log(req.body);
    var jsondatatest = {
        data: [
            {
                id: 1,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"

            },
            {
                id: 2,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 3,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 4,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 5,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 6,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 7,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 8,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 9,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 10,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 11,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 12,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 13,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 14,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 15,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 16,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 17,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 18,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 19,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 20,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            },
            {
                id: 21,
                login_name: "leo",
                nick_name: "昵称",
                pwd: "hashed_password",
                role: 1,
                // 1：管理员，2：团长，3：团员
                reg_time: "yyyy-MM-dd HH:mm:ss",
                last_time: "yyyy-MM-dd HH:mm:ss",
                last_login_ip: "111.222.123.213"
            }
        ],
        "iTotalDisplayRecords": "21",
        "iTotalRecords": "21",
        "message": "success"
    }
    res.send(jsondatatest);


});


router.get('/getValueNAEProgram', function (req, resH, next) {
    //发送Get请求
    var http = require('http');
    var options = {
        hostname: '192.168.10.66',
        port: 4000,
        path: '/?QueryBy=3&QueryContent=NAEProgram.Programming&ForceUpdate=true',
        method: 'GET'
    }
    var dataVal;
//创建请求
    var req = http.request(options, function (res) {
        /*    console.log('STATUS:' + res.statusCode);
         console.log('HEADERS:' + JSON.stringify(res.headers));*/
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            /*    console.log('数据片段分隔-----------------------\r\n');
             console.log(chunk);*/
            resH.send(chunk);
        });
        res.on('end', function () {
            /* console.log('响应结束********');*/
        });
    });
    req.on('error', function (err) {
        resH.send(err);
        console.error(err);
    });

    req.end();

});
router.get('/getValueQTYW', function (req, resH, next) {
    //发送Get请求
    var http = require('http');
    var options = {
        hostname: '192.168.10.66',
        port: 4000,
        path: '/?QueryBy=3&QueryContent=QTYW.FCBLocalApplication&ForceUpdate=true',
        method: 'GET'
    }
    var dataVal;
//创建请求
    var req = http.request(options, function (res) {
        /*  console.log('STATUS:' + res.statusCode);
         console.log('HEADERS:' + JSON.stringify(res.headers));*/
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            /*    console.log('数据片段分隔-----------------------\r\n');
             console.log(chunk);*/
            resH.send(chunk);
        });
        res.on('end', function () {
            /*   console.log('响应结束********');*/
        });
    });
    req.on('error', function (err) {
        resH.send(err);
        console.error(err);
    });

    req.end();

});


/*router.post('/file/uploading', function (req, res, next) {
 //生成multiparty对象，并配置上传目标路径
 var form = new multiparty.Form({uploadDir: './public/files/'});
 //上传完成后处理
 form.parse(req, function (err, fields, files) {
 var filesTmp = JSON.stringify(files, null, 2);

 if (err) {
 console.log('parse error: ' + err);
 } else {
 console.log('parse files: ' + filesTmp);
 var inputFile = files.inputFile[0];
 var uploadedPath = inputFile.path;
 var dstPath = './public/files/' + inputFile.originalFilename;
 //重命名为真实文件名
 fs.rename(uploadedPath, dstPath, function (err) {
 if (err) {
 console.log('rename error: ' + err);
 } else {
 console.log('rename ok');
 }
 });
 }
 res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
 res.write('received upload:\n\n');
 res.end(util.inspect({fields: fields, files: filesTmp}));
 });
 });*/


router.post('/loginYQ', function (reqH, resH, next) {

    var http = require('http');
    var querystring = require('querystring');
//json转换为字符串
    var postData = querystring.stringify({
        username: "admin",
        password: "bg51283883"
    });
    var options = {
        hostname: 'yndzj.yqjcxt.cn',
        path: '/zebra_alpha/logon.xml.do',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }
    var dataVal;
//创建请求
    var req = http.request(options, function (res) {
        /*    console.log('STATUS:' + res.statusCode);
         console.log('HEADERS:' + JSON.stringify(res.headers));*/
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            /*     console.log('数据片段分隔-----------------------\r\n');
             console.log(chunk);*/
            console.log(chunk)
            resH.send(chunk);
        });
        res.on('end', function () {
            console.log('响应结束********');
        });
    });
    req.on('error', function (err) {
        resH.send(err);
        console.error(err);
    });
    console.error('here');
    req.write(postData);
    req.end();
    /*  var request = require('request');

     request(
     'http://yndzj.yqjcxt.cn/zebra_alpha/logon.xml.do',
     {json:{
     username: "admin",
     password: "bg51283883"
     } },
     function (error, response, body) {
     console.log(error);
     console.log(response.statusCode);
     if (!error && response.statusCode == 200) {
     console.log(body)
     }
     else
     {
     console.log(error);
     console.log(response.statusCode);
     }
     }
     );*/


});

router.post('/GetYQ', function (reqH, resH, next) {

    var http = require('http');
    var querystring = require('querystring');
//json转换为字符串
    var postData = '<?xml version="1.0" encoding="UTF-8" ?>' +
        '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">' +
        '<soap:Header><context xmlns="urn:zimbra">' +
        '<userAgent name="ZimbraWebClient - SAF3 (Win)"/>' +
        '<session/>' +
        '<format type="js"/>' +
        '</context>' +
        '</soap:Header>' +
        '<soap:Body>' +
        '<FolderRequest xmlns="urn:benguoShrewd">' +
        '<search xmlns="" dispatch="listFolderArticles" npagecount="15"  f_folder_id="24924" npage="0" f_parent_id="5" match="2" curr_page="0" day="7" >' +
        '</search>' +
        '</FolderRequest>' +
        '</soap:Body>' +
        '</soap:Envelope>';
    var options = {
        hostname: 'yndzj.yqjcxt.cn',
        path: '/zebra_alpha/soap',
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
            'Content-Length': Buffer.byteLength(postData)
        }
    }
    var dataVal;
//创建请求
    var req = http.request(options, function (res) {
        /*    console.log('STATUS:' + res.statusCode);
         console.log('HEADERS:' + JSON.stringify(res.headers));*/
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            /*     console.log('数据片段分隔-----------------------\r\n');
             console.log(chunk);*/
            console.log(chunk)
            resH.send(chunk);
        });
        res.on('end', function () {
            console.log('响应结束********');
        });
    });
    req.on('error', function (err) {
        resH.send(err);
        console.error(err);
    });
    console.error('here');
    req.write(postData);
    req.end();
    /*  var request = require('request');

     request(
     'http://yndzj.yqjcxt.cn/zebra_alpha/logon.xml.do',
     {json:{
     username: "admin",
     password: "bg51283883"
     } },
     function (error, response, body) {
     console.log(error);
     console.log(response.statusCode);
     if (!error && response.statusCode == 200) {
     console.log(body)
     }
     else
     {
     console.log(error);
     console.log(response.statusCode);
     }
     }
     );*/


});


router.post('/GetYQBy', function (reqH, resH, next) {

    var http = require('http');
    var querystring = require('querystring');
//json转换为字符串
    var postData = '<?xml version="1.0" encoding="UTF-8" ?>' +
        '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"><soap:Header><context xmlns="urn:zimbra"><userAgent name="ZimbraWebClient - SAF3 (Win)"/><session/><format type="js"/></context></soap:Header><soap:Body><NewsearchRequest xmlns="urn:benguoShrewd"><search xmlns="" dispatch="xSearch" querytext="土豆" pageSize="15" page="0" total="0" days="7" sortfield="pubdate"> </search></NewsearchRequest></soap:Body></soap:Envelope>';
    var options = {
        hostname: 'yndzj.yqjcxt.cn',
        path: '/zebra_alpha/soap',
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
            'Content-Length': Buffer.byteLength(postData)
        }
    }
    var dataVal;
//创建请求
    var req = http.request(options, function (res) {
        /*    console.log('STATUS:' + res.statusCode);
         console.log('HEADERS:' + JSON.stringify(res.headers));*/
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            /*     console.log('数据片段分隔-----------------------\r\n');
             console.log(chunk);*/
            console.log(chunk)
            resH.send(chunk);
        });
        res.on('end', function () {
            console.log('响应结束********');
        });
    });
    req.on('error', function (err) {
        resH.send(err);
        console.error(err);
    });
    console.error('here');
    req.write(postData);
    req.end();


});

module.exports = router;
