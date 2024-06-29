const express = require("express");
const path = require("path");

const authController = require(path.join(
  __dirname,
  "../controllers/authController"
));

const propertyController = require(path.join(
  __dirname,
  "../controllers/propertyController"
));

const router = express.Router();

router
  .route('/')
  .get(propertyController.getAllProperties)
  .post(authController.protect, authController.restrictTo('agent', 'admin', 'seller'), propertyController.createProperty);

router
  .route('/:id')
  .get(propertyController.getProperty)
  .patch(authController.protect, authController.restrictTo('agent', 'admin'), propertyController.updateProperty)
  .delete(authController.protect, authController.restrictTo('agent', 'admin'), propertyController.deleteProperty);

module.exports = router;