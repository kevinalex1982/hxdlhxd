
var games = require('./games_data.js');
var tasks = require('./task_data.js');
var progresses = require('./progress_data.js');
var db = require('../');

exports.all_games = (pageIndex, pageCount, userid, callback) => {

  var matchedGames = games.filter((game) => {
    return game.userid == userid;
  });

  var sliceStart = (pageIndex - 1) * pageCount;
  var sliceEnd = sliceStart + pageCount;

  var data = {
    total: matchedGames.length,
    pageIndex: pageIndex,
    pageCount: pageCount
  };

  var gamesSliced = matchedGames.slice(sliceStart, sliceEnd);

  var arr = [];
  gamesSliced.forEach((game) => {
    var u = null;
    db.users.single_user(game.userid, (err, user) => {
      if (err == null) {
        u = user;
      } else {
        u = { usname: "", nickname: ""};
      }

      arr.push({
        id: game.id,
        userid: game.userid,
        usname: u.usname,
        nickname: u.nickname,
        gnickname: game.gnickname,
        content: game.content,
        tbdd: game.tbdd,
        addtime: game.addtime,
        status: game.status
      });
    });
  });

  data.games = arr;
  callback(null, data);
};

exports.addGame = (userid, gnickname, content, tbdd, callback) => {
  var id = 1;
  if (games.length > 0) id = games[games.length - 1].id + 1;

  games.push(
    {
      id: id,
      userid: userid,
      gnickname: gnickname,
      content: content,
      tbdd: tbdd,
      addtime: new Date().toLocaleString(),
      status: 0
    }
  );

  callback(null);
};

exports.updateGame = (id, userid, gnickname, content, tbdd, callback) => {
  var game = games.filter((game) => {
    return game.id == id;
  });

  if (game == null || game.length == 0) {
    callback({error: "game not found!"});
    return;
  }

  game[0].userid = userid;
  game[0].gnickname = gnickname;
  game[0].content = content;
  game[0].tbdd = tbdd;
  callback(null);
};

exports.delGame = (id, callback) => {
  var game = games.filter((game) => {
    return game.id == id;
  });

  if (game == null || game.length == 0) {
    callback({error: "game not found!"});
    return;
  }

  games.splice(games.indexOf(game[0]), 1);

  // TODO:删除所有任务

  callback(null);
};

exports.updateGameStatus = (id, status, callback) => {
  var game = games.filter((game) => {
    return game.id == id;
  });

  if (game == null || game.length == 0) {
    callback({error: "game not found!"});
    return;
  }

  game[0].status = status;
  callback(null);
};

exports.addtask = (gameid, tasktitle, taskcontent, callback) => {

  var game = games.filter((game) => { return game.id == gameid; });
  if (game == null || game.length == 0) {
    callback({error: "game not found!"});
    return;
  }

  var id = 1;
  if (tasks.length != 0) id = tasks[tasks.length - 1].id + 1;

  tasks.push({
    id: id,
    gid: game[0].id,
    title: tasktitle,
    content: taskcontent,
    addtime: new Date().toLocaleString(),
    status: 0
  });

  callback(null);
};

exports.gettasks = (gameid, callback) => {
  callback(null, tasks.filter((task) => {
    return task.gid == gameid;
  }));
};

exports.deltask = (taskid, callback) => {
  var task = tasks.filter((task) => {
    return task.id = taskid;
  })

  if (task == null || task.length == 0) {
    callback({error: "task not found!"});
    return;
  }

  tasks.splice(tasks.indexOf(task[0]), 1);
  //TODO: 删除进度

  callback(null);
};

exports.updatetask = (taskid, title, content, callback) => {
  var task = tasks.filter((task) => {
    return task.id = taskid;
  })

  if (task == null || task.length == 0) {
    callback({error: "task not found!"});
    return;
  }

  task[0].title = title;
  task[0].content = content;

  callback(null);
};

exports.changeTaskStatus = (taskid, status, callback) => {
  var task = tasks.filter((task) => {
    return task.id = taskid;
  })

  if (task == null || task.length == 0) {
    callback({error: "task not found!"});
    return;
  }

  task[0].status = status;
  callback(null);
};

// 进度
exports.addprogress = (taskid, content, callback) => {

    var task = tasks.filter((task) => { return task.id == taskid; });
    if (task == null || task.length == 0) {
      callback({error: "task not found!"});
      return;
    }

    var id = 1;
    if (progresses.length != 0) id = progresses[progresses.length - 1].id + 1;

    progresses.push({
      id: id,
      taskid: task[0].id,
      content: content,
      addtime: new Date().toLocaleString()
    });

    callback(null);
};

exports.getprogresss = (taskid, callback) => {
  callback(null, progresses.filter((progress) => {
    return progress.taskid == taskid;
  }));
};

exports.updateprogresss = (id, content, callback) => {
  var progress = progresses.filter((progress) => {
    return progress.id = id;
  })

  if (progress == null || progress.length == 0) {
    callback({error: "progress not found!"});
    return;
  }

  progress[0].content = content;
  callback(null);
};

exports.delprogress = (id, callback) => {
  var progress = progresses.filter((progress) => {
    return progress.id = id;
  })

  if (progress == null || progress.length == 0) {
    callback({error: "progress not found!"});
    return;
  }

  progresses.splice(progresses.indexOf(progress[0]), 1);
  callback(null);
};
