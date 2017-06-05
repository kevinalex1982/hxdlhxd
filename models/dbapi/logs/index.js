
var logs = [];

exports.addlog = (type, userid, content, ip, callback) => {
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
};

exports.getlogs = (pageIndex, pageCount, userid, callback) => {
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
};
