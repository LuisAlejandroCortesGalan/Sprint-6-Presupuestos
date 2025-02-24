import { Link } from "react-router-dom";
import { Lumiflex } from "uvcanvas";

function Home() {
    return (
    <div className="lumiflexContainer">
        <Lumiflex />
        <div className="lumiflexContent">
        <h1 className="fw-bold mb-5 fs-1">Bienvenido a la Calculadora de Precios</h1>
        <Link to="/app" className="btn btn-light btn-lg">Ir a la calculadora</Link>
        </div>
    </div>
    );
}


export default Home;