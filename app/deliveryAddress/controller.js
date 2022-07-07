const { subject } = require("@casl/ability");
const { policyFor } = require("../../utils");
const DeliveryAddress = require("./model");

const index = async (req, res, next) => {
	try {
		const { skip = 0, limit = 10 } = req.query;
		const count = await DeliveryAddress.find({
			user: req.user._id,
		}).countDocuments();
		const deliveryAddress = await DeliveryAddress.find()
			.skip(skip)
			.limit(limit)
			.sort("-createdAt");
		return res.json({ data: deliveryAddress, count });
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}
		next(err);
	}
};

const store = async (req, res, next) => {
	try {
		const payload = req.body;
		let user = req.user;
		let deliveryAddress = new DeliveryAddress({ ...payload, user: user._id });
		await deliveryAddress.save();
		return res.json(deliveryAddress);
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}
		next(err);
	}
};

const update = async (req, res, next) => {
	try {
		const { _id, ...payload } = req.body;
		const { id } = req.params;

		let deliveryAddress = await DeliveryAddress.findById(id);
		const subjectAddress = subject("DeliveryAddress", {
			...deliveryAddress,
			user_id: deliveryAddress.user,
		});
		const policy = policyFor(req.user);
		if (!policy.can("update", subjectAddress)) {
			return res.json({
				error: 1,
				message: `You're not allowed to modify this resource`,
			});
		}

		deliveryAddress = await DeliveryAddress.findByIdAndUpdate(id, payload, {
			new: true,
		});
		return res.json(deliveryAddress);
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}
		next(err);
	}
};

const destroy = async (req, res, next) => {
	try {
		const { id } = req.params;
		const policy = policyFor(req.user);
		let deliveryAddress = await DeliveryAddress.findById(id);
		const subjectAddress = subject("DeliveryAddress", {
			...deliveryAddress,
			user_id: deliveryAddress.user,
		});
		if (!policy.can("delete", subjectAddress)) {
			return res.json({
				error: 1,
				message: `You're not allowed to delete this resource`,
			});
		}

		deliveryAddress = await DeliveryAddress.findByIdAndDelete(id);
		return res.json(deliveryAddress);
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}
		next(err);
	}
};

module.exports = { index, store, update, destroy };
