import Role from "../models/Role";
import User from "../models/User";

const createRoles = async () => {
  try {
    const amountOfRoles = await Role.estimatedDocumentCount();

    if (amountOfRoles > 0) return; 
  
    await Promise.all([
      new Role({ name: "admin" }).save(),
      new Role({ name: "mod" }).save(),
      new Role({ name: "user" }).save()
    ]);
  
    console.log("Roles created successfully.");
  } catch (error) {
    console.error(error);
  }
};

export {
  createRoles
};