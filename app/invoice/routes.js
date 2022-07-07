const router = require("express").Router();
const { show } = require("./controller");

router.get("/invoices/:order_id", show);

module.exports = router;
