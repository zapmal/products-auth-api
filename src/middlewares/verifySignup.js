import Role from "../models/Role";
import User from "../models/User";

const checkRolesExists = async (request, response, next) => {
  const {
    roles
  } = request.body;

  try {
    if (roles) {
      const storedRoles = await Role.find({});
      const storedRolesNames = storedRoles.map(r => r.name);

      for (let i = 0; i < roles.length; i++) {
        if (!storedRolesNames.includes(roles[i])) {
          return response
            .status(400)
            .json({
              message: `The role ${roles[i]} is not valid.`
            });
        }
      }
    }
    next();
  } catch (error) {
    return response
      .status(500)
      .json(error);
  }
};

const checkDuplicatedUser = async (request, response, next) => {
  const {
    username,
    email
  } = request.body;

  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return response
        .status(400)
        .json({
          message: `The user ${foundUser.username} already exists.`
        });
    }

    const foundEmail = await User.findOne({ email });
    if (foundEmail) {
      return response
        .status(400)
        .json({
          message: `The email ${foundEmail.email} already exists.`
        });
    }

    next();
  } catch (error) {
    return response
      .status(500)
      .json(error);
  }
};

export {
  checkRolesExists,
  checkDuplicatedUser
}