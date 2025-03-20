import { notFound } from 'next/navigation';
import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import { getPosts } from '@/lib/posts';

// Generate Static Params
export const generateStaticParams = async () => {
  const posts = await getPosts();
  const uniqueCategories = [...new Set(posts.map(post => post.frontmatter.category.toLowerCase()))];

  return uniqueCategories.map(category => ({ category_name: category }));
};

// Halaman kategori blog harus `async`
const CategoryBlogPage = async ({ params }: { params?: { category_name?: string } }) => {
  if (!params?.category_name) {
    return notFound();
  }

  const category_name = decodeURIComponent(params.category_name).toLowerCase();

  // Pastikan `getPosts()` di-`await`
  const allPosts = await getPosts();

  // Filter postingan berdasarkan kategori
  const posts = allPosts.filter(post => post.frontmatter.category.toLowerCase() === category_name);
  const uniqueCategories = [...new Set(allPosts.map(post => post.frontmatter.category))];

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
          <CategoryList categories={uniqueCategories} />
        </div>
      </div>
    </div>
  );
};

export default CategoryBlogPage;
