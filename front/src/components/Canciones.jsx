import Cancion from "./Cancion";

export const Canciones = ({ canciones, eliminarCancion, editarCancion }) => {
  return (
    <ul className="list-group mt-5">
      {canciones.map((cancion) => (
        <Cancion
          key={cancion.id}
          cancion={cancion}
          eliminarCancion={eliminarCancion}
          editarCancion={editarCancion}
        />
      ))}

      {canciones.length === 0 && (
        <li className="list-group-item">
          <div className="d-flex">
            <h5>Cancion no encontrada</h5>
          </div>
        </li>
      )}
    </ul>
  );
};
