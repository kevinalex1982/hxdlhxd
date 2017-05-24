/**
 * Created by kevin on 2016/10/17.
 */

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert'),
    http = require("http"),
    url = require("url"),
    dbCur,
    path = require("path");

exports.ConnectToMongoDB =function (database) {
// Connection URL
    var url = 'mongodb://192.168.10.66/' + database;
// Use connect method to connect to the Server
    MongoClient.connect(url, {
        db: {w: 1, native_parser: false},
        server: {
            poolSize: 5,
            socketOpations: {connectTimeoutMS: 500},
            auto_reconnect: true,
            socketOptions: {keepAlive: 1}

        },
        replSet: {},
        mongos: {}

    }, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        dbCur = db;
    });
}


exports.OperatToMongoDB = function (database, collection, operation, jsonstr, newjson, callback) {



        switch (operation) {
            case "insert": {
                insertDocuments(dbCur,collection,jsonstr,callback);
                //db.close();
                break;
            }
            case "query": {
                //console.log("start");
                findDocuments(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }
            case "queryByCurtime": {
                //console.log("start");
                findDocumentsByCurtime(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }
            case "query30": {
                //console.log("start");
                find30Documents(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }

            case "queryOne": {
                //console.log("start");
                findLastTimeOneDocument(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }
            case "queryOneXS": {
                //console.log("start");
                findOneXSDocument(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }

            case "queryOneQY": {
                //console.log("start");
                findOneQYDocument(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }

            case "queryOneByJson": {
                //console.log("start");
                findOneByJson(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }

            case "findonebycurtime": { /*等待修改*/
                //console.log("start");
                findOneDocument(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }
            case "delete": {
                deleteDocument(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }
            case "deletes": {
                //console.log('danteng');
                deleteDocuments(dbCur, collection, jsonstr, callback);
                //db.close();
                break;
            }

            case "update": {
                break;
            }
        }


}

var insertDocuments = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents
    collection.insertOne(jsonstr, function (err, result) {
        if (err) {
            console.log("insert into collection error:" + err.toString());
            callback(err);
        }
        console.log("insert into collection");
        callback(result);
    });
}

var findDocuments = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    console.log('find');
    console.log(jsonstr);
    collection.find(jsonstr).sort({"_id": -1}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        console.log(docs);
        callback(docs);
    });
}

var findDocumentsByCurtime = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    console.log('findByCurtime');
    console.log(jsonstr);
    collection.find(jsonstr).sort({"curtime": -1}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        console.log(docs);
        callback(docs);
    });
}

var find30Documents = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    console.log('find');
    console.log(jsonstr);
    collection.find(jsonstr).sort({"_id": -1}).limit(30).sort({"_id": 1}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        console.log(docs);
        callback(docs);
    });
}

var findLastTimeOneDocument = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.find(jsonstr).sort({"curtime":-1}).limit(1).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        callback(docs);
    });
}

var findOneXSDocument = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.find(jsonstr).sort({"starttime":-1}).limit(1).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        callback(docs);
    });
}


var findOneQYDocument = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.find(jsonstr).sort({"curdata":-1}).limit(1).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        callback(docs);
    });
}


var findOneDocument = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.find(jsonstr).sort({"_id": -1}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        callback(docs);
    });
}



var deleteDocument = function(db,collection,jsonstr, callback) {
    var bson = require('bson');
/*    var BSON = new bson.BSONPure.BSON(); */
    var obj_id = bson.ObjectID.createFromHexString(jsonstr._id);
    //console.log(obj_id);
    var jssson ={'_id':obj_id};
    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents

    collection.deleteOne(jssson, function(err, result) {
        callback(result);
    });
}


var deleteDocuments = function(db,collection,jsonstr, callback) {
    var bson = require('bson');
    /*    var BSON = new bson.BSONPure.BSON(); */

    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents
console.log('deletejson');
    console.log(jsonstr);
    collection.deleteMany(jsonstr, function(err, result) {
        callback(result);
    });
}


var findOneByJson = function (db, collection, jsonstr, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.find(jsonstr).limit(1).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            callback(err);
        }
        //console.log("Found the following records");
        // console.dir(docs);
        callback(docs);
    });
}

