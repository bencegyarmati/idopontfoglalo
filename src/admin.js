// Az ES6 modul szintaxis használata
export const displayAdminPanel = () => {
    console.log('Admin panel megjelenítése');
  
    // Adatok betöltése a localStorage-ból
    const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
  
    // Az appointmentList táblázat beállítása
    const tableBody = document.getElementById('appointmentList');
    tableBody.innerHTML = '';
  
    // Végigmegyünk minden fodrászon és azok foglalásain
    hairSalonData.forEach((stylist) => {
      stylist.idopontfoglals.forEach((appointment) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${stylist.neve}</td>
          <td>${appointment.nev}</td>
          <td>${appointment.datum}</td>
          <td>${appointment.ora}</td>
        `;
        tableBody.appendChild(row);
      });
    });
  };
  