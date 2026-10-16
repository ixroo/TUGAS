/**
 * Modul Pengelola Informasi Toko
 * Mengisi dan memperbarui elemen identitas toko di DOM
 */

import { CONFIG } from './config.js';

/**
 * Render data pengaturan toko ke elemen-elemen DOM
 * @param {Object} storeData - Data toko dari sheet Pengaturan
 */
export function renderStoreInfo(storeData = {}) {
  const storeName = storeData.nama_toko || CONFIG.FALLBACK.STORE_NAME;
  const slogan = storeData.slogan || CONFIG.FALLBACK.SLOGAN;
  const currentYear = new Date().getFullYear();

  // 1. Update judul dokumen browser
  document.title = `${storeName} | ${slogan}`;

  // 2. Update elemen nama toko (pencarian fleksibel ID atau class)
  const storeNameElements = document.querySelectorAll('#store-name, .store-name');
  storeNameElements.forEach(el => {
    el.textContent = storeName;
  });

  // 3. Update elemen slogan/deskripsi toko
  const sloganElements = document.querySelectorAll('#store-slogan, .store-slogan');
  sloganElements.forEach(el => {
    el.textContent = slogan;
  });

  // 4. Update elemen footer dan tahun hak cipta
  const footerYearElements = document.querySelectorAll('#footer-year, .current-year');
  footerYearElements.forEach(el => {
    el.textContent = currentYear;
  });

  const footerStoreElements = document.querySelectorAll('#footer-store-name, .footer-store-name');
  footerStoreElements.forEach(el => {
    el.textContent = storeName;
  });

  // 5. Update link kontak WhatsApp langsung di navbar/header jika ada
  const contactLinks = document.querySelectorAll('a[data-role="contact-wa"]');
  if (contactLinks.length > 0 && storeData.no_wa) {
    const rawWa = storeData.no_wa;
    const cleanWa = String(rawWa).replace(/\D/g, '').replace(/^0/, '62');
    contactLinks.forEach(link => {
      link.href = `https://wa.me/${cleanWa}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }
}