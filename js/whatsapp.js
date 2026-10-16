/**
 * Modul WhatsApp Generator
 * Menangani normalisasi nomor telepon dan pembuatan link pemesanan otomatis
 */

import { CONFIG } from './config.js';

/**
 * Normalisasi nomor HP agar sesuai standar wa.me (format 628xxx)
 * @param {string|number} phone 
 * @returns {string}
 */
export function normalizePhoneNumber(phone) {
  if (!phone) {
    return CONFIG.FALLBACK.PHONE;
  }

  // Hapus semua karakter non-angka (spasi, tanda plus, tanda hubung)
  let cleanNumber = String(phone).replace(/\D/g, '');

  // Jika berawalan '0', ganti jadi '62'
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '62' + cleanNumber.slice(1);
  }
  // Jika berawalan '8', tambahkan '62' di depannya
  else if (cleanNumber.startsWith('8')) {
    cleanNumber = '62' + cleanNumber;
  }

  return cleanNumber;
}

/**
 * Membuat URL checkout WhatsApp dengan template pesan rapi
 * @param {string|number} phone - Nomor WhatsApp admin/toko
 * @param {Object} product - Objek data produk (nama, harga, kategori)
 * @returns {string}
 */
export function createWhatsAppOrderLink(phone, product) {
  const targetNumber = normalizePhoneNumber(phone);
  const productName = product.nama || 'Produk';
  
  // Format harga ke format Rupiah standar untuk pesan WA
  const formattedPrice = typeof product.harga === 'number' 
    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.harga)
    : product.harga || 'Hubungi Admin';

  const messageLines = [
    'Halo Admin, saya tertarik untuk memesan produk ini:',
    '',
    `*Nama Produk:* ${productName}`,
    `*Kategori:* ${product.kategori || '-'}`,
    `*Harga:* ${formattedPrice}`,
    '',
    'Apakah stok produk ini masih tersedia?'
  ];

  const fullMessage = messageLines.join('\n');
  const encodedMessage = encodeURIComponent(fullMessage);

  return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
}