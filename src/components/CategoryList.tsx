import Link from 'next/link';

const CategoryList = ({ categories }: { categories: (string | undefined)[] }) => {
  // Ensure categories are valid strings before rendering
  const validCategories = categories.filter(
    (category): category is string => typeof category === 'string' && category.trim() !== ''
  );

  return (
    <div className="w-full p-5 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-2xl bg-gray-800 text-white p-3 rounded">Blog Categories</h3>
      <ul className="divide-y divide-gray-300">
        {validCategories.map((category, index) => (
          <li key={index} className="p-4 cursor-pointer hover:bg-gray-50">
            <Link href={`/blog/category/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
