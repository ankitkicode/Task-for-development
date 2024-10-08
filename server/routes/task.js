const express = require("express");
const { CreateInventory, FindInventory, ScanInventory, Deleteinventory, EditInventory, findInventoryById, updateInventoryById, findUserInventory } = require("../controllers/taskController");
const upload = require("../multer");
const router = express.Router();
const {authenticatedUser} = require('../middlewares/authenticateUser')


// Create a new inventory item
router.post("/create-inventory",authenticatedUser, CreateInventory )
router.get("/find-inventory", FindInventory );
router.post("/scan-inventory", authenticatedUser, upload.single("qrImage"), ScanInventory);
router.delete('/delete/:id',authenticatedUser, Deleteinventory);
router.put('/edit-inventory/:id',authenticatedUser,EditInventory);
router.get('/find/:id',authenticatedUser,findInventoryById)
router.put('/update/:id',authenticatedUser,updateInventoryById);
router.get('/finduserinventory',authenticatedUser,findUserInventory);


module.exports = router;
