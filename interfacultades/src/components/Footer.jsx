import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-[#112349] px-4 text-white cursor-default md:px-16 lg:px-28 py-8 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="m-4 text-left"> 
                    <h2 className="text-lg font-bold mb-4 ">Juegos Deportivos Interfacultativos </h2>
                    <hr className="border-4 border-[#E94D1A] rounded-sm w-24 mb-4" />                    
                    <p className="text-sm text-gray-300 mb-2">
                        ¡Somos los JSDIF! Promovemos la actividad física, el trabajo en equipo y la integración entre estudiantes.
                    </p>
                    <p className="text-sm text-gray-300">Buenos Aires 1400, Neuquén Capital</p>
                </div>
                <div className="flex flex-col items-center space-y-3"> 
                    <h2 className="text-lg font-bold"> Redes </h2>
                    <div className="flex space-x-5 text-2xl">
                        <a href="https://bienestar.uncoma.edu.ar/index.php/agenda/somos-la-secretaria-de-bienestar-universitario-de-la-unco"
                        className="text-white hover:text-[#E94D1A] transition-colors"> <FaGoogle/> </a>
                        <a href="https://www.facebook.com/bienestaruncoma" className="text-white hover:text-[#E94D1A] transition-colors"><FaFacebook/> </a>
                        <a href="https://www.instagram.com/sbucomahue/" className="text-white hover:text-[#E94D1A] transition-colors"><FaInstagram/></a>
                    </div>
                    <div className="rounded-full p-3">
                        <img src="/logos/logoUNCO.svg" alt="Logo UNCo" className="h-28" />
                    </div>
                </div>
                <div className="m-4 text-right"> 
                    <h2 className="text-lg font-bold mb-4 "> Contacto </h2>
                    <hr className="border-4 border-[#E94D1A] rounded-sm w-24 ml-auto mb-4" />
                    <h4 className="text-sm text-gray-300 mb-1" > Ante cualquier duda comunicarse a: </h4>
                    <a href="mailto:secretaria.bienestar@central.uncoma.edu.ar" className="break-all">secretaria.bienestar@central.uncoma.edu.ar</a>
                </div>
                
            </div>
            <div className="border-t-4 border-[#E94D1A] pt-6 text-gray-300 text-center mt-6">
                <p>&copy; {new Date().getFullYear()} Interfacultades. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;