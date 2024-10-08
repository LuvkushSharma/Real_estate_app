const express = require("express");
const path = require("path");

const authController = require(path.join(
  __dirname,
  "../controllers/authController"
));

const userController = require(path.join(
  __dirname,
  "../controllers/userController"
));

const paymentController = require(path.join(
  __dirname,
  "../controllers/paymentController"
));

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/checkAuth").get(authController.isLoggedIn);

router.route("/profile").get(authController.protect, userController.getUser);
router
  .route("/deleteMe")
  .delete(authController.protect, authController.deleteMe);


router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router.route("/contact").post(authController.contactUs);


router.route("/pay").post(authController.protect, paymentController.pay);


module.exports = router;
