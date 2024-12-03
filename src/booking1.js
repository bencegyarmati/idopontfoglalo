import { hairSalonData } from './data1.js';
import { renderHairStylists } from './render1.js';
// Időpontfoglalás nézet megnyitása
export const openBooking = (stylistId) => {
    const stylist = hairSalonData.find((s) => s.id === stylistId);
    if (!stylist)
        return;
    const container = document.getElementById('hairSalonList');
    container.innerHTML = `
        <h2>Időpontfoglalás - ${stylist.neve}</h2>
        <label for="bookingDate">Válassz dátumot:</label>
        <input type="date" id="bookingDate" />
        <div id="availableTimes"></div>
        <button id="goBackButton">Vissza</button>
    `;
    const dateInput = document.getElementById('bookingDate');
    const availableTimes = document.getElementById('availableTimes');
    dateInput.addEventListener('change', () => {
        const selectedDate = new Date(dateInput.value);
        renderAvailableTimes(selectedDate, stylist, availableTimes);
    });
    document.getElementById('goBackButton').addEventListener('click', () => {
        renderHairStylists(hairSalonData);
    });
};
// Szabad időpontok renderelése
const renderAvailableTimes = (date, stylist, container) => {
    const dayIndex = date.getDay();
    const workDay = stylist.nyitvatartas.find((day) => day.napIndex === dayIndex);
    if (!workDay) {
        container.innerHTML = `<p>Az adott napra nincs nyitvatartás.</p>`;
        return;
    }
    container.innerHTML = `
        <h3>Szabad időpontok:</h3>
        <ul id="timeSlots"></ul>
    `;
    const timeSlots = document.getElementById('timeSlots');
    const appointments = stylist.idopontfoglals.filter((app) => app.datum === date.toISOString().split('T')[0]);
    const allTimes = generateTimeSlots(workDay.tol, workDay.ig);
    const freeTimes = allTimes.filter((time) => !appointments.some((app) => app.ora === time));
    freeTimes.forEach((time) => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="time-button">${time}</button>`;
        li.addEventListener('click', () => bookTime(date, time, stylist));
        timeSlots.appendChild(li);
    });
};
// Időpontfoglalás
const bookTime = (date, time, stylist) => {
    stylist.idopontfoglals.push({
        datum: date.toISOString().split('T')[0],
        ora: time,
    });
    localStorage.setItem('hairSalon', JSON.stringify(hairSalonData));
    alert(`Sikeres foglalás: ${date.toLocaleDateString()} ${time}`);
    renderHairStylists(hairSalonData);
};
// Időrés generátor
const generateTimeSlots = (start, end) => {
    const slots = [];
    let current = start;
    while (current < end) {
        slots.push(current);
        const [hours, minutes] = current.split(':').map(Number);
        current = `${hours + Math.floor((minutes + 30) / 60)}:${(minutes + 30) % 60 || '00'}`;
    }
    return slots;
};
