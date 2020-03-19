/**
 * name : envVariables.js
 * author : Aman
 * created-date : 19-03-2020
 * Description : All required environment variables. 
*/


// Dependencies
let table = require("cli-table");

let cliTable = new table();

let enviromentVariables = {
  "HOST" : {
    "message":"Required host name",
    "optional": false
  },
  "PORT" : {
    "message" : "Required port number",
    "optional" : false
  },
  "LOG" : {
    "message" : "Required logger type",
    "optional" : false
  },
  "NODE_ENV" : {
    "message" : "Required node environment",
    "optional" : false
  },
  "ENABLE_BUNYAN_LOGGING" : {
    "message" : "Enable or disable bunyan logging",
    "optional" : false
  },
  "APPLICATION_BASE_URL" : {
    "message" : "Required Application base url",
    "optional" : false
  },
  "AUTHORIZATION" : {
    "message" : "Required Server authorization code",
    "optional" : false
  },
  "MONGODB_URL" : {
    "message" : "Required mongodb url",
    "optional" : false
  },
  "APPLICATION_BASE_HOST" : {
    "message" : "Required Base host",
    "optional" : false
  },
  "SHIKSHALOKAM_BASE_HOST" : {
    "message" : "Required shikshalokam base host",
    "optional" : false
  },
  "DB" : {
    "message" : "Required database name",
    "optional" : false
  },
  "INTERNAL_ACCESS_TOKEN" : {
    "message" : "Required internal access token",
    "optional" : false
  },
  "sunbird_keycloak_auth_server_url" : {
    "message" : "Required sunbird keycloak auth server url",
    "optional" : false
  },
  "sunbird_keycloak_realm" : {
    "message" : "Required sunbird keycloak realm",
    "optional" : false
  },
  "sunbird_keycloak_client_id" : {
    "message" : "Required sunbird keycloak client id",
    "optional" : false
  },
  "sunbird_keycloak_public" : {
    "message" : "Required sunbird keycloak public",
    "optional" : false
  },
  "sunbird_cache_store" : {
    "message" : "Required sunbird cache store",
    "optional" : false
  },
  "sunbird_cache_ttl" : {
    "message" : "Required sunbird cache ttl",
    "optional" : false
  },
  "MIGRATION_COLLECTION" : {
    "message" : "Required migrations collection name",
    "optional" : false
  },
  "MIGRATION_DIR" : {
    "message" : "Required migrations directory name",
    "optional" : false
  },
  "SLACK_COMMUNICATIONS_ON_OFF" : {
    "message" : "Enable/Disable slack communications",
    "optional" : false
  },
  "SLACK_EXCEPTION_LOG_URL" : {
    "message" : "Enable/Disable slack exception log url",
    "optional" : false
  },
  "SLACK_TOKEN" : {
    "message" : "Required slack token",
    "optional" : false
  },
  "DISABLE_LEARNER_SERVICE_ON_OFF" : {
    "message" : "Disable learner service",
    "optional" : false
  },
  "BODY_PARSER_LIMIT" : {
    "message" : "Required body parser limit",
    "optional" : false
  },
  "PUBLIC_FOLDER_PATH" : {
    "mesage" : "Required public folder path",
    "optional" : false
  },
  "LOGGER_DIRECTORY" : {
    "mesage" : "Required logger directory name",
    "optional" : false
  }
}

let success = true;

module.exports = function() {
  Object.keys(enviromentVariables).forEach(eachEnvironmentVariable=>{
  
    let tableObj = {
      [eachEnvironmentVariable] : ""
    };
  
    if( !(process.env[eachEnvironmentVariable]) && !(enviromentVariables[eachEnvironmentVariable].optional)) {
      success = false;

      if(enviromentVariables[eachEnvironmentVariable] && enviromentVariables[eachEnvironmentVariable].message !== "") {
        tableObj[eachEnvironmentVariable] = 
        enviromentVariables[eachEnvironmentVariable].message;
      } else {
        tableObj[eachEnvironmentVariable] = "required";
      }
    } else {

      tableObj[eachEnvironmentVariable] = "success";
      if(enviromentVariables[eachEnvironmentVariable].optional) {
        tableObj[eachEnvironmentVariable] = enviromentVariables[eachEnvironmentVariable].message;
      }
      
    }

    cliTable.push(tableObj);
  })

  log.info(cliTable.toString());

  return {
    success : success
  }
}


