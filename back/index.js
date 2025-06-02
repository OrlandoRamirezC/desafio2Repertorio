import express from "express";
import { writeFile, readFile } from "node:fs/promises";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import cors from "cors";


const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

// <--- Habilitamos CORS
app.use(cors());

// Función para obtener las canciones
const getCanciones = async () => {
  const fsResponse = await readFile("canciones.json", "utf-8");
  const canciones = JSON.parse(fsResponse);
  return canciones;
};

app.get("/canciones", async (req, res) => {
  const canciones = await getCanciones(); // <--- Obtenemos las canciones
  res.json(canciones);
});

app.get("/canciones/:id", async (req, res) => {
  const id = req.params.id;
  const canciones = await getCanciones(); // <--- Obtenemos las canciones
  const cancion = canciones.find((cancion) => cancion.id === id);

  if (!cancion) {
    res.status(404).json({ message: "Cancion no encontrada" });
  }
  res.json(cancion);
});

//POST

app.post("/canciones", async (req, res) => {
  const { title, artista, tono } = req.body;
  const cancion = {
    id: nanoid(),
    title,
    artista,
    tono,
    done: false,
  };
  let canciones = await getCanciones();
  canciones.push(cancion);
  await writeFile("canciones.json", JSON.stringify(canciones));
  res.status(201).json(cancion);
});


//PUT
app.put("/canciones/:id", async (req, res) => {
  const id = req.params.id;

  let canciones = await getCanciones();
  const cancion = canciones.find((cancion) => cancion.id === id);

  if (!cancion) {
    res.status(404).json({ message: "Cancion no encontrada" });
  }

  canciones = canciones.map((cancion) => {
    if (cancion.id === id) {
      return { ...cancion, done: !cancion.done };
    }
    return cancion;
  });

  await writeFile("canciones.json", JSON.stringify(canciones));

  res.json(canciones);
});

//DELETE
app.delete("/canciones/:id", async (req, res) => {
  const id = req.params.id;

  let canciones = await getCanciones();
  const cancion = canciones.find((cancion) => cancion.id === id);

  if (!cancion) {
    res.status(404).json({ message: "Cancion no encontrada" });
  }

  canciones = canciones.filter((cancion) => cancion.id !== id);

  await writeFile("canciones.json", JSON.stringify(canciones));
  res.json(canciones);
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000");
});
