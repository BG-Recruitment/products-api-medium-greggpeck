const router = require("express").Router();
const controller = require("../controllers/products");

router
	//
	.get("/", controller.all)
	.post("/", controller.create)
	.patch("/:id", controller.patch)
    .put("/:id", controller.notAllow)
    .delete("/:id", controller.notAllow)
    
module.exports = router;
