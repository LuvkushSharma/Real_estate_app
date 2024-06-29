const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A property must have a title']
  },
  description: {
    type: String,
    required: [true, 'A property must have a description']
  },
  price: {
    type: Number,
    required: [true, 'A property must have a price']
  },
  location: {
    type: String,
    required: [true, 'A property must have a location']
  },
  
  photo: String,
  propertyType: {
    type: String,
    required: [true, 'A property must have a type'],
    enum: ['House', 'Apartment', 'Condo'],
    message: 'Property type must be House, Apartment, or Condo'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  agent: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A property must belong to an agent']
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
