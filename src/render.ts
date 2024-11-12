export const renderHairStylists = (data: any) => {
    const container = document.getElementById('hairSalonList')!;
  
    container.innerHTML = '';
    data.forEach((stylist: any) => {
      const stylistCard = document.createElement('div');
      stylistCard.className = 'stylist-card';
      stylistCard.innerHTML = `
        <h2>${stylist.neve}</h2>
        <button onclick="openBooking(${stylist.id})">Időpontfoglalás</button>
      `;
      container.appendChild(stylistCard);
    });
  };
  