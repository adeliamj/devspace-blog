import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(request: Request) {
  let posts: { slug: string; frontmatter: any }[] = [];

  // Pastikan membaca data meskipun di production
  const postsDirectory = path.join(process.cwd(), "src", "posts");

  if (fs.existsSync(postsDirectory)) {
    const files = fs.readdirSync(postsDirectory);

    posts = files
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
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
  } else {
    console.error("Posts directory not found");
  }

  console.log("All posts:", posts);

  // Ambil query pencarian
  const searchQuery = new URL(request.url).searchParams.get("q")?.toLowerCase() || "";

  // Filter data berdasarkan query
  const results = posts.filter(({ frontmatter }) =>
    ["title", "excerpt", "category"]
      .map((key) => frontmatter[key]?.toLowerCase() || "")
      .some((field) => field.includes(searchQuery))
  );

  console.log("Search Results:", results);

  return NextResponse.json({ results });
}
