type Post = {
    slug: string;
    frontmatter: {
        date?: string;
        [key: string]: any;
    };
};

export const sortByDate = (a: Post, b: Post): number => {
    return new Date(b.frontmatter.date || 0).getTime() - new Date(a.frontmatter.date || 0).getTime();
};
