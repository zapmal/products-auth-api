import mongoose from "mongoose";

const connectionURL = "mongodb://localhost";
const databaseName = "products-api";

mongoose.connect(`${connectionURL}/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(db => console.log("Successfully connected to database."))
  .catch(error => console.log(error));