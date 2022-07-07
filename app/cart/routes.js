const router = require("express").Router();
const { police_check } = require("../../middlewares/index");
const { index, update } = require("./controller");

router.get("/carts", police_check("read", "Cart"), index);
router.put("/carts", police_check("update", "Cart"), update);

module.exports = router;
