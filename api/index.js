const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/User");

const app = express();
const port = 3000;

// Sequelize veritabanı ile senkronizasyon
sequelize
  .sync()
  .then(() => {
    console.log("Veritabanı başarıyla senkronize edildi.");
  })
  .catch((err) => {
    console.error("Veritabanı senkronizasyon hatası:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
