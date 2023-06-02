const express = require("express");

const userCtrl = require("../controllers/userCtrl");

const router = express.Router();

router.get("/user", userCtrl.individualUser);

router.put("/addmatch", userCtrl.addMatch);

router.get("/users", userCtrl.getAllUsers);

router.get("/gendered-users", userCtrl.getGenderedUsers);

router.put("/user", userCtrl.updateUser);

module.exports = router;
