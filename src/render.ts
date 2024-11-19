// render.ts
import { closeModal, openBooking } from './booking';
import { hairSalonData } from './data';

export const renderHairStylists = (hairSalonData: any) => {
  const container = document.getElementById('hairSalonList')!;
  container.innerHTML = '';

  hairSalonData.forEach((stylist: any) => {
    const stylistCard = document.createElement('div');
    stylistCard.className = 'stylist-card';
    stylistCard.innerHTML = `
      <h2>${stylist.neve}</h2>
      <button class="booking-button" data-id="${stylist.id}">Időpontfoglalás</button>
    `;
    container.appendChild(stylistCard);
    });
  };


export const openBookingModal = (stylistId: number) => {
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
  
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hairSalonList')!;
  const buttons = container.querySelectorAll('.booking-button');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const stylistId = Number(target.dataset.id);
      openBooking(stylistId);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const closeModalButton = document.getElementById('closeModal');
  closeModalButton?.addEventListener('click', closeModal);
});

