const express = require("express");
const controller = require("./controller");
const { controlValidation, controlValidationPath } = require("./vilidation");
const router = express.Router();

router.get("/", controller.listContactsCont);

router.get("/:contactId", controller.getContactByIdCont);

router.post("/", controlValidation, controller.postContactCont);

router.delete("/:contactId", controller.deleteContactCont);

router.patch("/:contactId", controlValidationPath, controller.patchContactCont);

router.patch(
  ":contactId/favorite",
  controlValidationPath,
  controller.patchFavoriteCont
);

module.exports = router;
