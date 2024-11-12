// render.ts
import { hairSalonData } from './data';

export const renderHairStylists = (hairSalonData: any) => {
  const container = document.getElementById('hairSalonList')!;
  container.innerHTML = '';

  hairSalonData.forEach((stylist: any) => {
    const stylistCard = document.createElement('div');
    stylistCard.className = 'stylist-card';
    stylistCard.innerHTML = `
      <h2>${stylist.neve}</h2>
      <button onclick="openBooking(${stylist.id})">Időpontfoglalás</button>
    `;
    container.appendChild(stylistCard);
  });
};

export const openBooking = (stylistId: number) => {
  const stylist = hairSalonData.find((s) => s.id === stylistId);
  const bookingModal = document.getElementById('bookingModal')!;
  const bookingDetails = document.getElementById('bookingDetails')!;
  
  bookingModal.style.display = 'block';
  bookingDetails.innerHTML = `
    <h3>Időpontfoglalás ${stylist?.neve}</h3>
    <ul>
      ${stylist?.nyitvatartas
        .map(
          (time: any) => `
        <li>
          ${time.nap}: ${time.tol} - ${time.ig}
          <button onclick="bookTime('${time.nap}', '${time.tol}')">Foglalás</button>
        </li>`
        )
        .join('')}
    </ul>
  `;
};

export const bookTime = (nap: string, ora: string) => {
  alert(`Sikeres foglalás: ${nap} ${ora}`);
  // Frissítjük a foglalásokat
  // Itt a foglalásokat az adatbázisban is frissíthetjük
};

// Törlés a modálról
document.getElementById('closeModal')?.addEventListener('click', () => {
    document.getElementById('bookingModal')!.style.display = 'none';
  });
  
