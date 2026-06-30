# OPTIMIZATION & SEO PLAN

Dokumen ini menjelaskan strategi optimalisasi performa halaman static dan struktur SEO yang diterapkan pada aplikasi wrapper BGN Clone ini.

## 1. Optimalisasi Performa Halaman Statis

### A. Lazy Loading Gambar
- **Status**: **Sudah Diterapkan** secara global via script pemrosesan HTML.
- **Teknis**: Semua tag `<img>` yang belum memiliki atribut `loading` disisipi atribut `loading="lazy"` secara otomatis. Ini mengurangi overhead download gambar saat inisialisasi halaman.

### B. Minifikasi Aset & Bundling
- **Status**: **Sudah Diterapkan** via Vite.
- **Teknis**: Vite mem-bundle Javascript dan CSS pendukung proyek (seperti modulepreload polyfill) dan mengompresnya untuk loading yang lebih cepat.

### C. Pembersihan Script Eksternal Berat
- **Rencana Selanjutnya**: Menghapus widget chat pihak ketiga atau library eksternal yang tidak diperlukan apabila tim internal BGN memutuskan untuk deploy ke produksi.

---

## 2. Struktur SEO & Aksesibilitas (WCAG)

### A. Fallback Alt Text Gambar
- **Status**: **Sudah Diterapkan**.
- **Teknis**: Semua gambar yang tidak memiliki atribut `alt` atau memiliki `alt=""` dipasang atribut default `alt="Aset Badan Gizi Nasional (BGN) - Dummy Konten"` untuk membantu web crawler SEO dan pembaca layar (screen readers).

### B. Tag Heading (h1-h6) & Semantik HTML
- **Look Preservation**: Menjaga struktur heading awal agar desain visual tidak berubah.
- **Rekomendasi**: Mengubah beberapa tag `<div>` yang bertindak sebagai heading teks tebal menjadi tag heading semantik (`<h2>` / `<h3>`) untuk optimasi scanning SEO.
