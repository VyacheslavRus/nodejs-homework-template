const { Router } = require("express");
const { authService, compressImage, upload } = require("../auth/auth.service");
const { asyncWrapper } = require("../helpers/async-wrapper");
const { authorize } = require("../helpers/authorize");
const { prepareUser } = require("./user.serializer");

const router = Router();

router.get("/me", authorize, (req, res, next) => {
  res.status(200).send(prepareUser(req.user));
});

router.post(
  "/logout",
  authorize,
  asyncWrapper(async (req, res, next) => {
    await authService.logout(req.user);
    res.status(204).json("User is logged out");
  })
);

router.patch(
  "/avatars",
  authorize,
  upload.single("avatar"),
  compressImage,
  async (req, res, next) => {
    const userAva = await authService.updateAvatar(req);
    return res.status(200).send(userAva);
  }
);

exports.usersController = router;
