import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(request: Request) {
  let posts: { slug: string; frontmatter: any }[] = [];

  if (process.env.NODE_ENV === "production") {
    //@todo - fetch from cache
  } else {
    const postsDirectory = path.join(process.cwd(), "src", "posts");
    const files = fs.readdirSync(postsDirectory);

    posts = files.map((filename) => {
      const slug = filename.replace(".md", "");

      const markdownWithMeta = fs.readFileSync(
        path.join(postsDirectory, filename),
        "utf-8"
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug,
        frontmatter,
      };
    });
  }

  const searchQuery = new URL(request.url).searchParams.get("q")?.toLowerCase() || "";

  const results = posts.filter(({ frontmatter: { title, excerpt, category } }) =>
    [title, excerpt, category].some((field) => field?.toLowerCase().includes(searchQuery))
  );

  console.log(results);
  return NextResponse.json({ results });
}
