
var games = require('./games_data.js');

exports.all_games = (callback) => {

  callback(null, games);

};
