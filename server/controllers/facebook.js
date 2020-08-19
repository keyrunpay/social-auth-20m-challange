const socialAuthNp = require("social-auth-np");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jwt-then");

const authFacebook = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.status(401).json({ error: "code is required" });
    return;
  }

  const fb_auth_option = {
    client_id: process.env.FB_CLIENT_ID,
    client_secret: process.env.FB_CLIENT_SECRET,
    redirect_uri: process.env.FB_REDIRECT_URL,
    code,
  };

  try {
    const { data } = await socialAuthNp.getAccessToken(
      "facebook",
      fb_auth_option
    );
    const access_token = data.access_token;
    const response = await socialAuthNp.getUserInfo("facebook", access_token);

    const email = response.data.email;
    const isEmailExist = await User.findOne({ email }).lean();
    let user;
    if (isEmailExist) {
      user = isEmailExist;
    } else {
      const newUser = new User({
        name: response.data.first_name,
        ...response.data,
      });
      await newUser.save();
      user = newUser;
    }

    const token = await jwt.sign({ ...user, iat: Date.now() }, "csdgbdhgdh");

    res.json({
      token,
      user: user,
    });
  } catch (err) {
    res.status(401).json({ error: "Bad network or code" });
  }
};

module.exports = authFacebook;
