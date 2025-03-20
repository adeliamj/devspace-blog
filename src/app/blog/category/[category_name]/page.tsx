import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";
import { getPosts } from "@/lib/posts";

const generateStaticParams = async () => {
  const posts = await getPosts();
  const uniqueCategories = [...new Set(posts.map(post => post.frontmatter.category.toLowerCase()))];

  return uniqueCategories.map(category => ({ category_name: category }));
};

const CategoryBlogPage = async ({ params }: { params: { category_name: string } }) => {
  const categoryName = params.category_name;
  const allPosts = await getPosts();
  const posts = allPosts.filter(
    post => post.frontmatter.category.toLowerCase() === categoryName
  );

  const uniqueCategories = [...new Set(allPosts.map(post => post.frontmatter.category))];

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Posts in {categoryName}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
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

export { generateStaticParams };
export default CategoryBlogPage;
