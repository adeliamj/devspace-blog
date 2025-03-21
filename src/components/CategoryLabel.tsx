import Link from 'next/link'
import { ReactNode } from 'react'; // Mengimpor ReactNode untuk mendefinisikan tipe properti yang bisa menerima elemen React

// Mendefinisikan tipe props untuk komponen
type CategoryLabelProps = {
    children: ReactNode; // Props children bisa berupa teks atau elemen React
};

// Komponen CategoryLabel untuk menampilkan label kategori dengan warna tertentu
const CategoryLabel = ({ children }: CategoryLabelProps) => {
    const colorKey: Record<string, string> = {
         // Objek yang berisi mapping kategori ke warna tertentu
        JavaScript: 'yellow',
        CSS: 'blue',
        Python: 'green',
        PHP: 'purple',
        Ruby: 'red'
    }

    // Menentukan warna berdasarkan kategori yang diberikan dalam children
    const color = colorKey[children as keyof typeof colorKey] || 'gray';

    return (
        <div className={`px-2 py-1 bg-${color}-600 text-gray-100 font-bold rounded`}>
            <Link href={`/blog/category/${typeof children === 'string' ? children.toLowerCase() : ''}`}>
                {children}
            </Link>
        </div>
    );
}

export default CategoryLabel;
