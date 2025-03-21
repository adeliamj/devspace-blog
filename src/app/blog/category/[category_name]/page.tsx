import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import { getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const posts = await getPosts();

  // Ensure category is defined before using toLowerCase()
  const uniqueCategories = [
    ...new Set(
      posts
        .map(post => post.frontmatter.category?.toLowerCase())
        .filter(category => category) // Remove undefined values
    )
  ];

  return uniqueCategories.map(category => ({ category_name: category }));
};


const CategoryBlogPage = async ({ params }: { params: Promise<{ category_name: string }> }) => {
  const resolvedParams = await params;

  if (!resolvedParams || !resolvedParams.category_name) {
    return notFound();
  }

  let category_name = '';
  try {
    category_name = decodeURIComponent(resolvedParams.category_name).toLowerCase();
  } catch (error) {
    console.error('Error decoding category_name:', error);
    return notFound();
  }

  const allPosts = await getPosts();
  const posts = allPosts.filter(
    post => post.frontmatter.category && post.frontmatter.category.toLowerCase() === category_name
  );

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

