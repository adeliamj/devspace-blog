import Link from 'next/link';

interface PaginationProps {
    currentPage: number; // Halaman saat ini
    numPages: number; // Jumlah total halaman
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, numPages }) => {
    const isFirst = currentPage === 1; // Cek apakah halaman saat ini adalah yang pertama
    const isLast = currentPage === numPages; // Cek apakah halaman saat ini adalah yang terakhir
    const prevPage = `/blog/page/${currentPage - 1}`;  // URL halaman sebelumnya
    const nextPage = `/blog/page/${currentPage + 1}`; // URL halaman berikutnya

    if (numPages === 1) return null; // Jika hanya ada satu halaman, tidak perlu pagination

    return (
        <div className="mt-6">
            <ul className="flex pl-0 list-none my-2">
                {!isFirst && (
                    <Link href={prevPage} passHref>
                        <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
                            Previous
                        </li>
                    </Link>
                )}

                {Array.from({ length: numPages }, (_, i) => (
                    <Link key={i} href={`/blog/page/${i + 1}`} passHref>
                        <li className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer ${currentPage === i + 1 ? 'font-bold' : ''}`}>
                            {i + 1}
                        </li>
                    </Link>
                ))}

                {!isLast && (
                    <Link href={nextPage} passHref>
                        <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
                            Next
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
