const User = require("../models/user.model");

const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      name: user.name,
      userName: user.userName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toDateString(),
    });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
};

module.exports = { userDetails };
