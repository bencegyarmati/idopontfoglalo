import { hairSalonData } from './data1.js';
// Fodrászok listájának megjelenítése
export const renderHairStylists = (hairSalonData) => {
    const container = document.getElementById('hairSalonList');
    container.innerHTML = ''; // Üresítjük a tartalmat
    hairSalonData.forEach((stylist) => {
        var _a;
        const stylistCard = document.createElement('div');
        stylistCard.className = 'stylist-card';
        stylistCard.innerHTML = `
            <h2>${stylist.neve}</h2>
            <button class="booking-button" data-id="${stylist.id}">Időpontfoglalás</button>
        `;
        container.appendChild(stylistCard);
        (_a = stylistCard.querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            renderBookingForm(stylist);
        });
    });
};
// Időpontfoglalási felület megjelenítése a kiválasztott fodrászhoz
export const renderBookingForm = (stylist) => {
    var _a, _b, _c;
    const container = document.getElementById('hairSalonList');
    container.innerHTML = `
        <h2>Foglalás ${stylist.neve} számára</h2>
        <label for="bookingDate">Válasszon dátumot:</label>
        <input type="date" id="bookingDate" />
        <div id="availableTimes"></div>
        <button id="confirmBooking">Lefoglalom</button>
        <button id="backToList">Vissza a listához</button>
    `;
    // Dátumválasztó eseménykezelő
    (_a = document.getElementById('bookingDate')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        renderAvailableTimes(stylist, selectedDate);
    });
    // Foglalás gomb eseménykezelő
    (_b = document.getElementById('confirmBooking')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        const selectedTime = document.querySelector('input[name="timeSlot"]:checked');
        if (!selectedTime) {
            alert('Kérjük, válasszon egy időpontot!');
            return;
        }
        confirmBooking(stylist, selectedTime.value);
    });
    // Vissza a fodrászok listájához
    (_c = document.getElementById('backToList')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        renderHairStylists(hairSalonData);
    });
};
// Szabad időpontok betöltése az adott napra
export const renderAvailableTimes = (stylist, selectedDate) => {
    const availableTimesContainer = document.getElementById('availableTimes');
    const dayIndex = new Date(selectedDate).getDay();
    // Az adott nap nyitvatartási időinek lekérése
    const schedule = stylist.nyitvatartas.find((time) => time.napIndex === dayIndex);
    if (!schedule) {
        availableTimesContainer.innerHTML = `<p>Nincs elérhető időpont erre a napra.</p>`;
        return;
    }
    // Szabad időpontok generálása
    const start = parseInt(schedule.tol.replace(':', ''), 10);
    const end = parseInt(schedule.ig.replace(':', ''), 10);
    const bookedTimes = stylist.idopontfoglals
        .filter((appt) => appt.datum === selectedDate)
        .map((appt) => appt.ora);
    let availableTimes = '';
    for (let time = start; time < end; time += 100) {
        const timeStr = `${String(Math.floor(time / 100)).padStart(2, '0')}:${String(time % 100).padStart(2, '0')}`;
        if (!bookedTimes.includes(timeStr)) {
            availableTimes += `
                <label>
                    <input type="radio" name="timeSlot" value="${timeStr}" />
                    ${timeStr}
                </label><br />
            `;
        }
    }
    availableTimesContainer.innerHTML = availableTimes || `<p>Nincs elérhető időpont.</p>`;
};
// Foglalás rögzítése a JSON-ba
export const confirmBooking = (stylist, selectedTime) => {
    const selectedDate = document.getElementById('bookingDate').value;
    // Új foglalás hozzáadása
    stylist.idopontfoglals.push({
        datum: selectedDate,
        nev: 'Vendég neve', // Itt később lehetővé teheted a név bekérését is
        ora: selectedTime,
    });
    // JSON mentése a localStorage-ba
    const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
    const updatedData = hairSalonData.map((s) => s.id === stylist.id ? stylist : s);
    localStorage.setItem('hairSalon', JSON.stringify(updatedData));
    alert('A foglalás sikeresen megtörtént!');
    renderHairStylists(updatedData); // Vissza az eredeti felületre
};
