// import { confirmBooking } from './index';
export const openBooking = (stylistId) => {
    console.log(`Stylist ${stylistId} foglalása.`);
    const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
    const stylist = hairSalonData.find((s) => s.id === stylistId);
    if (!stylist)
        return;
    // Foglalási modal kitöltése fodrász névvel és dátumválasztóval
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'block';
    modal.innerHTML = `
    <h3>Foglalás ${stylist.neve} számára</h3>
    <label for="date">Dátum:</label>
    <input type="date" id="date" />
    <button id="confirmBookingBtn">Lefoglalom</button>
    <button id="closeModalBtn">Mégse</button>
  `;
    // Eseménykezelők hozzáadása
    document
        .getElementById('confirmBookingBtn')
        .addEventListener('click', () => confirmBooking(stylistId));
    document
        .getElementById('closeModalBtn')
        .addEventListener('click', closeModal);
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
    const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
    const stylist = hairSalonData.find((s) => s.id === stylistId);
    if (!stylist)
        return;
    // Új foglalás hozzáadása
    stylist.idopontfoglals = stylist.idopontfoglals || [];
    stylist.idopontfoglals.push({
        datum: selectedDate,
        nev: 'Vendég neve', // Tesztadat, amit a felhasználótól is kérhetsz.
        ora: '10:00', // Alapértelmezett időpont.
    });
    localStorage.setItem('hairSalon', JSON.stringify(hairSalonData));
    alert('A foglalás sikeresen megtörtént!');
    closeModal();
};
