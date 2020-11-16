import {
  model,
  Schema
} from "mongoose";
import bcrypt from "bcryptjs";

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
  roles: [{
    ref: "Role",
    type: Schema.Types.ObjectId
  }]
}, {
  timestamps: true
});

userSchema
  .statics
  .encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema
  .statics
  .comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const User = model("User", userSchema);

export default User;