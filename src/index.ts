import { renderHairStylists } from './render';
import { hairSalonData } from './data';
import { openBooking } from './booking';
import { displayAdminPanel } from './admin';


const localHairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
renderHairStylists(localHairSalonData);


