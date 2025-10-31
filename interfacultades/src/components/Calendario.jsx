import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function Calendario() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/eventos")
    .then(res => {
      const eventos = res.data.map(e => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end)
      }));
      setEvents(eventos);
    })
    .catch(err => console.error("Error cargando eventos:", err));
  }, []);

  return (
    <div className="p-5">
      <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" toolbar={true}
        style={{ height: 500 }} tooltipAccessor="title"/>
    </div>
  );
}
