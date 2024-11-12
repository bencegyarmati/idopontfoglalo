export const openBooking = (stylistId: number) => {
    // Megnyitjuk a foglalási ablakot és betöltjük az elérhető időpontokat
    document.getElementById('bookingModal')!.style.display = 'block';
    // További dátum és időpontok betöltése
  };
  
  export const confirmBooking = () => {
    // Foglalási adatok mentése localStorage-ba
    alert('A foglalás sikeresen megtörtént!');
    document.getElementById('bookingModal')!.style.display = 'none';
    renderHairStylists(); // Frissítjük a kezdőoldalt
  };
  