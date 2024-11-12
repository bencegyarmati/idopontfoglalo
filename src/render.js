"use strict";

// Importáljuk a hairSalonData adatokat a data.ts-ből
import { hairSalonData } from './data.js';

// A fodrászok listájának renderelése
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

// A foglalás megnyitása a kiválasztott fodrászhoz
export const openBooking = (stylistId) => {
  const stylist = hairSalonData.find((s) => s.id === stylistId);
  const bookingModal = document.getElementById('bookingModal');
  const bookingDetails = document.getElementById('bookingDetails');
  bookingModal.style.display = 'block';
  bookingDetails.innerHTML = `
    <h3>Időpontfoglalás ${stylist ? stylist.neve : ''}</h3>
    <ul>
      ${stylist ? stylist.nyitvatartas.map((time) => `
        <li>
          ${time.nap}: ${time.tol} - ${time.ig}
          <button onclick="bookTime('${time.nap}', '${time.tol}')">Foglalás</button>
        </li>`).join('') : ''}
    </ul>
  `;
};

// Időpont foglalása
export const bookTime = (nap, ora) => {
  alert(`Sikeres foglalás: ${nap} ${ora}`);
  // Itt frissítheted a foglalásokat, pl. egy adatbázisban
};

// Modál bezárása
document.getElementById('closeModal')?.addEventListener('click', () => {
  document.getElementById('bookingModal').style.display = 'none';
});
