import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter'; // Untuk parsing frontmatter dari file markdown

// Lokasi folder tempat menyimpan postingan markdown dan folder cache
const POSTS_DIR = path.join(process.cwd(), 'src', 'posts'); // Direktori tempat file markdown disimpan
const CACHE_DIR = path.join(process.cwd(), 'cache'); // Direktori untuk menyimpan file cache

// Fungsi untuk memastikan direktori cache tersedia
const ensureCacheDir = async (): Promise<void> => {
    try {
        // Membuat direktori cache jika belum ada (secara rekursif)
        await fs.mkdir(CACHE_DIR, { recursive: true });
    } catch (err) {
        console.error("Gagal membuat direktori cache:", err);
    }
};

// Fungsi untuk menyimpan data ke file cache
const cacheFile = async (filename: string, data: any): Promise<void> => {
    try {
        await ensureCacheDir(); // Pastikan direktori cache tersedia
        const filePath = path.join(CACHE_DIR, filename); // Path lengkap file cache
        const fileContent = `export const posts = ${JSON.stringify(data, null, 2)};`; // Format data sebagai ekspor JavaScript
        await fs.writeFile(filePath, fileContent, 'utf-8'); // Menulis data ke file
        console.log(`File cache berhasil dibuat: ${filePath}`);
    } catch (err) {
        console.error(`Gagal menyimpan file cache: ${filename}`, err);
    }
};


// Fungsi untuk membaca data dari file cache
const readCache = async (filename: string): Promise<any | null> => {
    try {
        const filePath = path.join(CACHE_DIR, filename);  // Path lengkap file cache
        const data = await fs.readFile(filePath, 'utf-8'); // Membaca isi file cache
        return JSON.parse(data.replace(/^export const posts = /, '')); // Menghapus bagian ekspor JS dan mengurai JSON
    } catch (err) {
        console.error(`Gagal membaca file cache: ${filename}`, err);
        return null; // Mengembalikan null jika terjadi kesalahan
    };
}

// Fungsi untuk membaca semua file markdown dalam folder posts
const getPostsData = async (): Promise<any[]> => {
    try {
        const files = await fs.readdir(POSTS_DIR); // Membaca daftar file dalam folder posts

        // Memfilter hanya file dengan ekstensi .md (Markdown)
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        // Memproses setiap file markdown
        const posts = await Promise.all(
            markdownFiles.map(async (file) => {
                const filePath = path.join(POSTS_DIR, file);  // Path lengkap file
                const fileStat = await fs.stat(filePath); // Mengambil informasi file (termasuk tanggal modifikasi)
                const fileContent = await fs.readFile(filePath, 'utf-8'); // Membaca isi file markdown
                const { data } = matter(fileContent); // Parsing frontmatter dari markdown

                // Pastikan metadata memiliki title dan date
                if (!data.title || !data.date) {
                    console.warn(`File ${file} tidak memiliki frontmatter yang lengkap, diabaikan.`);
                    return null;
                }

                return {
                    slug: file.replace('.md', ''), // Membuat slug dari nama file (menghapus ekstensi .md)
                    frontmatter: {
                        title: data.title,
                        date: data.date,
                        tags: data.tags || [], // Tambahkan tags jika ada
                        lastModified: fileStat.mtime.toISOString(), // Tambahkan tanggal modifikasi
                    }
                };
            })
        );

        return posts.filter(post => post !== null); // Menghapus nilai null dari hasil
    } catch (err) {
        console.error("Gagal membaca posts:", err);
        throw err;
    }
};

// Menyimpan semua data dari folder posts ke dalam cache/data.js
const generateData = async (): Promise<void> => {
    try {
        const data = await getPostsData(); // Mengambil semua data dari file posts
        await cacheFile('data.js', data); // Menyimpan data ke dalam cache/data.js
        console.log('Data posts berhasil disimpan ke dalam cache/data.js');
    } catch (err) {
        console.error("Gagal menghasilkan data:", err);
    }
};

// Panggil fungsi generateData untuk memastikan file cache/data.js dibuat
generateData().catch(err => console.error("Terjadi kesalahan:", err));

export { cacheFile, readCache, getPostsData };
