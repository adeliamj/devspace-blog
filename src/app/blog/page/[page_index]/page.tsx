"use server";

import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import CategoryList from "@/components/CategoryList";
import { POSTS_PER_PAGE } from "@/config/page";
import { getPosts } from "@/lib/posts";

const BlogPage = async ({ params }: { params: { page_index?: string } }) => {
  const page = parseInt(params?.page_index ?? "1", 10);
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
