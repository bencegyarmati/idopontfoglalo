"use strict";

// Az ES6 modul szintaxis használata
export const openBooking = (stylistId) => {
  console.log(`Stylist ${stylistId} foglalása.`);

  // Adatok betöltése a localStorage-ból
  const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
  const stylist = hairSalonData.find((s) => s.id === stylistId);
  if (!stylist) return;

  // Foglalási modal kitöltése fodrász névvel és dátumválasztóval
  const modal = document.getElementById('bookingModal');
  modal.style.display = 'block';
  modal.innerHTML = `
    <h3>Foglalás ${stylist.neve} számára</h3>
    <label for="date">Dátum:</label>
    <input type="date" id="date" />
    <button onclick="confirmBooking(${stylistId})">Lefoglalom</button>
    <button onclick="closeModal()">Mégse</button>
  `;
};

export const closeModal = () => {
  const modal = document.getElementById('bookingModal');
  modal.style.display = 'none';
};

export const confirmBooking = (stylistId) => {
  const dateInput = document.getElementById('date');
  const selectedDate = dateInput.value;
  if (!selectedDate) {
    alert('Kérjük, válasszon dátumot!');
    return;
  }

  // Adatok betöltése a localStorage-ból
  const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
  const stylist = hairSalonData.find((s) => s.id === stylistId);
  if (!stylist) return;

  // Új foglalás hozzáadása
  stylist.idopontfoglals.push({ datum: selectedDate, nev: 'Vendég neve', ora: '10:00' }); // Példaként 10:00-ra állítjuk
  localStorage.setItem('hairSalon', JSON.stringify(hairSalonData));

  alert('A foglalás sikeresen megtörtént!');
  closeModal();
};
