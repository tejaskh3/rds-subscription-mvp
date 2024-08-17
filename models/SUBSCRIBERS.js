const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  number: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please fill a valid 10-digit number']
  },
  isSubscribed: {
    type: Boolean,
    default: true
  }
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
