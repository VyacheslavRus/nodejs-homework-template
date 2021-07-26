const { Conflict, NotFound, Forbidden, Unauthorized } = require("http-errors");
const { UserModel } = require("../users/user.model");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { extname } = require("path");
const Jimp = require("jimp");
const uuid = require('uuid')
const gravatar = require('gravatar')
const { promises: FsPromises } = require('fs')

const upload = multer({
  storage: multer.diskStorage({
    destination: "tmp",
    filename: (req, file, cb) => {
      const filename = uuid.v4() + extname(file.originalname);
      cb(null, filename);
    },
  }),
});

async function compressImage(req, res, next) {
  const file = await Jimp.read(req.file.path);
  const filePath = req.file.path.replace("tmp", "public/avatars");
  await file.resize(250, 250).quality(90).writeAsync(filePath);
  await FsPromises.unlink(req.file.path);
  req.file.destination = req.file.destination.replace(
    "tmp",
    "../public/avatars"
  );
  req.file.path = filePath;
  next();
}

class AuthService {
  async signUp(userCreateParams) {
    const { username, email, password } = userCreateParams;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict(`User with email '${email}' already exists`);
    }
    const newUser = await UserModel.create({
      username,
      email,
      passwordHash: await UserModel.hashPassword(password),
      avatarURL: gravatar.url(email, { s: 250, r: "pg", d: "mm" }), email, subscription
    });
    return newUser;
  }

  async signIn(signInParams) {
    const { email, password } = signInParams;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound(`User with email '${email}' already exists`);
    }
    const isPasswordCorrect = await UserModel.isPasswordCorrect(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Forbidden(`Provided password is wrong`);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_AT,
    });

    return { user, token };
  }

  async logout({ _id }) {
    await UserModel.findByIdAndUpdate(_id, { token: null }, { new: true });
  }

  async updateAvatar(req) {
    const { _id } = req.user
    const { filename } = req.file
    const update = await UserModel.findByIdAndUpdate(
      _id, { avatarURL: `http://localhost:3000/avatars/${filename}?s=250&r=pg&d=mm` },
      { new: true }
    )
    if (!update) {
      throw new Unauthorized(`User is not found`)
    }
    return update
  }
}

exports.upload = upload
exports.compressImage = compressImage
exports.authService = new AuthService();
