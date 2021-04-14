
require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sha1 = require("js-sha1");
//const Hash = require("../models/Hash");
const db = require('../db');
//const pool = require("../config/mysqlDB");

var redis = require("redis");
// Connect to redis
// var redisHost = "redis-14939.c228.us-central1-1.gce.cloud.redislabs.com";
// var redisPort = 14939;
let redisHost = "redis-18082.c228.us-central1-1.gce.cloud.redislabs.com";
let redisPort = 18082;
// let redisHost = "127.0.0.1";
// let redisPort = 6379;
var redisPass = "60jawb69lAsmqS23ByzLVhUHm1t8IAVN";
// var redisPass = "Finch@2020";
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

// Authentication for redis server
redisClient.auth(redisPass, function (err, respose) {
  if (err) {
    console.log(err);
  }
});

const apiKey = process.env.ACCESS_TOKEN_SECRET;
console.log(apiKey);
/* set redis token */
var setRedis = function setToken(body) {
  console.log("redis set email:-", body.email);
  // Defining the details to be encoded in the key
  var payload = { role: body.role, email: body.email };
  console.log("payload", payload);
  // Putting a secret key in the payload
  const tokenId = jwt.sign(payload, apiKey);
  console.log("redis new token id", tokenId);
  console.log("Hashed val - " + sha1(tokenId));

  const reqData = [sha1(tokenId), tokenId, body.email];
  var postQuery = "INSERT INTO hash VALUES($1,$2,$3)";
  pool.query(postQuery, reqData).then((result) => console.log(result));

  // Create a hash value of the redis key
  // Hash.create({
  //   hash: sha1(tokenId),
  //   token: tokenId,
  //   email: body.email,
  // }).then((result) => console.log(result));
  redisClient.set(body.email, tokenId, (err, reply) => {
    console.log("Redis Set", reply);
  });
  // Use sha1 hash funtion to get the hash value of the token and send to the user
  return sha1(tokenId);
};

/* delete redis token */
var deleteRedis = function redisDelte(body) {
  console.log("redis del email:", body.email);
  // Get the redis token and delete it from the DB
  return redisClient.del(body.email, function (err, reply) {
    console.log("Redis Del");
  });
};

/* get redis token */
var getRedis = function getToken(body) {
  console.log("redis get email", body.email);
  // Get redis token based on the email
  redisClient.get(body.email, function (err, reply) {
    console.log("Redis Get::", reply);
    return reply;
  });
};
module.exports = {
  setRedis,
  deleteRedis,
  getRedis,
};
