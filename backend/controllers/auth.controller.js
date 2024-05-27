const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, role, userName } = req.body;

  // hash the password
  const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(15);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.log("Error hashing the password: ", error);
    }
  };

  const hashedPassword = await hashPassword(password);

  try {
    // check if user exists with the email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ status: "error", error: "Email already exists" });
    }

    // create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      userName,
    });
    await user.save();
    await User.findById(user._id);

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({ status: "user added", token });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: "not found", error: "No User Found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ status: "wrong password", error: "Invalid Password" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({ status: "success", token });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      return res.json({ status: "error", error: "User not found" });
    }

    res.json({ status: "success", message: "User deleted" });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { register, login, authenticateToken, deleteUser };
