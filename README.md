# OSINT Brain — Company Profile / GitHub Pages
Website statis tanpa backend, database, atau build. Logo dan desain asli dipertahankan.

## Deploy tanpa terminal
1. Ekstrak ZIP. Buka index.html untuk preview. Edit content.js dengan Notepad atau VS Code. Semua teks profil dan layanan adalah draf; pastikan sesuai fakta sebelum publikasi.
2. Buat repository PUBLIC bernama osint-brain di https://github.com/new (akun GitHub Free). Aktifkan Add README jika ingin agar branch main langsung tersedia.
3. Pilih Add file > Upload files. Unggah isi folder hasil ekstrak, termasuk folder assets. Jangan unggah ZIP atau folder induk. Pastikan index.html berada di root repository. Sertakan .nojekyll bila terlihat; ini file kosong opsional untuk melewati Jekyll.
4. Commit changes ke main.
5. Settings > Pages > Build and deployment > Source: Deploy from a branch > Branch: main > /(root) > Save.
6. Cek status di Actions dan Settings > Pages. Buka URL yang ditampilkan, biasanya https://USERNAME.github.io/osint-brain/.
7. Untuk update, edit content.js di GitHub (ikon pensil), lalu Commit changes. Publikasi otomatis setelah deploy berhasil.

## File
- content.js: profil, layanan, visi, misi, kontak.
- index.html: struktur.
- assets/style.css: desain.
- assets/logo.png: logo asli.
- assets/main.js: interaksi.

## Catatan
Semua file repo public dapat dibaca publik. Jangan menyimpan password, API key, data klien atau dokumen rahasia. GitHub Pages hanya untuk situs statis; tidak menjalankan backend/form server-side. Gunakan sebagai profil informatif/showcase, bukan untuk menjalankan bisnis online, transaksi komersial atau SaaS. Jika kebutuhan berkembang menjadi situs bisnis komersial, gunakan hosting yang mengizinkannya.
Dokumentasi: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
Ketentuan: https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features
