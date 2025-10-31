const axios = require('axios');
require("dotenv").config();

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

const eventos = async (req, res) => {
    try {
        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data;
        const eventos = data.items.map(e => {
        const dia = !!e.start.date;

        return {
            id: e.id,
            title: e.summary || "Sin título",
            start: dia ? new Date(e.start.date + "T00:00:00") : new Date(e.start.dateTime),
            end: dia ? new Date(e.end.date + "T23:59:59") : new Date(e.end.dateTime),
            allDay: dia
        };
        });

        res.json(eventos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { eventos };
