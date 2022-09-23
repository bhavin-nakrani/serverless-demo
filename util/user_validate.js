const db = require("../models");

const getUserDetails = (claims) => {
  var name = claims.name;
  var email = claims.email;
  var username = claims["cognito:username"];
  var user_type = claims["custom:user_type"];
  // Note there is some data mis match between user table and cognito
  return new Promise((resolve, reject) => {
    var query =
      "SELECT u.id AS user_id, u.user_type, u.email, u.username, u.name, CASE WHEN u.user_type = " +
      db.USER_TYPE_BACKEND +
      " THEN 'BACKEND' WHEN u.user_type = " +
      db.USER_TYPE_CONTRACTOR +
      " THEN 'CONTRACTOR' WHEN u.user_type = " +
      db.USER_TYPE_PROPERTY_OWNER +
      " THEN 'PROPERTY_OWNER' ELSE 'GUEST' END AS user_type_name FROM `Users` AS u WHERE u.email = '" +
      email +
      // "' AND u.username = '" +
      // username +
      // "' AND u.user_type = '" +
      // user_type +
      "' AND u.status = 1 LIMIT 1";
    console.log("query === ", query);  
    db.pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      //console.log("user validation query:" + query);
      let objArray = JSON.stringify(results);
      console.log("login user details: " + objArray);
      let result = JSON.parse(objArray)[0];
      return resolve(result);
    });
  });
};

module.exports = { getUserDetails };
