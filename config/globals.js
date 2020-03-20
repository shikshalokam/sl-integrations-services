/**
 * name : globals.js
 * author : Aman
 * Date : 20-03-2020
 * Description : All globals related information.
 */

// Dependencies

let fs = require("fs"),
  path = require("path"),
  requireAll = require("require-all");

gen = Object.assign(global, {});

module.exports = function () {
  var Log = require("log");
  global.log = new Log(global.config.log);
  
  global.async = require("async");
  global.ROOT_PATH = path.join(__dirname, '..')
  global.GENERIC_HELPERS_PATH = ROOT_PATH + "/generics/helpers"
  global.MODULES_BASE_PATH = ROOT_PATH + "/module"
  global._ = require("lodash");
  global.config = require(".");

  global.httpStatusCode = 
  require(ROOT_PATH + "/generics/http-status-codes");

  global.ENABLE_DEBUG_LOGGING = process.env.ENABLE_DEBUG_LOGGING || "ON";
  global.ENABLE_BUNYAN_LOGGING = process.env.ENABLE_BUNYAN_LOGGING || "ON";

  // boostrap all models
  global.models = requireAll({
    dirname: ROOT_PATH + "/models",
    filter: /(.+)\.js$/,
    resolve: function (Model) {
      return Model;
    }
  });

    // load schema files
    global.schemas = {};
    fs.readdirSync(ROOT_PATH + '/models/').forEach(function (file) {
      if (file.match(/\.js$/) !== null) {
        var name = file.replace('.js', '');
        global.schemas[name] = require(ROOT_PATH + '/models/' + file);
      }
    });

  // boostrap all controllers
  global.controllers = requireAll({
    dirname: ROOT_PATH + "/controllers",
    filter: /(.+)\.js$/,
    resolve: function (Controller) {
      return new Controller();
    }
  });

    // Load all message constants
    global.constants = {};
    
    fs.readdirSync(ROOT_PATH + "/generics/constants")
    .forEach(function (file) {
      if (file.match(/\.js$/) !== null) {
        let name = file.replace('.js', '');
        global.constants[name] = require(ROOT_PATH + "/generics/constants/" + file);
      }
    });

    var bunyan = require("bunyan");
    global.loggerObj = bunyan.createLogger({
      name: "foo",
      streams: [
        {
          type: "rotating-file",
          path: path.join(ROOT_PATH + "/logs/" + process.pid + "-all.log"),
          period: "1d", // daily rotation
          count: 3 // keep 3 back copies
        }
      ]
    });

};
