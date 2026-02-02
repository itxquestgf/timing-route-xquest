# Route Timing System

Sistem web untuk mencatat dan memonitor waktu setiap rute kegiatan secara berurutan.
Dirancang untuk penggunaan **operasional lapangan / officer**, aman digunakan di perangkat mobile.

---

## ✨ Fitur Utama

- ⏱️ Timer per rute (akurasi milidetik)
- 🔄 Timer **tetap berjalan** walau:
  - halaman di-refresh
  - pindah ke halaman Result
- 📍 Posisi rute terakhir **tersimpan otomatis**
- ⏭️ STOP → simpan waktu & lanjut ke rute berikutnya
- 👀 Preview **Next Route** dengan transparansi rendah
- 🗑️ Hapus timing per rute
- 🔁 Reset semua timing
- 📄 Unduh laporan hasil timing (`.txt`)
- 📱 UI stabil & aman untuk mobile

---

## 🛠️ Teknologi

- **Vite + React**
- **Tailwind CSS**
- **LocalStorage** (persist data & timer)
- **React Router**

---

## 📁 Struktur Singkat


---

## ▶️ Cara Penggunaan

### 1. Halaman Timer
- Tekan **START** untuk memulai timer
- Tekan **STOP & NEXT** untuk:
  - menyimpan waktu rute
  - otomatis pindah ke rute berikutnya
- Gunakan **⬅️ / ➡️** untuk berpindah rute manual
- **RESET** hanya mereset rute aktif

### 2. Halaman Result
- Melihat seluruh hasil timing
- 🗑️ Hapus timing per rute
- 🔁 Reset semua timing
- ⬇️ Unduh data timing dalam format `.txt`

---

## 📄 Format File Unduhan

**timing_route_yyyy-mm-dd.txt**

---

## 🔐 Persistensi Data

Disimpan di `localStorage`:
- `results` → hasil timing per rute
- `currentRouteIndex` → posisi rute terakhir
- `timerRunning` → status timer
- `timerStart` → timestamp mulai
- `timerElapsed` → akumulasi waktu

---

## ⚠️ Catatan Operasional

- Cocok untuk **penggunaan internal**
- Tidak membutuhkan koneksi internet
- Disarankan reset data saat memulai batch / sesi baru

---

## 📜 Lisensi

© 2026 **IT-XQUEST**  
Licensed Software — Internal Use Only

---

## 🚀 Pengembangan Lanjutan (Opsional)

- Export Excel / CSV
- Firebase Realtime Sync
- Multi device monitoring
- Auto alert jika durasi rute melebihi batas
- Mode lock (anti skip)

---

**Made by IT-XQUEST**
