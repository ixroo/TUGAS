# 🛒 Web Katalog Produk Dinamis (Google Sheets + WhatsApp)

Website katalog toko online berbasis **HTML, CSS, dan Vanilla JavaScript (ES6 Modules)** dengan sistem headless database menggunakan **Google Sheets** via **Google Apps Script (GAS)**, serta fitur transaksi langsung terhubung ke **WhatsApp**.

---

## 🌟 Fitur Utama

- ⚡ **Tanpa Backend Berat**: Tidak membutuhkan server backend berbayar; memanfaatkan Google Sheets sebagai database gratis.
- 🛠️ **Full Customization via Sheets**: Nama toko, slogan, nomor WhatsApp admin, hingga link logo dapat diubah langsung dari tab Google Sheets tanpa menyentuh kode HTML.
- 📦 **Manajemen Produk Fleksibel**: Tambah, edit harga, deskripsi, dan status ketersediaan barang secara realtime dari spreadsheet.
- 💬 **Direct WhatsApp Checkout**: Tombol order otomatis merangkai format pesan detail produk (nama & harga) dan langsung mengarahkan ke obrolan WhatsApp resmi (`wa.me`).
- 📂 **Struktur Kode Modular**: Logika terpisah rapi berbasis fitur (API, manipulasi DOM toko, rendering produk, dan handler WhatsApp).
- 📱 **Desain Responsif**: Tampilan optimal di perangkat mobile maupun desktop.

---

## 📁 Struktur File Proyek

```text
katalog-toko/
├── index.html              # Kerangka utama website
├── README.md               # Dokumentasi proyek
├── css/
│   ├── style.css           # Styling dasar, tema, & kartu produk
│   └── responsive.css      # Penyesuaian tata letak untuk mobile/tablet
├── js/
│   ├── config.js           # Endpoint URL Google Apps Script
│   ├── api.js              # Fetching data dari Google Sheets (JSON)
│   ├── store.js            # Injeksi data konfigurasi toko ke DOM
│   ├── products.js         # Rendering dinamis daftar kartu produk
│   ├── whatsapp.js         # Generator link wa.me & pesan otomatis
│   └── app.js              # Inisialisasi utama & orkestrasi modul
└── gas/
    └── Code.gs             # Skrip Google Apps Script untuk API JSON 