const { Router } = require("express");
const { signUpShchema, signInSchema } = require("./auth.schemes");
const { asyncWrapper } = require("../helpers/async-wrapper");
const { prepareUser } = require("../users/user.serializer");
const { validate } = require("../helpers/validate");
const { authService } = require("../auth/auth.service");
const { prepareUserWithToken } = require("./auth.serializer");

const router = Router();

router.post(
  "/sign-up",
  validate(signUpShchema),
  asyncWrapper(async (req, res, next) => {
    const user = await authService.signUp(req.body);
    return res.status(201).send(prepareUser(user));
  })
);

router.post(
  "/sign-in",
  validate(signInSchema),
  asyncWrapper(async (req, res, next) => {
    const userWithToken = await authService.signIn(req.body);
    return res.status(201).send(prepareUserWithToken(userWithToken));
  })
);

exports.authController = router;
