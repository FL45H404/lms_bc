const express = require("express");

// defining application access to different roles
module.exports = {
    employee: ["/"],
    admin: ["/"],
    manager: ["/"]
};