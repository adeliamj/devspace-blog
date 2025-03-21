import { NextResponse } from "next/server"; // Import NextResponse untuk mengembalikan response dalam Next.js API
import fs from "fs"; // Import modul fs untuk membaca file sistem
import path from "path"; // Import modul path untuk menangani path file secara cross-platform
import matter from "gray-matter"; // Import gray-matter untuk parsing frontmatter dari file Markdown

// Handler untuk menangani request GET
export async function GET(request: Request) {
  let posts: { slug: string; frontmatter: any }[] = [];

  // Menentukan direktori tempat menyimpan file Markdown
  const postsDirectory = path.join(process.cwd(), "src", "posts");

  // Mengecek apakah direktori posts ada
  if (fs.existsSync(postsDirectory)) {
    // Membaca daftar file di dalam direktori
    const files = fs.readdirSync(postsDirectory);

    // Memfilter hanya file Markdown dan memprosesnya
    posts = files
      .filter((filename) => filename.endsWith(".md")) // Hanya ambil file dengan ekstensi .md
      .map((filename) => {
        const slug = filename.replace(".md", ""); // Menghapus ekstensi untuk dijadikan slug

        // Membaca isi file Markdown
        const markdownWithMeta = fs.readFileSync(
          path.join(postsDirectory, filename),
          "utf-8"
        );

        // Parsing frontmatter dari Markdown
        const { data: frontmatter } = matter(markdownWithMeta);

        return {
          slug, // Menyimpan slug (nama file tanpa ekstensi)
          frontmatter, // Menyimpan metadata dari Markdown
        };
      });
  } else {
    console.error("Posts directory not found"); // Log error jika direktori tidak ditemukan
  }

  console.log("All posts:", posts); // Menampilkan semua data posts dalam log

  // Mengambil query pencarian dari URL
  const searchQuery = new URL(request.url).searchParams.get("q")?.toLowerCase() || "";

    // Filter data berdasarkan query
  const results = posts.filter(({ frontmatter }) =>
    ["title", "excerpt", "category"] // Mencari di dalam title, excerpt, dan category
      .map((key) => frontmatter[key]?.toLowerCase() || "") // Mengubah ke huruf kecil untuk pencocokan
      .some((field) => field.includes(searchQuery)) // Memeriksa apakah query ada di salah satu field
  );

  console.log("Search Results:", results); // Menampilkan hasil pencarian dalam log

  return NextResponse.json({ results }); // Mengembalikan hasil pencarian dalam format JSON
}
