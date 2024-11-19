import { renderHairStylists } from './render.js';
const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
renderHairStylists(hairSalonData);
