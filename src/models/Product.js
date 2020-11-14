import {
  Schema,
  model
} from "mongoose";

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  image: String
}, {
  timestamps: true
});

export default model("Product", productSchema);