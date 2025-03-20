"use server";

import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import CategoryList from "@/components/CategoryList";
import { POSTS_PER_PAGE } from "@/config/page";
import { getPosts } from "@/lib/posts";

export const generateStaticParams = async () => {
  return [{ page_index: "1" }, { page_index: "2" }]; 
};

const BlogPage = async ({ params }: { params: Promise<{ page_index?: string }> }) => {
  const resolvedParams = await params; 
  console.log("Resolved Blog Page Params:", resolvedParams);

  const page = parseInt(resolvedParams.page_index ?? "1", 10);

  const allPosts = await getPosts();

  const uniqueCategories = [...new Set(allPosts.map(post => post.frontmatter.category))];
  const numPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const posts = allPosts.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Post key={index} post={post} compact={false} />
            ))}
          </div>
          <Pagination currentPage={page} numPages={numPages} />
        </div>
        <div className="w-1/4">
          <CategoryList categories={uniqueCategories} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
