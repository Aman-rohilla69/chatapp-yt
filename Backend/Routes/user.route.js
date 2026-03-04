import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
} from "../Controllers/user.controller.js";
import secureRoute from "../Middlewares/secureRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers", secureRoute, allUsers);
export default router;
