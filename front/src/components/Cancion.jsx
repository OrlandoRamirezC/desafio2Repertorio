const Cancion = ({ cancion, eliminarCancion, editarCancion: editarCancion }) => {
  return (
  <div class="container"> 
    <li className="list-group-item bg-dark text-white ">
      
      <div className="d-flex f-wrap">
        <h5
          className={
            cancion.done ? "text-decoration-line-through me-auto" : "me-auto"
          }
        >
          {cancion.title}
          {cancion.artista}
          {cancion.tono}
        </h5>
        <button
          className="btn btn-sm btn-warning me-1"
          onClick={() => editarCancion(cancion.id)}
        >
          Editar
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => eliminarCancion(cancion.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
    </div>
  );
};
export default Cancion;
