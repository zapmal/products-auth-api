import express from "express";
import morgan from "morgan";

import pkg from "../package.json";
import productsRoutes from "./routes/productsRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { createRoles } from "./libs/initialSetup";

const app = express();
createRoles();

const PORT = process.env.PORT || 3000;

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export {
  app,
  PORT
};