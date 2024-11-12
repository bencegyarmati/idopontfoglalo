import { renderHairStylists } from './render';
import { openBooking } from './booking';
import { displayAdminPanel } from './admin';

const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
renderHairStylists(hairSalonData);


