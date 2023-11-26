const mongoose = require("mongoose");
const app = require("./app");
require("dotenv/config");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
