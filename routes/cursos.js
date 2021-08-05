const express = require("express");
const Curso = require("../models/curso_model");
const ruta = express.Router();
const verificarToken = require("../middlewares/auth");

ruta.get("/", verificarToken, (req, res) => {
  let resultado = listarCursosActivos();
  resultado
    .then((cursos) => res.json(cursos))
    .catch((err) => res.status(400).json(err));
});

ruta.post("/", verificarToken, (req, res) => {
  let resultado = crearCurso(req);
  resultado.then((curso) => {
    res
      .json({
        curso,
      })
      .catch((err) => {
        res.status(400).json({
          err,
        });
      });
  });
});

ruta.put("/:id", verificarToken, (req, res) => {
  let resultado = actualizarCurso(req.params.id, req.body);
  resultado.then((curso) => {
    res
      .json({
        curso,
      })
      .catch((err) => {
        res.status(400).json({
          err,
        });
      });
  });
});

ruta.delete("/:id", verificarToken, (res, req) => {
  let resultado = desactivarCurso(req.params.id);
  resultado
    .then((curso) => {
      res.json(curso);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

async function listarCursosActivos() {
  let curso = await Curso.find({ estado: true }).populate(
    "autor",
    "nombre -_id"
  ); // remplaza el id del autor por su nombre
  return curso;
}

async function crearCurso(req) {
  let curso = new Curso({
    titulo: req.body.titulo,
    autor: req.usuario._id, // realcion por referencia
    descripcion: req.body.descripcion,
  });
  return await curso.save();
}

async function actualizarCurso(id, body) {
  let curso = await Curso.findByIdAndUpdate(
    id,
    {
      $set: {
        titulo: body.titulo,
        descripcion: body.descripcion,
      },
    },
    { new: true }
  );
  return curso;
}

async function desactivarCurso(id) {
  let curso = await Curso.findByIdAndUpdate(
    id,
    {
      $set: {
        estado: false,
      },
    },
    { new: true }
  );
  return curso;
}

module.exports = ruta;
