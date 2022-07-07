const { police_check } = require("../../middlewares/index");
const { index, store, update, destroy } = require("./controller");

const router = require("express").Router();

router.get(
	"/delivery-addresses",
	police_check("view", "DeliveryAddress"),
	index
);
router.post(
	"/delivery-addresses",
	police_check("create", "DeliveryAddress"),
	store
);
router.put("/delivery-addresses/:id", update);
router.delete("/delivery-addresses/:id", destroy);

module.exports = router;
