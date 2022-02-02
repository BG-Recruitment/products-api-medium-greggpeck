const Products = require("../models/products");

module.exports = {
	all: async (_, res) => {
		try {
			return res.status(200).json(
				await Products.findAll({
					order: [["id", "ASC"]],
				})
			);
		} catch (err) {
			console.error(err);
		}

		return res.status(500).json([]);
	},

	create: async ({ body }, res) => {
		body["isPublished"] = false;
		try {
			return res.status(201).json(await Products.create(body));
		} catch (err) {
			console.error(err);
			return res.status(500).json(err);
		}
	},

	patch: async ({ body, params }, res) => {
		try {
			const product = await Products.findOne({
				where: { id: params["id"] },
			});

			if (!product) {
				return res.status(400).send("NOT_FOUND");
			}

			const criteria1 = product.getDataValue("mrp") >= product.getDataValue("price");
			const criteria2 = product.getDataValue("stock") > 0;

			if (!criteria1 && criteria2) {
				return res.status(422).json(["MRP should be less than equal to the Price"]);
			}

			if (criteria1 && !criteria2) {
				return res.status(422).json(["Stock count is 0"]);
			}

			if (!criteria1 && !criteria2) {
				return res.status(422).json(["MRP should be less than equal to the Price", "Stock count is 0"]);
			}

			await product.update({ isPublished: true });
			return res.status(204).send("");
		} catch (err) {
			console.error(err);
			return res.status(500).json(err);
		}
	},

	notAllow: (_, res) => {
		return res.status(405).send("");
	},
};
