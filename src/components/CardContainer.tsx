import fondo from '../img/fondo2.jpg';


export const CardContainer = () => {
    return (
    <div className='imgSize'>
        <h6 className='text-start fw-bold'>
            💻Frontender.itacademy
        </h6>
        <div>
            <img src={fondo} alt="Frontender.it" className="img-fluid" />
            <p className='overlay-text'>Consigue la mejor calidad</p>
        </div>
    </div>
    )
}