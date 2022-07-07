const router = require("express").Router();
const { index, store } = require("./controller");
const { police_check } = require("../../middlewares/index");

router.post("/orders", police_check("create", "Order"), store);
router.get("/orders", police_check("view", "Order"), index);

module.exports = router;
