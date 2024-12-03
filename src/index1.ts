import { renderHairStylists } from './render1.js';
import { hairSalonData } from './data1.js';
import { displayAdminPanel } from './admin1.js';
import { openBooking } from './booking1.js';

// Ellenőrizzük, hogy van-e adat a localStorage-ban
const localHairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');

// Ha nincs adat, az alapértelmezett adatokat töltjük be
if (localHairSalonData.length === 0) {
    localStorage.setItem('hairSalon', JSON.stringify(hairSalonData));
    renderHairStylists(hairSalonData); // Alapértelmezett adatok renderelése
} else {
    renderHairStylists(localHairSalonData); // Adatok betöltése a localStorage-ból
}

// Admin panel megjelenítése
const adminPanelButton = document.getElementById('adminPanelButton');
adminPanelButton?.addEventListener('click', () => {
    displayAdminPanel();
});

// Foglalási események kezelése
document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('booking-button')) {
        const stylistId = Number(target.dataset.id);
        openBooking(stylistId);
    }
});
