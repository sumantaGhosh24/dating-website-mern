const express = require("express");

const messageCtrl = require("../controllers/messageCtrl");

const router = express.Router();

router.get("/message", messageCtrl.getMessage);

router.post("/message", messageCtrl.addMessage);

module.exports = router;
