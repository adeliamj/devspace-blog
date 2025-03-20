import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { marked } from "marked";
import CategoryLabel from "@/components/CategoryLabel";

export const metadata = {
  title: "Blog DevSpace",
};

const getPostContent = async (slug) => {
  const postsDirectory = path.join(process.cwd(), "src", "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const markdownWithMeta = await fs.promises.readFile(filePath, "utf-8");
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return { frontmatter, content };
};

const PostPage = async ({ params }) => {
  const { slug } = await params;
  const post = await getPostContent(slug);

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
