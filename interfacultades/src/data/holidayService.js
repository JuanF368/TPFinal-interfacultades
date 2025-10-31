export async function getHolidays(year = new Date().getFullYear()) {
    const apiKey = import.meta.env.VITE_API_KEY_CALENDARIFIC;

    const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=AR&year=${year}`;

    const res = await fetch(url);
    const data = await res.json();

    if(!data?.response?.holidays) return [];

    const today = new Date();

    const holidays = data.response.holidays.filter(h => {
        const holidayDate = new Date(h.date.iso);
        return (
            holidayDate >= today //&&
            //(h.type.includes("National holiday") || h.type.includes("Public holiday"))
        );
    });

    return holidays;
}