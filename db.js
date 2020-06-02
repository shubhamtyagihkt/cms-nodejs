var config = require('./config');

var mysql = require('mysql')
  , async = require('async')

var PRODUCTION_DB = process.env.DBNAME || config.dbname;

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: process.env.DBHOST || config.dbhost,
    user: process.env.DBUSER || config.dbuser ,
    password: process.env.DBPWD || config.dbpwd ,
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  });

  state.pool.getConnection(function(err,connection){
    if (err) {
     //connection.release();
     return done({"code" : 100, "status" : "Error in connection database"});
    }   

    console.log('connected as id ' + connection.threadId);

    connection.query("show tables",function(err,rows){
       if(!err) {
           connection.release();
           console.log(rows);
       }           
    });

    connection.on('error', function(err) {      
         return done({"code" : 100, "status" : "Error in connection database"});   
    });
  });

  //console.log(state.pool)
  state.mode = mode
  done()
}


exports.get = function() {
  return state.pool
}

exports.fixtures = function(data) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}