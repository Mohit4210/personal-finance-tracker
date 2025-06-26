import mongoose from "mongoose";
// import User from "../../frontend/src/component/User";
// import User from "../../frontend/src/component/User";
const userSchema = mongoose.Schema({

    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["Income", "Expense"], // restrict values to either Income or Expense
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g., Food, Travel, Bills, etc.
    },
    notes: {
      type: String,
      required: false, // optional
    },
  
})

export default mongoose.model("user",userSchema)
