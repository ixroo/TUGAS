import { createWhatsAppOrderLink } from './whatsapp.js';

export function formatCurrency(amount) {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return 'Hubungi Admin';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(numericAmount);
}

function createProductCardMarkup(product, waNumber) {
  const orderUrl = createWhatsAppOrderLink(waNumber, product);
  const formattedPrice = formatCurrency(product.harga);
  const defaultImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="1"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpolyline points="21 15 16 10 5 21"/%3E%3C/svg%3E';
  const imageUrl = product.gambar || defaultImage;
  const categoryBadge = product.kategori 
    ? `<span class="product-badge">${product.kategori}</span>` 
    : '';

  return `
    <article class="product-card" data-category="${(product.kategori || '').toLowerCase()}">
      <div class="product-image-container">
        <img 
          src="${imageUrl}" 
          alt="${product.nama || 'Produk'}" 
          class="product-image"
          loading="lazy"
          onerror="this.onerror=null; this.src='${defaultImage}';"
        />
        ${categoryBadge}
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.nama || 'Nama Produk'}</h3>
        <p class="product-description">${product.deskripsi || ''}</p>
        <div class="product-action-row">
          <span class="product-price">${formattedPrice}</span>
          <a 
            href="${orderUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-order"
          >
            Pesan via WA
          </a>
        </div>
      </div>
    </article>
  `;
}

export function renderProducts(products = [], waNumber = '') {
  const container = document.getElementById('product-grid') || document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');

  if (!container) return;

  if (!Array.isArray(products) || products.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  container.innerHTML = products
    .map(product => createProductCardMarkup(product, waNumber))
    .join('');
}