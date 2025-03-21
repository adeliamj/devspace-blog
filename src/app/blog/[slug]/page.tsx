import fs from "fs"; // Modul untuk membaca file sistem
import path from "path"; // Modul untuk menangani path secara cross-platform
import Link from "next/link"; // Modul Next.js untuk navigasi antar halaman
import matter from "gray-matter"; // Untuk parsing metadata (frontmatter) dari file Markdown
import { marked } from "marked"; // Untuk mengonversi Markdown menjadi HTML
import CategoryLabel from "@/components/CategoryLabel"; // Komponen untuk menampilkan label kategori

// Metadata halaman
export const metadata = {
  title: "Blog DevSpace",
};

// Fungsi untuk mengambil konten dari file Markdown berdasarkan slug
const getPostContent = async (slug: string) => {
  const postsDirectory = path.join(process.cwd(), "src", "posts"); // Menentukan lokasi direktori posts
  const filePath = path.join(postsDirectory, `${slug}.md`);  // Path file berdasarkan slug

  // Mengecek apakah file ada
  if (!fs.existsSync(filePath)) {
    return null; // Jika tidak ada, kembalikan null
  }

  // Membaca isi file Markdown
  const markdownWithMeta = await fs.promises.readFile(filePath, "utf-8");
  // Parsing frontmatter (metadata) dan konten dari Markdown
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return { frontmatter, content };
};

// Interface untuk properti komponen PostPage
interface PostPageProps {
  params: Promise<{ slug: string }>; // Properti params berupa promise yang berisi slug
}

// Komponen halaman blog berdasarkan slug
const PostPage = async ({ params }: PostPageProps) => {
  const resolvedParams = await params;  // Menunggu params selesai diproses
  const { slug } = resolvedParams; // Mengambil slug dari params

  // Jika slug tidak valid, tampilkan pesan error
  if (!slug) {
    return (
      <div>
        <h1>Invalid Post</h1>
        <Link href="/blog">Go Back</Link>
      </div>
    );
  }

  const post = await getPostContent(slug); // Mengambil data post berdasarkan slug

  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
        <Link href="/blog">Go Back</Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/blog">Go Back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{post.frontmatter.title}</h1>
          <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
        </div>
        <img
          src={post.frontmatter.cover_image}
          alt={post.frontmatter.title}
          className="w-full rounded"
        />

        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={post.frontmatter.author_image}
              alt={post.frontmatter.author}
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h4>{post.frontmatter.author}</h4>
          </div>
          <div className="mr-4">{post.frontmatter.date}</div>
        </div>
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}></div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
