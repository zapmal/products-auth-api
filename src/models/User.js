import {
  model,
  Schema
} from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: []
});

const User = model("User", userSchema);

export default User;