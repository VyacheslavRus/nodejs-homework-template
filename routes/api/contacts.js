const express = require("express");
const сontroller = require("../controller");
const { controlValidation, controlValidationPath } = require("./vilidation");
const router = express.Router();

router.get("/", сontroller.listContactsCont);

router.get("/:contactId", сontroller.getContactByIdCont);

router.post("/", controlValidation, сontroller.postContact);
router.delete("/:contactId", сontroller.deleteContact);

router.patch("/:contactId", controlValidationPath, сontroller.patchContact);

module.exports = router;
