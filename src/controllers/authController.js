import User from "../models/User";
import config from "../config";
import jwt from "jsonwebtoken";
import Role from "../models/Role";

const login = async (request, response) => {
  const {
    email,
    password
  } = request.body;

  try {
    const userFound = await User.findOne({
      email
    }).populate("roles");

    if (!userFound) {
      return response
        .status(400)
        .json({
          message: "User not found"
        });
    }

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) {
      return response
        .status(401)
        .json({
          token: null,
          message: "Invalid password"
        });
    }

    const token = jwt.sign({
      id: userFound._id
    }, config.SECRET, {
      expiresIn: 84600
    });

    response.json({ token });
  } catch (error) {
    response.json(error);
  }
};

const signup = async (request, response) => {
  const {
    username,
    email,
    password,
    roles
  } = request.body;

  try {

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      roles
    });

    if (roles) {
      const foundRoles = await Role.find({
        name: {
          $in: roles
        }
      })
      newUser.roles = foundRoles.map(role => role._id);
    } else {
      const defaultRole = await Role.findOne({
        name: "user"
      });
      newUser.roles = [defaultRole._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({
      id: savedUser._id
    }, config.SECRET, {
      expiresIn: 86400
    });

    response.json({
      token
    });
  } catch (error) {
    response
      .status(400)
      .json(error);
  }
};

export {
  login,
  signup
}