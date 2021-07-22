const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { UserModel } = require("../users/user.model");
const { asyncWrapper } = require("./async-wrapper");

exports.authorize = asyncWrapper(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(payload.id);
    if (!user) {
      throw new Unauthorized();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(new Unauthorized());
  }
});
