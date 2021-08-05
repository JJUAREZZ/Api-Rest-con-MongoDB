const express = require("express");
const ruta = express.Router();
const Usuario = require("../models/usuario_model");
//const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

ruta.post("/", (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((datos) => {
      if (datos) {
        const passwordValido = bcrypt.compareSync(
          req.body.password,
          datos.password
        ); //compara la pass que mando el cliente con el que esta en la db (req.body)
        if (!passwordValido) {
          return res
            .status(400)
            .json({ error: "ok", msj: "Usuario o Contraseña incorrecta" });
        }
        const jwtoken = jwt.sign(
          {
            usuario: {
              _id: datos.id,
              nombre: datos.nombre,
              email: datos.email,
            },
          },
          config.get("configToken.SEED"),
          { expiresIn: config.get("configToken.expiration") }
        ); // generamos el token y expira en una hora
        res.json({
          usuario: {
            _id: datos.id,
            nombre: datos.nombre,
            email: datos.email,
          },
          token: jwtoken,
        });
      } else {
        res.status(400).json({
          error: "ok",
          msj: "Usuario o Contraseña incorrecta",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: "ok",
        msj: "error en el servicio" + err,
      });
    });
});

module.exports = ruta;
