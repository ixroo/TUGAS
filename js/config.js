/**
 * Konfigurasi Utama Aplikasi Katalog
 */

export const CONFIG = {
  // Ganti string di bawah ini dengan URL Web App hasil deploy Google Apps Script kamu
  API_URL: 'https://ixroo.github.io/TUGAS/',
  
  // Konfigurasi fallback jika data spreadsheet kosong
  FALLBACK: {
    STORE_NAME: 'Ixro Store',
    SLOGAN: 'Silahkan kalau mau beli :)',
    PHONE: '6289530723264',
    CURRENCY: 'IDR'
  },
  
  // Timeout fetch dalam milidetik (misal: 15 detik)
  FETCH_TIMEOUT_MS: 15000
};