import { useState } from "react";

const CancionForm = ({ addCancion }) => {
  const [title, setTitle] = useState("");
  const [artista, setArtista] = useState("");
  const [tono, setTono] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await addCancion(title);
    setTitle("");
     if (!artista) return;
    await addCancion(artista);
    setArtista("");
    if (!tono) return;
    await addCancion(tono);
    setTono("");
  };


  return (
    <div class="container pt-5 w-50">

      <form onSubmit={handleSubmit} className="mb-2">

        <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Canción:</label>
          <div class="col-sm-10">
            <input
              id="cancion"
              type="text"
              className="form-control"
              placeholder="Agrega una cancion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Artista: </label>
          <div class="col-sm-10">
                        <input
              id="artista"
              type="text"
              className="form-control"
              placeholder="Agrega un artista"
              value={artista}
              onChange={(e) => setArtista(e.target.value)}
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="rut" class="col-sm-2 col-form-label">Tono:</label>
          <div class="col-sm-10">
                        <input
              id="tono"
              type="text"
              className="form-control"
              placeholder="Agrega un tono"
              value={tono}
              onChange={(e) => setTono(e.target.value)}
            />
          </div>
        </div>

        <div className="d-grid mt-3">
          <button className="btn btn-primary" type="submit">
            Agregar
          </button>
        </div>
      </form>

    </div>
  );
};
export default CancionForm;
