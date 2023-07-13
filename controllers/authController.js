import User from "../models/User.js";
import bcrypt from "bcryptjs";
import auth from "../utils/verifyToken.js";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, massage: "User not found" });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, massage: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    const token = auth.generateToken({ id: user._id, role: user.role });

    const expiresIn = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

    res.cookie("accessToken", token, {
      httpOnly: true,
      expires: expiresIn,
    }).status(200).json({ token, data: { ...rest }, role });

  } catch (err) {
    res.status(500).json({ success: false, massage: "Fail login" });
  }
};
