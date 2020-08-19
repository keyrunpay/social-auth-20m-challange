const router = require("express").Router();
const authFacebook = require("./controllers/facebook");

router.get("/auth/facebook", authFacebook);

module.exports = router;
