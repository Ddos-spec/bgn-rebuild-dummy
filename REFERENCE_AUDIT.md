# REFERENCE AUDIT — WEBPAGE RESTORATION

Dokumen ini menjelaskan audit teknis yang dilakukan pada file cermin baseline dari `mirror-bgn` dan langkah perbaikan yang diimplementasikan di `bgn-clone-app`.

## 1. Analisis Bug Cermin Baseline
Selama audit awal pada folder `mirror-bgn/www.bgn.go.id`, ditemukan bug besar di mana seluruh karakter slash `/` diubah menjadi `index.html` pada file HTML.

### Contoh Kasus Distorsi:
- **Sebelum Perbaikan**: `<index.htmlscript>` | `href="index.htmlteam"` | `src="index.htmlBGN_LOGO.png"`
- **Setelah Perbaikan**: `</script>` | `href="/team"` | `src="/BGN_LOGO.png"`

### Tindakan Pemulihan:
Kami menjalankan script `fix-mirror.mjs` di direktori baseline untuk menormalkan kembali seluruh file HTML sebelum disalin ke wrapper app.

---

## 2. Audit Tautan (Links) & Aset

### A. Tautan Gagal (`sppg-march`)
- **Detail**: Halaman `sppg-march` gagal dirayap (404 Not Found di server pusat).
- **Penanganan**: Dialihkan ke path relatif `coming-soon.html` (misalnya `../../coming-soon.html` pada subfolder level 2). Hal ini memastikan navigasi tidak terputus dan tidak melempar error 404 pada server lokal.

### B. Aset Gambar CDN (`cdn-web.bgn.go.id`)
- **Detail**: Gambar berita dan carousel utama di-load secara langsung dari CDN absolut `https://cdn-web.bgn.go.id/`.
- **Penanganan**: Aset dipertahankan dengan link CDN-nya untuk mengurangi ukuran repositori. Pada mode preview offline, gambar ini akan di-render menggunakan fallback alt text atau placeholder.

### C. Script Berat & Tracker
- **Detail**: Ditemukan script tracking view statis (`/api/track-view`) yang mencoba mengirim request POST.
- **Penanganan**: Karena ini aplikasi static/dummy, request ini akan gagal di latar belakang tanpa merusak fungsionalitas UI utama. Konfigurasi ini dibiarkan sebagai bagian dari preserve look & feel asli.
