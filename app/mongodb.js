// link mongodb+srv://toko:<password>@cluster0.kphofst.mongodb.net/?retryWrites=true&w=majority

import mongoose from "mongoose";

// Assuming `MONGO_URI` is your MongoDB connection string
const MONGO_URI =
  "mongodb+srv://toko:toko@cluster0.kphofst.mongodb.net/?retryWrites=true&w=majority";

export const connectMongoDB = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // poolSize: 10, // Adjust this based on your needs
  });

  console.log("DB connection successful!");
};
