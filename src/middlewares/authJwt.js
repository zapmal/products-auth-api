import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

const verifyToken = async (request, response, next) => {
  try {
    const token = request.headers["x-access-token"];

    if (!token) {
      return response
        .status(403)
        .json({
          message: "No token provided."
        });
    }

    const decoded = jwt.verify(token, config.SECRET);
    response.locals.userId = decoded.id;

    const user = await User.findById(decoded.id, {
      password: 0
    });

    if (!user) {
      return response
        .status(404)
        .json({
          message: "User not found."
        });
    }
    next();
  } catch (error) {
    return response
      .status(401)
      .json({
        message: "Not authorized."
      });
  }
}

const isModerator = async (request, response, next) => {
  try {
    const user = await User.findById(response.locals.userId);
    const roles = await Role.find({
      _id: {
        $in: user.roles
      }
    });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "mod" || roles[i].name === "admin") {
        next();
        return;
      }
    }
    
    return response
      .status(403)
      .json({
        message: "This action requires MODERATOR role."
      });

  } catch (error) {
    return response
      .status(401)
      .json({
        message: "Not authorized."
      });
  }
};

const isAdmin = async (request, response, next) => {
  try {
    const user = await User.findById(response.locals.userId);
    const roles = await Role.find({
      _id: {
        $in: user.roles
      }
    });

    // callback (forEach) KILLED TWO HOURS OF MY TIME
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return response
      .status(403)
      .json({
        message: "This action requires ADMIN role."
      });

  } catch (error) {
    return response
      .status(401)
      .json({
        message: "Not authorized."
      });
  }
};

export {
  verifyToken,
  isModerator,
  isAdmin
};