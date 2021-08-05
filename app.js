const express = require("express");
const mongoose = require("mongoose");
const usuarios = require("./routes/usuarios");
const cursos = require("./routes/cursos");
const app = express();
const auth = require("./routes/auth");
const config = require("config");

mongoose
  .connect(config.get("configDB.HOST"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la mongoDB"))
  .catch((err) => console.log("No se pudo conectar con mongoDB ", err));
mongoose.set("useCreateIndex", true);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Todo OK"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/usuarios", usuarios);
app.use("/api/cursos", cursos);
app.use("/api/auth", auth);
