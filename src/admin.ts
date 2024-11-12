export const renderAdminPanel = () => {
    const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
    const tableBody = document.getElementById('appointmentList')!;
  
    tableBody.innerHTML = '';
    hairSalonData.forEach((stylist: any) => {
      stylist.idopontfoglals.forEach((appointment: any) => {
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
  