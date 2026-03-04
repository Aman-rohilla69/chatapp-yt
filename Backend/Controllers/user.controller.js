import bcrypt from "bcryptjs";
import { User } from "../Models/user.model.js";
import createTokenAndSaveCookie from "../Jwt/generateToken.js";

const signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  try {
    console.log(fullName);
    //---------------Check all fields are not empty:----------------
    if (
      [fullName, email, password, confirmPassword].some(
        (field) => field?.trim() === "",
      ) // toh automatically true return krdega
    ) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already registered!" });
    }

    //------------Hashing the password:---------------

    const hashPassword = await bcrypt.hash(password, 10);

    //--------------Save in DB user details------------
    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      //--------------Generate Tokens:-----------------
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully!",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      });
    }
    console.log(newUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "User signup failed!\nInternal server error!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    //-------------Compare Password from DB:-----------------
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return res
        .status(400)
        .json({ error: "User email and password does not exists!" });
    }
    //----------------Create tokens:------------------
    createTokenAndSaveCookie(user._id, res);
    return res.status(200).json({
      message: "User logged in successfully!",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "User login failed!\nInternal server error! " });
  }
};

const logout = async (req, res) => {
  try {
    //--------------clear cookies/tokens when user logged out:-----------------
    await res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "User logout failed!\nInternal server error! " });
  }
};

const allUsers = async (req, res) => {
  try {
    const loggedInUser = await req.user._id; // mtlb logged in user ka id mil jayega req.user se, kyuki middleware se user details attach krdi hai req object me toh automatically req.user._id se logged in user ka id mil jayega...
    // iska matlab hai ki logged in user ko apne aap ko search (fetch) results me nahi dekhna chahiye, toh $ne operator se hum usko exclude krdege search results se... $ne means not equal to...
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in all users controller fetching! : ", error);
  }
};
export { signup, login, logout, allUsers };
