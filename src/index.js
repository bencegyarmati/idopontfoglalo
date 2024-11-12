console.log('Betöltve');

"use strict";

// Importáljuk a render.ts fájlból a renderHairStylists függvényt
import { renderHairStylists } from './render.js';

// Az adatok betöltése a localStorage-ból
// Az adatok betöltése a localStorage-ból

// JSON adatok
const hairSalonData = [
  {
    id: 1,
    neve: "Fodrász Fruzsi",
    nyitvatartas: [
      { nap: "Hétfő", napIndex: 1, tol: "10:00", ig: "15:30" },
      { nap: "Szerda", napIndex: 3, tol: "9:00", ig: "14:30" },
      { nap: "Szombat", napIndex: 6, tol: "10:00", ig: "13:00" },
    ],
    idopontfoglals: [],
  },
  {
    id: 2,
    neve: "Fodrász Mária",
    nyitvatartas: [
      { nap: "Kedd", napIndex: 2, tol: "9:00", ig: "15:00" },
      { nap: "Csütörtök", napIndex: 4, tol: "9:00", ig: "15:00" },
    ],
    idopontfoglals: [],
  },
];

// Fodrászok megjelenítése a listában
document.addEventListener('DOMContentLoaded', () => {
  renderHairStylists(hairSalonData);
});
