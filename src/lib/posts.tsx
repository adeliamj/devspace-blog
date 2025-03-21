import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/utils/page";

// Menentukan lokasi direktori yang menyimpan file Markdown (post)
const postsDirectory = path.join(process.cwd(), "src", "posts");
// Membaca semua nama file dalam direktori posts
const files = fs.readdirSync(postsDirectory);

// Fungsi untuk mendapatkan semua post dari direktori
const getPosts = () => {
    const posts = files.map((filename) => {
        // Menghapus ekstensi .md untuk mendapatkan slug (URL-friendly identifier)
        const slug = filename.replace(".md", "");

        // Membaca isi file Markdown beserta metadata (frontmatter)
        const markdownWithMeta = fs.readFileSync(
            path.join(postsDirectory, filename), // Menggabungkan path direktori dan nama file
            "utf-8" // Menggunakan encoding UTF-8 agar teks dapat terbaca dengan benar
        );

        // Memisahkan metadata (frontmatter) dari konten Markdown
        const { data: frontmatter } = matter(markdownWithMeta);

        return {
            slug, // Slug akan digunakan sebagai bagian dari URL post
            frontmatter, // Metadata
        };
    });

    return posts.sort(sortByDate); // Mengurutkan post berdasarkan tanggal menggunakan fungsi sortByDate
};

export { getPosts };
