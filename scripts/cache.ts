import fs from 'fs/promises';
import path from 'path';

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
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            // Menangani jika file ada tapi gagal dibaca
            console.error(`Failed to read file: ${filePath}`, err);
            return null;
        }
    } catch (err) {
        // Menangani jika file tidak ada atau error lainnya
        handleError(err);
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

// Menyimpan data ke cache/data.js
const generateData = async (): Promise<void> => {
    const data = { key: 'value' }; // Sesuaikan data yang ingin kamu simpan
    await cacheFile('data.js', data);
    console.log('Data successfully cached to data.js');
};

// Panggil fungsi generateData untuk memastikan file cache/data.js dibuat
generateData().catch(handleError);

export { cacheFile, readCache };
