/*require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var redis = require("redis");
const db = require('../db');

let redisHost = "redis-18082.c228.us-central1-1.gce.cloud.redislabs.com";
let redisPort = 18082;
var redisPass = "60jawb69lAsmqS23ByzLVhUHm1t8IAVN";

var redisClient = redis.createClient({
  port: redisPort,
  host: redisHost,
});
redisClient.on("connect", function () {
  console.log("Redis plugged in.");
 
});
redisClient.on('error', function (err) {
  console.log('Something went wrong ' + err);
});
console.log("Hii");
// Authentication for the redis server
redisClient.auth(redisPass, function (err, respose) {
  if (err) {
    console.log(err);
  }
});

// getting the roles module for checking access
const role = require("../Roles/roles");
const { setRedis, deleteRedis, getRedis } = require("../controllers/redisServerController");

const apiKey = process.env.ACCESS_TOKEN_SECRET;
console.log("apiKey");
// passing token as x-auth-header on request headrr for each request
// check for valid token if invalid redirect to no access page
module.exports = function (req, res, next) {
  // Get the header from the request to read the auth token
  var hash = req.header("x-auth-header");
  console.log("hash" + hash);
  // Find the token in the DB

  let checkHashExist = "SELECT * FROM hash WHERE hash = $1";
  pool.query(checkHashExist, [hash]).then((result) => {
    console.log('result::' +result);
    console.log('result rows' +result.rows);
    console.log('result rows length::' +result.rows.length);
    if (result.rows.length == 0) {
      // If there is no token then throw error
      return res.status(400).json({
        error_code: "TOKEN_USED",
        error_message:
          "Access Denied: This email and password has been used to login to other device !",
      });
    }
    // If token is present
    console.log("result --" + result.token);
    token = result.token;
    console.log("token:-", token);
    if (!token)
      return res.status(401).send("Access Denied: No Token Provided!");
    try {
      // Get the decoded version of the token with all the data
      // Email and role
      const decoded = jwt.verify(token, apiKey);
      console.log("decoded", decoded);
      // provide access to the URLs based on the role
      redisClient.get(decoded.email, function (err, reply) {
        console.log("Redis Get ::", reply);
        if (reply == null) {
          return res
            .status(401)
            .send({ message: "Invalid token", status: "401" });
        } else {
          try {
            console.log(
              "hello  ",
              role[decoded.role].find(function (url) {
                console.log("base url", req.baseUrl);
                console.log("sub url", req.url);
                return url == req.baseUrl;
              })
            );
            if (
              role[decoded.role].find(function (url) {
                console.log("base url", req.baseUrl);
                console.log("sub url", req.url);
                return url == req.baseUrl;
              })
            ) {
              console.log("user", req.user);
              next();
            } else {
              console.log("inside else");
              return res.status(200).send({
                message:
                  "Access Denied: You dont have correct privilege to perform this operation",
                status: "200",
                returnUrl: "/noaccesspage",
              });
              //return res.status(401).send({message:'Access Denied: You dont have correct privilege to perform this operation',status:'401'});
            }
          } catch (error) {
            console.log("inside catch");
            return res.status(200).send({
              message:
                "Access Denied: You dont have correct privilege to perform this operation",
              status: "200",
              returnUrl: "/noaccesspage",
            });
            //return res.status(401).send({message:'Access Denied: You dont have correct privilege to perform this operation',status:'401'});
          }
        }
      });
    } catch (ex) {
      res.status(401).send({ message: "Invalid Token", status: "401" });
    }
  });
};
*/