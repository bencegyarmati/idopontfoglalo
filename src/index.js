console.log('Betöltve');

"use strict";

// Importáljuk a render.ts fájlból a renderHairStylists függvényt
import { renderHairStylists } from './render.js';

// Az adatok betöltése a localStorage-ból
const hairSalonData = JSON.parse(localStorage.getItem('hairSalon') || '[]');

// A renderelés meghívása
renderHairStylists(hairSalonData);
