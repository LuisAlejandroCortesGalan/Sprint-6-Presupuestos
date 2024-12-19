import fondo from "../img/fondo2.jpg";
import { Link } from "react-router-dom";
 
export const CardContainer = () => {
  return (
    <div className="imgSize">
      <div className="d-flex justify-content-between">
        <h6 className="text-start fw-bold">💻Frontender.itacademy</h6>
        <Link to="/" className="btn btn-light">Inicio</Link>
      </div>

      <div>
        <img src={fondo} alt="Frontender.it" className="img-fluid" />
        <p className="overlay-text">Consigue la mejor calidad</p>
      </div>
    </div>
  );
};
