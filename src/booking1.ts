import { hairSalonData } from './data1.js';
import { renderHairStylists } from './render1.js';

// Időpontfoglalás nézet megnyitása
export const openBooking = (stylistId: number) => {
    const stylist = hairSalonData.find((s) => s.id === stylistId);
    if (!stylist) return;

    const container = document.getElementById('hairSalonList')!;
    container.innerHTML = `
        <h2>Időpontfoglalás - ${stylist.neve}</h2>
        <label for="bookingDate">Válassz dátumot:</label>
        <input type="date" id="bookingDate" />
        <div id="availableTimes"></div>
        <button id="goBackButton">Vissza</button>
    `;

    const dateInput = document.getElementById('bookingDate') as HTMLInputElement;
    const availableTimes = document.getElementById('availableTimes')!;

    dateInput.addEventListener('change', () => {
        const selectedDate = new Date(dateInput.value);
        renderAvailableTimes(selectedDate, stylist, availableTimes);
    });

    document.getElementById('goBackButton')!.addEventListener('click', () => {
        renderHairStylists(hairSalonData);
    });
};

// Szabad időpontok renderelése
const renderAvailableTimes = (date: Date, stylist: any, container: HTMLElement) => {
    const dayIndex = date.getDay();
    const workDay = stylist.nyitvatartas.find((day: any) => day.napIndex === dayIndex);

    if (!workDay) {
        container.innerHTML = `<p>Az adott napra nincs nyitvatartás.</p>`;
        return;
    }

    container.innerHTML = `
        <h3>Szabad időpontok:</h3>
        <ul id="timeSlots"></ul>
    `;

    const timeSlots = document.getElementById('timeSlots')!;
    const appointments = stylist.idopontfoglals.filter(
        (app: any) => app.datum === date.toISOString().split('T')[0]
    );

    const allTimes = generateTimeSlots(workDay.tol, workDay.ig);
    const freeTimes = allTimes.filter(
        (time: string) => !appointments.some((app: any) => app.ora === time)
    );

    freeTimes.forEach((time: string) => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="time-button">${time}</button>`;
        li.addEventListener('click', () => bookTime(date, time, stylist));
        timeSlots.appendChild(li);
    });
};

// Időpontfoglalás
const bookTime = (date: Date, time: string, stylist: any) => {
    stylist.idopontfoglals.push({
        datum: date.toISOString().split('T')[0],
        ora: time,
    });
    localStorage.setItem('hairSalon', JSON.stringify(hairSalonData));
    alert(`Sikeres foglalás: ${date.toLocaleDateString()} ${time}`);
    renderHairStylists(hairSalonData);
};

// Időrés generátor
const generateTimeSlots = (start: string, end: string) => {
    const slots = [];
    let current = start;
    while (current < end) {
        slots.push(current);
        const [hours, minutes] = current.split(':').map(Number);
        current = `${hours + Math.floor((minutes + 30) / 60)}:${(minutes + 30) % 60 || '00'}`;
    }
    return slots;
};
