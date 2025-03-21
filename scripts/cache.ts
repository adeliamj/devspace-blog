import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter'; // Untuk parsing frontmatter dari file markdown

// Lokasi folder posts dan cache
const POSTS_DIR = path.join(process.cwd(), 'src', 'posts');
const CACHE_DIR = path.join(process.cwd(), 'cache');

// Membuat direktori cache jika belum ada
const ensureCacheDir = async (): Promise<void> => {
    try {
        await fs.mkdir(CACHE_DIR, { recursive: true });
    } catch (err) {
        console.error("Gagal membuat direktori cache:", err);
    }
};

// Menyimpan data ke file cache
const cacheFile = async (filename: string, data: any): Promise<void> => {
    try {
        await ensureCacheDir(); // Pastikan direktori cache ada
        const filePath = path.join(CACHE_DIR, filename);
        const fileContent = `export const posts = ${JSON.stringify(data, null, 2)};`;
        await fs.writeFile(filePath, fileContent, 'utf-8');
        console.log(`File cache berhasil dibuat: ${filePath}`);
    } catch (err) {
        console.error(`Gagal menyimpan file cache: ${filename}`, err);
    }
};

// Membaca data dari file cache
const readCache = async (filename: string): Promise<any | null> => {
    try {
        const filePath = path.join(CACHE_DIR, filename);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data.replace(/^export const posts = /, ''));
    } catch (err) {
        console.error(`Gagal membaca file cache: ${filename}`, err);
        return null;
    }
};

// Membaca semua file Markdown dalam folder posts dan mengembalikan data terstruktur
const getPostsData = async (): Promise<any[]> => {
    try {
        const files = await fs.readdir(POSTS_DIR);
        
        // Filter hanya file markdown
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        // Memproses setiap file markdown
        const posts = await Promise.all(
            markdownFiles.map(async (file) => {
                const filePath = path.join(POSTS_DIR, file);
                const fileStat = await fs.stat(filePath);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const { data } = matter(fileContent); // Parsing frontmatter

                // Pastikan metadata memiliki title dan date
                if (!data.title || !data.date) {
                    console.warn(`File ${file} tidak memiliki frontmatter yang lengkap, diabaikan.`);
                    return null;
                }

                return {
                    slug: file.replace('.md', ''),
                    frontmatter: {
                        title: data.title,
                        date: data.date,
                        tags: data.tags || [], // Tambahkan tags jika ada
                        lastModified: fileStat.mtime.toISOString(), // Tambahkan tanggal modifikasi
                    }
                };
            })
        );

        return posts.filter(post => post !== null); // Hapus null dari hasil
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
