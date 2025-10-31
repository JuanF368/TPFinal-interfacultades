import { useEffect, useState } from "react";
import { getHolidays } from "../data/holidayService";

const HolidaysWidget = () => {
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        getHolidays().then(setHolidays);
    }, []);

    return (
        <div className="border p-4 rounded shadow bg-white mb-4">
            <h2 className="text-lg font-semibold mb-2">Proximos feriados {new Date().getFullYear()}</h2>
            {holidays.length === 0 ? (
                <p>Cargando...</p>
            ) : (
                <ul className="text-sm space-y-1">
                    {holidays.slice(0, 8).map(h => (
                        <li key={h.date.iso} className="flex justify-between">
                            <span>{h.name}</span>
                            <span className="text-gray-500">{new Date(h.date.iso).toLocaleDateString('es-AR')}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default HolidaysWidget;