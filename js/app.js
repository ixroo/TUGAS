/**
 * Main Application Orchestrator
 * Inisialisasi aplikasi katalog toko
 */

import { fetchCatalogData } from './api.js';
import { renderStoreInfo } from './store.js';
import { renderProducts } from './products.js';

/**
 * Atur tampilan status memuat data (Loading indicator)
 * @param {boolean} isLoading 
 */
function toggleLoading(isLoading) {
  const loadingElement = document.querySelector('#loading-state') || document.querySelector('.loading');
  if (loadingElement) {
    loadingElement.style.display = isLoading ? 'flex' : 'none';
  }
}

/**
 * Tampilkan pesan kegagalan jika pengambilan data dari GAS bermasalah
 * @param {string} message 
 */
function renderError(message) {
  const container = document.querySelector('#product-grid') || 
                    document.querySelector('#products-container') || 
                    document.querySelector('.product-grid');

  if (container) {
    container.innerHTML = `
      <div class="error-state">
        <p>Gagal memuat katalog: ${message}</p>
        <button id="retry-btn" class="btn-retry">Coba Lagi</button>
      </div>
    `;

    const retryBtn = document.querySelector('#retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => initApp());
    }
  }
}

/**
 * Inisialisasi alur aplikasi
 */
async function initApp() {
  toggleLoading(true);

  try {
    const data = await fetchCatalogData();
    
    // 1. Render informasi nama toko, slogan, dan kontak
    renderStoreInfo(data.store);

    // 2. Render daftar produk menggunakan nomor WA dari sheet Pengaturan
    const waNumber = data.store ? (data.store.no_wa || data.store.nomor_wa || '') : '';
    renderProducts(data.products, waNumber);

  } catch (error) {
    console.error('Gagal menginisialisasi katalog:', error);
    renderError(error.message || 'Terjadi kesalahan sistem.');
  } finally {
    toggleLoading(false);
  }
}

// Jalankan ketika seluruh struktur DOM sudah selesai dimuat
document.addEventListener('DOMContentLoaded', initApp);