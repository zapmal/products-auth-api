import mongoose from "mongoose";
import config from "./config";

// const connectionURL = "mongodb://localhost";
// const databaseName = "products-api";

mongoose.connect(`${config.CONNECTION_URL}/${config.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(db => console.log("Successfully connected to database."))
  .catch(error => console.log(error));