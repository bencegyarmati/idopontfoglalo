import { renderHairStylists } from './render';

const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
renderHairStylists(hairSalonData);


