
const path = require("path");
const Property = require(path.join(__dirname, "/../models/property.model"));

exports.createProperty = async (req, res) => {

  console.log('createProperty called');
  console.log(req.body);
  
  try {
    const propertyData = {
      ...req.body,
      price: Number(req.body.price),
      agent: req.user.id ,
      photo: req.body.imageUrl,
      propertyType: req.body.propertyType,
    };

    const property = await Property.create(propertyData);

    res.status(201).json({
      status: "success",
      data: property,
    });

  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      status: "success",
      data: properties,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
