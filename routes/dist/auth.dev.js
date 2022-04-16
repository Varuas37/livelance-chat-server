"use strict";

var _require = require("../controllers/userController"),
    login = _require.login,
    register = _require.register,
    getAllUsers = _require.getAllUsers,
    logOut = _require.logOut;

var router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
module.exports = router;