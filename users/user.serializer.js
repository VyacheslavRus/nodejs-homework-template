function prepareUser(user) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  };
}

exports.prepareUser = prepareUser;
