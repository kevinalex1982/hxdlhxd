/**
 * Created by Administrator on 2016/11/18.
 */
/**
 * 获取文件夹下面的所有的文件(包括子文件夹)
 * @param {String} dir
 * @param {Function} callback
 * @returns {Array}
 */
var fs = require('fs');
exports.getAllFiles = function (dir, callback) {

//我的文件夹名称是20，下面有多个文件，先读取所有的文件
    fs.readdir('../views/clients/photo/' + dir, function (err, files) {
        if (err) {
            callback(err);
        }
        else {
            callback(files);
        }

    });
}