/**
 * Konfigurasi Utama Aplikasi Katalog
 */

export const CONFIG = {
  // Ganti string di bawah ini dengan URL Web App hasil deploy Google Apps Script kamu
  API_URL: 'https://script.google.com/macros/s/AKfycbzU_JrBxOKbv63vpF05-B9960b4YT2D19zeol6Pwzkt-FDp4kbgObjGfsT0ibVi_ab4/exec',
  
  // Konfigurasi fallback jika data spreadsheet kosong
FALLBACK: {
    STORE_NAME: 'Katalog Toko',
    SLOGAN: 'Katalog Produk Pilihan',
    PHONE: '6281234567890',
    CURRENCY: 'IDR'
  },
  // Timeout fetch dalam milidetik (misal: 15 detik)
  FETCH_TIMEOUT_MS: 15000
};