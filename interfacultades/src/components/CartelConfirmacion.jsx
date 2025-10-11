import React from "react";

const CartelConfirmacion = ({ mensaje, confirmar, cancelar}) => {
    return ( 
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(128,128,128,0.5)] z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4"> {mensaje} </h2>
            <div className="flex justify-center gap-4">
                <button onClick={confirmar}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                 Confirmar
                </button>
                <button onClick={cancelar}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400" >
                Cancelar
                </button>
            </div>
            </div>
        </div>
    )
}

export default CartelConfirmacion;