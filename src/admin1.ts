import { hairSalonData } from './data1.js';

// Foglalások betöltése a localStorage-ból
const loadAppointments = (): Array<any> => {
  const appointments = localStorage.getItem('appointments');
  return appointments ? JSON.parse(appointments) : [];
};

// Foglalások mentése a localStorage-ba
const saveAppointments = (appointments: Array<any>) => {
  localStorage.setItem('appointments', JSON.stringify(appointments));
};

// Admin panel megjelenítése
export const displayAdminPanel = () => {
  const adminPanel = document.getElementById('adminPanel')!;
  const appointmentList = document.getElementById('appointmentList')!;
  
  // Töröljük a meglévő tartalmat
  appointmentList.innerHTML = '';

  // Betöltjük az időpontokat
  const appointments = loadAppointments();

  // Időpontok listázása
  appointments.forEach((appointment) => {
    const row = document.createElement('tr');

    const stylistCell = document.createElement('td');
    stylistCell.textContent = hairSalonData.find(stylist => stylist.id === appointment.stylistId)?.neve || 'N/A';

    const guestCell = document.createElement('td');
    guestCell.textContent = appointment.guestName || 'Ismeretlen';

    const dateCell = document.createElement('td');
    dateCell.textContent = appointment.date;

    const timeCell = document.createElement('td');
    timeCell.textContent = appointment.time;

    row.appendChild(stylistCell);
    row.appendChild(guestCell);
    row.appendChild(dateCell);
    row.appendChild(timeCell);

    appointmentList.appendChild(row);
  });

  // Megjelenítjük az admin panelt
  adminPanel.style.display = 'block';
};

// Új foglalás mentése
export const saveAppointment = (stylistId: number, guestName: string, date: string, time: string) => {
  const appointments = loadAppointments();

  // Új foglalás hozzáadása
  appointments.push({ stylistId, guestName, date, time });
  saveAppointments(appointments);
};
