/**
 * Modul API Service
 * Menangani penarikan data dari backend Google Apps Script
 */

import { CONFIG } from './config.js';

export async function fetchCatalogData() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(CONFIG.API_URL, {
      method: 'GET',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: Status ${response.status} (${response.statusText})`);
    }

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error(data.message || 'Gagal memproses data dari spreadsheet');
    }

    return {
      store: data.store || {},
      products: Array.isArray(data.products) ? data.products : []
    };

  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error('Koneksi timeout: Google Apps Script memakan waktu terlalu lama.');
      throw new Error('Waktu permintaan habis (timeout). Silakan periksa koneksi internet Anda.');
    }

    console.error('Terjadi kesalahan saat memuat data:', error);
    throw error;
  }
}