import Link from "next/link";
import Post from "@/components/Post";
// Mengimpor fungsi getPosts dari library posts, tetapi mengganti nama menjadi fetchPosts 
import { getPosts as fetchPosts } from "@/lib/posts";

// Fungsi untuk mengambil daftar postingan terbaru
const getPosts = async () => {
  return fetchPosts().slice(0, 6); // Mengambil hanya 6 postingan terbaru
};

const HomePage = async () => {
  const posts = await getPosts(); // Mengambil data postingan

  return (
    <div>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Post</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
         <Post key={index} post={post} compact={false} />
        ))}
      </div>
      <Link
        href="/blog"
        className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full"
      >
        All Post
      </Link>
    </div>
  );
};

export default HomePage;
