/**
 * Main Application Orchestrator
 * Inisialisasi aplikasi katalog toko dan penanganan filter/pencarian
 */

import { fetchCatalogData } from './api.js';
import { renderStoreInfo } from './store.js';
import { renderProducts } from './products.js';

// State lokal untuk menampung data katalog
let masterProducts = [];
let targetWaNumber = '';
let selectedCategory = 'all';
let currentSearchTerm = '';

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
 * Filter daftar produk berdasarkan kategori aktif dan kata kunci pencarian
 */
function applyFilters() {
  const keyword = currentSearchTerm.trim().toLowerCase();

  const filtered = masterProducts.filter(item => {
    // 1. Cek filter kategori
    const itemCategory = (item.kategori || '').toLowerCase();
    const matchCategory = selectedCategory === 'all' || itemCategory === selectedCategory;

    // 2. Cek kecocokan pencarian pada nama dan deskripsi
    const itemName = (item.nama || '').toLowerCase();
    const itemDesc = (item.deskripsi || '').toLowerCase();
    const matchSearch = !keyword || itemName.includes(keyword) || itemDesc.includes(keyword);

    return matchCategory && matchSearch;
  });

  renderProducts(filtered, targetWaNumber);
}

/**
 * Pasang event listener pada kolom pencarian produk
 */
function setupSearchListener() {
  const searchInput = document.getElementById('input-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (event) => {
    currentSearchTerm = event.target.value;
    applyFilters();
  });
}

/**
 * Bangun daftar tombol filter kategori secara dinamis dari produk yang ada
 */
function setupCategoryFilters() {
  const filterContainer = document.getElementById('category-filters');
  if (!filterContainer) return;

  // Ekstrak kategori unik dari data produk
  const categories = new Set();
  masterProducts.forEach(item => {
    if (item.kategori && item.kategori.trim() !== '') {
      categories.add(item.kategori.trim());
    }
  });

  // Tombol default 'Semua'
  let html = `<button class="filter-btn active" data-category="all">Semua</button>`;
  
  categories.forEach(cat => {
    html += `<button class="filter-btn" data-category="${cat.toLowerCase()}">${cat}</button>`;
  });

  filterContainer.innerHTML = html;

  // Handler pergantian tab kategori
  filterContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-btn');
    if (!button) return;

    filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    selectedCategory = button.getAttribute('data-category') || 'all';
    applyFilters();
  });
}

/**
 * Inisialisasi alur aplikasi
 */
async function initApp() {
  toggleLoading(true);

  try {
    const data = await fetchCatalogData();
    
    // 1. Perbarui identitas toko
    renderStoreInfo(data.store);

    // 2. Simpan data ke memori aplikasi
    masterProducts = Array.isArray(data.products) ? data.products : [];
    targetWaNumber = data.store ? (data.store.no_wa || data.store.nomor_wa || '') : '';

    // 3. Pasang event listener untuk search dan kategori
    setupSearchListener();
    setupCategoryFilters();

    // 4. Render seluruh produk pertama kali
    renderProducts(masterProducts, targetWaNumber);

  } catch (error) {
    console.error('Gagal menginisialisasi katalog:', error);
    renderError(error.message || 'Terjadi kesalahan sistem.');
  } finally {
    toggleLoading(false);
  }
}

// Jalankan saat DOM sudah siap
document.addEventListener('DOMContentLoaded', initApp);