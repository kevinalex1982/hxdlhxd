
var users_memdb = require('./users');
var users_rethinkdb = require('./users_rethinkdb');

var games_memdb = require('./games');
var games_rethinkdb = require('./games_rethinkdb');

// default to memdb
var userdbapi = users_memdb;
var gamedbapi = games_memdb;


exports.users =  users_memdb;
exports.games = games_memdb;

exports.useMemDb = ()=> {
    console.log('use memdb');
    exports.users = users_memdb;
    exports.games = games_memdb;
};

exports.useRethinkDb = ()=>{
    console.log('use rethinkdb');
    exports.users = users_rethinkdb;
    exports.games = games_rethinkdb;
};
