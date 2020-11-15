import {
  model,
  Schema
} from "mongoose";

const roleSchema = new Schema({
  name: String
});

const Role = model("Role", roleSchema);

export default Role;