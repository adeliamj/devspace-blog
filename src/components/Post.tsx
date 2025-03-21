import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from '@/components/CategoryLabel';

// Definisi tipe data untuk properti komponen Post
interface PostProps {
    post: {
        slug: string; // Slug untuk URL postingan
        frontmatter: { [key: string]: any };  // Metadata
    };
    compact: boolean; // Menentukan apakah tampilan akan lebih ringkas
}

// Komponen Post yang menampilkan informasi tentang sebuah postingan blog
const Post: React.FC<PostProps> = ({ post, compact }) => {
    const coverImage = post.frontmatter?.cover_image;  // Mengambil URL gambar cover dari frontmatter

    return (
        <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>

            {/* Image Handling */}
            {coverImage && coverImage !== "" ? (
                !compact ? (
                    <Image
                        src={coverImage}
                        alt={post.frontmatter?.title || 'Post Image'}
                        height={420}
                        width={600}
                        className='mb-4 rounded'
                        priority
                    />
                ) : null
            ) : (
                <div className='w-full h-64 bg-gray-200 flex items-center justify-center'>
                    <span>No Image Available</span>
                </div>
            )}

            <div className="flex justify-between items-center">
                <span className="font-light text-gray-600">
                    {post.frontmatter?.date}
                </span>
                {post.frontmatter?.category && (
                    <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
                )}
            </div>

            <div className='mt-2'>
                <Link href={`/blog/${post.slug}`} className='text-2xl text-gray-700 font-bold hover:underline'>
                    {post.frontmatter.title}
                </Link>
                <p className="mt-2 text-gray-600">
                    {post.frontmatter.excerpt}
                </p>
            </div>

            {/* Content Display */}
            {!compact && (
                <>
                    <div className='flex justify-between items-center mt-6'>
                        <Link href={`/blog/${post.slug}`} className='text-gray-900 hover:text-blue-600'>
                            Read More
                        </Link>
                        <div className='flex items-center'>
                            {post.frontmatter?.author_image && (
                                <Image
                                    src={post.frontmatter.author_image}
                                    alt={post.frontmatter?.author || "Author"}
                                    width={40}
                                    height={40}
                                    className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
                                    unoptimized
                                />
                            )}
                            <h3 className='text-gray-700 font-bold'>
                                {post.frontmatter?.author}
                            </h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
