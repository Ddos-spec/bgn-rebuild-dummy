# BGN Website Rebuild & Clone App

Aplikasi pembungkus statis (wrapper static app) yang menyajikan website resmi Badan Gizi Nasional (BGN) secara offline/statis dengan integritas layout, style, dan interaksi JS/Alpine.js yang dipertahankan penuh dari cermin web aslinya.

## 🚀 Fitur & Penyesuaian
- **Multi-Page Static App**: Dibangun menggunakan Vite untuk penyajian static pages yang performant dan andal.
- **Visual Restoration**: Bug jalur cermin yang mengalami distorsi path (`index.html`) telah dipulihkan sepenuhnya menjadi `/` secara otomatis di semua file HTML.
- **Sticky Disclaimer Banner**: Ditambahkan banner di bagian atas seluruh halaman untuk menegaskan status situs dummy internal dan bukan merupakan situs resmi.
- **Lazy Loading**: Diterapkan `loading="lazy"` pada semua gambar untuk optimalisasi performa.
- **Alt Text Validation**: Menambahkan fallback atribut `alt` pada semua gambar yang tidak memiliki keterangan.
- **Link Patching**: Tautan broken `sppg-march` dialihkan secara relatif ke `/coming-soon.html` (halaman fallback statis).

## 🛠️ Pengembangan Lokal

### Prasyarat
- Node.js (v18+)
- npm

### Menjalankan Server Dev
Jalankan dev server Vite untuk melakukan preview lokal:
```bash
npm run dev
```

### Build Produksi
Kompilasi semua halaman menjadi aset statis murni di folder `dist/`:
```bash
npm run build
```

## ⚠️ Disclaimer
*Situs ini merupakan dummy internal untuk keperluan simulasi/validasi tim BGN dan **bukan** merupakan situs resmi Badan Gizi Nasional.*
