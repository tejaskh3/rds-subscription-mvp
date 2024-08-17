const mongoose = require("mongoose");

module.exports =  connectDB = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log("unable to connect with the databse", error);
    throw new Error("unable to connect DB", error);
  }
};
