const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    throw new Error(error.message)
  }
};

module.exports = connectToDb;
