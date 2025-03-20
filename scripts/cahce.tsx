import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'cache');

const ensureCacheDir = () => {
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
};

const cacheFile = (filename: string, data: any): void => {
    try {
        ensureCacheDir();
        const filePath = path.join(CACHE_DIR, filename);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Cached file: ${filePath}`);
    } catch (err: unknown) {
        handleError(err);
    }
};

const readCache = (filename: string): any | null => {
    try {
        const filePath = path.join(CACHE_DIR, filename);
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        }
    } catch (err: unknown) {
        handleError(err);
    }
    return null;
};

const handleError = (err: unknown): void => {
    if (err instanceof Error) {
        console.error("Error occurred:", err.message);
    } else {
        console.error("An unknown error occurred", err);
    }
};

export { cacheFile, readCache };
