// como relaciono estas dos coleccione (esa es la gracia de la bd NoSQL)
// a las coleccione las podemos relacionar por referencia o por documentos embebidos

// realciones por referencia: por ejemplo le podemos pasar por referancia le id de todos los alumnos que estan
// anotados a ese curso entonces cre un arreglo de id de alumnos
let usuario = {
  id: "U001",
  nombre: "Juco",
  email: "juco@email.com",
}; // colleccion usuario (es una entidad)

let curso = {
  id: "C001",
  id_alumnos: ["U001", "U002", "U003"], // realacion por referencia
  titulo: "Java Script moderno",
  descripcion: "asfasdf",
}; // coleccion curso (es una entidad)

// let curso_alumno = {
//   id: "0001",
//   id_curso: "C001",
//   id_alumno: "A001",
// };

// Relaciones por documentos embebidos (Desnormalizacion):
let curso = {
  id: "C001",
  autor: {
    nombre: "Carlos Perez",
  },
  id_alumnos: [
    {
      id: "A001",
      nombre: "Juco",
      email: "juco@email.com",
    },
    {
      id: "A002",
      nombre: "Ana",
      email: "ana@email.com",
    },
  ], // realcion con documentos embebidos
  titulo: "Java Script moderno",
  descripcion: "asfasdf",
};

// lo normal (para empezar) es utilizar relacione por referencia hasta que tengas mas expreriancia
// luego el tipo de realacione que se deberan utilizar va a depender de la performance y consistencia

// En las relaciones por referencia vamos a tener consultas muy consistentes
// voy a tener consistencai en el sentido de que si yo tengo una modificacion de un usuario, entonces automaticamente
// van a aparecer los nuevos datos del usuario modificados porque solo hay una realcion de referencia, se mantiene mi consistencia

// Por otro lado las relaciones por documentos embebidos se realizan con mayor performance
// Porque en un documento tengo TODOS los datos, entonces cuando yo me traigo un curso no voy a necesitar hacer
// otras consutas para traer los autores o los usuarios porque ya los tengo ahi. Basta con una sola consulta del curso
// El problema es que si un usuario o un autor cambia su data, entonces solo se va a actualizar en un solo curso y no
// en todos los demas.  Mejoro el performance de mis consultas pero las consistencia de mis datos se pierden
