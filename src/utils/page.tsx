// Mendefinisikan tipe data untuk Post 
type Post = {
    slug: string; // Slug digunakan sebagai URL-friendly identifier untuk setiap post
    frontmatter: {
        date?: string; // Tanggal post bersifat opsional
        [key: string]: any; // Properti lain dalam frontmatter bisa berupa apa saja
    };
};

// Fungsi untuk mengurutkan post berdasarkan tanggal (dari yang terbaru ke yang terlama)
export const sortByDate = (a: Post, b: Post): number => {
    // Mengubah tanggal menjadi timestamp (jumlah milidetik sejak 1970-01-01)
    // Jika tidak ada tanggal, maka akan diisi dengan nilai default 0
    return new Date(b.frontmatter.date || 0).getTime() - new Date(a.frontmatter.date || 0).getTime();
};
