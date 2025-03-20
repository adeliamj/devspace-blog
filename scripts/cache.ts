import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter'; // To parse the frontmatter from markdown files

// Lokasi folder posts
const POSTS_DIR = path.join(process.cwd(), 'src', 'posts');
const CACHE_DIR = path.join(process.cwd(), 'cache');

// Membuat direktori cache jika belum ada
const ensureCacheDir = async (): Promise<void> => {
    try {
        await fs.mkdir(CACHE_DIR, { recursive: true });
    } catch (err) {
        handleError(err);
    }
};

// Menyimpan data ke file cache
const cacheFile = async (filename: string, data: any): Promise<void> => {
    try {
        await ensureCacheDir(); // Pastikan direktori cache ada
        const filePath = path.join(CACHE_DIR, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Cached file: ${filePath}`);
    } catch (err) {
        handleError(err);
    }
};

// Membaca data dari file cache
const readCache = async (filename: string): Promise<any | null> => {
    try {
        const filePath = path.join(CACHE_DIR, filename);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Failed to read file: ${filename}`, err);
        return null;
    }
};

// Fungsi untuk menangani kesalahan
const handleError = (err: unknown): void => {
    if (err instanceof Error) {
        console.error("Error occurred:", err.message);
    } else {
        console.error("An unknown error occurred", err);
    }
};

// Membaca semua file dalam folder posts dan mengembalikan data terstruktur
const getPostsData = async (): Promise<any[]> => {
    try {
        // Membaca semua file dalam folder posts
        const files = await fs.readdir(POSTS_DIR);

        // Mengambil isi dari setiap file dan parse menggunakan gray-matter
        const posts = await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(POSTS_DIR, file);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const { data } = matter(fileContent); // Parsing frontmatter using gray-matter

                return {
                    slug: file.replace('.md', ''), // Assuming all files are .md
                    frontmatter: data
                };
            })
        );

        return posts; // Mengembalikan array data post
    } catch (err) {
        console.error("Error reading posts:", err);
        throw err;
    }
};

// Menyimpan semua data dari folder posts ke dalam cache/data.js
const generateData = async (): Promise<void> => {
    try {
        const data = await getPostsData(); // Mengambil semua data dari file posts
        await cacheFile('data.js', data); // Menyimpan data ke dalam cache/data.js
        console.log('Data successfully cached to data.js');
    } catch (err) {
        handleError(err);
    }
};

// Panggil fungsi generateData untuk memastikan file cache/data.js dibuat
generateData().catch(handleError);

export { cacheFile, readCache };
