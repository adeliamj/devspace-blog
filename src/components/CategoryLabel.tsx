import Link from 'next/link'
import { ReactNode } from 'react';

type CategoryLabelProps = {
    children: ReactNode;
};

const CategoryLabel = ({ children }: CategoryLabelProps) => {
    const colorKey: Record<string, string> = {
        JavaScript: 'yellow',
        CSS: 'blue',
        Python: 'green',
        PHP: 'purple',
        Ruby: 'red'
    }

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
