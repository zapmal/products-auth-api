import {
  PORT,
  app
} from "./app";
import "./database";

app.listen(PORT, () => console.log(`Everything's OK! Running on port ${PORT}`));