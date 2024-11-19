var _a;
// render.ts
import { hairSalonData } from './data.js';
export const renderHairStylists = (hairSalonData) => {
    const container = document.getElementById('hairSalonList');
    container.innerHTML = '';
    hairSalonData.forEach((stylist) => {
        const stylistCard = document.createElement('div');
        stylistCard.className = 'stylist-card';
        stylistCard.innerHTML = `
      <h2>${stylist.neve}</h2>
      <button onclick="openBooking(${stylist.id})">Időpontfoglalás</button>
    `;
        container.appendChild(stylistCard);
    });
};
export const openBooking = (stylistId) => {
    const stylist = hairSalonData.find((s) => s.id === stylistId);
    const bookingModal = document.getElementById('bookingModal');
    const bookingDetails = document.getElementById('bookingDetails');
    bookingModal.style.display = 'block';
    bookingDetails.innerHTML = `
    <h3>Időpontfoglalás ${stylist === null || stylist === void 0 ? void 0 : stylist.neve}</h3>
    <ul>
      ${stylist === null || stylist === void 0 ? void 0 : stylist.nyitvatartas.map((time) => `
        <li>
          ${time.nap}: ${time.tol} - ${time.ig}
          <button onclick="bookTime('${time.nap}', '${time.tol}')">Foglalás</button>
        </li>`).join('')}
    </ul>
  `;
};
export const bookTime = (nap, ora) => {
    alert(`Sikeres foglalás: ${nap} ${ora}`);
    // Frissítjük a foglalásokat
    // Itt a foglalásokat az adatbázisban is frissíthetjük
};
// Törlés a modálról
(_a = document.getElementById('closeModal')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    document.getElementById('bookingModal').style.display = 'none';
});
