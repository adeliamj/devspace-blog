import Post from '@/components/Post'; // Komponen untuk menampilkan post
import CategoryList from '@/components/CategoryList'; // Komponen daftar kategori
import { getPosts } from '@/lib/posts'; // Fungsi untuk mendapatkan semua post
import { notFound } from 'next/navigation'; // Fungsi untuk menangani halaman tidak ditemukan

// Fungsi untuk menghasilkan parameter statis berdasarkan kategori unik dari semua post
export const generateStaticParams = async () => {
  const posts = await getPosts(); // Mengambil semua post

    // Mendapatkan daftar kategori unik dalam huruf kecil
  const uniqueCategories = [
    ...new Set(
      posts
        .map(post => post.frontmatter.category?.toLowerCase()) // Mengubah kategori ke lowercase
        .filter(category => category) // Menghapus nilai undefined/null
    )
  ];

    // Mengembalikan array objek dengan format { category_name: kategori }
  return uniqueCategories.map(category => ({ category_name: category }));
};

// Komponen untuk halaman kategori blog
const CategoryBlogPage = async ({ params }: { params: Promise<{ category_name: string }> }) => {
  const resolvedParams = await params; // Menunggu params selesai diproses

   // Jika tidak ada parameter kategori, tampilkan halaman "not found"
  if (!resolvedParams || !resolvedParams.category_name) {
    return notFound();
  }

  let category_name = '';
  try {
    // Mendekodekan nama kategori dari URL dan mengubahnya ke lowercase
    category_name = decodeURIComponent(resolvedParams.category_name).toLowerCase();
  } catch (error) {
    console.error('Error decoding category_name:', error);
    return notFound();
  }

  const allPosts = await getPosts(); // Mengambil semua post
  // Memfilter post berdasarkan kategori
  const posts = allPosts.filter(
    post => post.frontmatter.category && post.frontmatter.category.toLowerCase() === category_name
  );

   // Jika tidak ada post dalam kategori ini, tampilkan halaman "not found"
  if (posts.length === 0) {
    return notFound();
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Posts in {category_name}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} compact={false} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={[...new Set(allPosts.map(post => post.frontmatter.category))]} />
        </div>
      </div>
    </div>
  );
};

export default CategoryBlogPage;

