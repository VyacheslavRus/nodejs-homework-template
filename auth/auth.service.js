const { Conflict, NotFound, Forbidden } = require("http-errors");
const { UserModel } = require("../users/user.model");
const jwt = require("jsonwebtoken");

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
}

exports.authService = new AuthService();
