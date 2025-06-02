import { useEffect, useState } from "react";
import CancionForm from "./components/CancionForm";
import { Canciones } from "./components/Canciones";

const App = () => {
  const [canciones, setCanciones] = useState([]);

  const getCanciones = async () => {
    const response = await fetch("http://localhost:5000/canciones");
    const canciones = await response.json();
    setCanciones(canciones);
  };

  useEffect(() => {
    getCanciones();
  }, []);

  const addCancion = async (title, artista, tono) => {
    const response = await fetch("http://localhost:5000/canciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, artista, tono }),
    });
    const cancion = await response.json();
    setCanciones([...canciones, cancion]);
  };
/*   const addCancion = (req, res) => {
    try {
      const {nombre, artista, tono} = req.body
      const id =crypto.randomUUID()

      const cancion = {
        id,
        nombre,
        artista, 
        tono
      }
      const canciones = JSON.parse(fs.readFileSync("http://localhost:5000/canciones", 'utf8'))
      canciones.push(cancion)
      fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
      res.send('Cancion añadida')     
    } catch (error) {
      res.json({message:'Recurso no disponible'})
      
    }
  } */

  const eliminarCancion = async (id) => {
    const response = await fetch(`http://localhost:5000/canciones/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      return alert("Something went wrong");
    }
    setCanciones(canciones.filter((cancion) => cancion.id !== id));
  };

  const editarCancion = async (id) => {
    const response = await fetch(`http://localhost:5000/canciones/${id}`, {
      method: "PUT",
    });
    if (response.status !== 200) {
      return alert("Something went wrong");
    }
    setCanciones(
      canciones.map((cancion) => {
        if (cancion.id === id) {
          cancion.done = !cancion.done;
        }
        return cancion;
      })
    );
  };

  return (
    <div className="container bg">
      <h2 className="pt-3 text-center">&#119070; Mi repertorio &#119070;</h2>
      <CancionForm addCancion={addCancion} />
      <div class="container w-75">
      <h2 className="pt-3 text-center">Tabla de canciones &#127908;</h2>
            <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Canción</th>
            <th scope="col">Artista</th>
            <th scope="col">Tono</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody id="cuerpo"></tbody>
      </table>
      <Canciones canciones={canciones} eliminarCancion={eliminarCancion} editarCancion={editarCancion} />
    </div>
    </div>
  );
};
export default App;
