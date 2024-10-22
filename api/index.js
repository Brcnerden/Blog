const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt"); // bcrypt'i de unutma
const jwt = require("jsonwebtoken"); // JWT ile token oluşturmak için
const sequelize = require("./config/database");
const User = require("./models/User");

const app = express();
const port = 3008;

// app.use(cors()); // Tüm kaynaklardan gelen isteklere izin verir

app.use(
  cors({
    origin: "http://localhost:3000", // Sadece localhost:3000'den gelen isteklere izin verir
  })
);

// JSON verileri alabilmek için bu middleware'i eklemelisin
app.use(express.json());

// Sequelize veritabanı ile senkronizasyon
sequelize
  .sync()
  .then(() => {
    console.log("Veritabanı başarıyla senkronize edildi.");
  })
  .catch((err) => {
    console.error("Veritabanı senkronizasyon hatası:", err);
  });

// POST isteği ile kullanıcı oluşturma
app.post("/api/user", async (req, res) => {
  const { username, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu.", user });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ error: "Kullanıcı oluşturulamadı", details: error });
  }
});

// Kullanıcı girişi (sign-in) için API
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Veritabanında email ile kullanıcıyı bul
    const user = await User.findOne({ where: { email } });

    // Eğer kullanıcı bulunamazsa hata döndür
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Geçersiz şifre" });
    }

    // Şifre doğruysa JWT token oluştur
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Token'da kullanıcının id ve email bilgilerini sakla
      "SECRET_KEY", // Güvenli bir SECRET_KEY kullanmalısın (örneğin .env dosyasından çekebilirsin)
      { expiresIn: "1h" } // Token'ın 1 saat geçerli olmasını sağla
    );

    // Başarılı giriş durumunda kullanıcıya token ve mesaj döndür
    res.status(200).json({
      message: "Başarıyla giriş yapıldı.",
      token,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Sunucu hatası", details: error });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
