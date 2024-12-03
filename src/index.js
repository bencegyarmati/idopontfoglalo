import { renderHairStylists } from './render.js';
import { hairSalonData } from './data.js';
const localHairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');
renderHairStylists(localHairSalonData);
// Ha a 'hairSalon' kulcs nincs jelen a localStorage-ban, feltöltjük az alapértelmezett értékekkel
if (!localStorage.getItem('hairSalon')) {
    localStorage.setItem('hairSalon', JSON.stringify(hairSalonData));
}
