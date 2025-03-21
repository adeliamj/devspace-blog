import Link from 'next/link'
import Image from 'next/image'

// Metadata halaman
export const metadata = {
  title: "Page Not Found"
};

// Komponen NotFoundPage yang ditampilkan ketika halaman tidak dite
const NotFoundPage = () => {

  return (
      <div className="flex flex-col items-center mt-20">
        <Image
          src='/images/logo.png'
          width={70}
          height={70}
          alt='logo'
          className='bg-gray-800 rounded-2xl'
        />

        <h1 className='text-6xl my-5'>
          Whoops!
        </h1>

        <h2 className='text-4xl text-gray-400 mb-5'>
          This page does not exist
        </h2>

      </div>
  )
}

export default NotFoundPage;