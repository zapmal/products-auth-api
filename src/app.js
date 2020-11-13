import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import productsRoutes from "./routes/productsRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

app.set("pkg", pkg);

app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version
  });
});

app.use("/products", productsRoutes);

export {
  app,
  PORT
};