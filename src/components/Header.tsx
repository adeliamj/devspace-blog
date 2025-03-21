import Link from "next/link";
import Image from 'next/image';
import "@/styles/globals.css";

interface HeaderProps {
    children: React.ReactNode; // Header dapat menerima elemen anak (children)
    className?: string; // Opsional: Kelas tambahan untuk styling
}

// Komponen Header yang fleksibel dengan props children dan className
function Header({ children, className }: HeaderProps) {
    return (
        <header className={className}>
            {children}
        </header>
    );
}

const PageHeader = () => {
    return (
        <header className='bg-gray-900 text-gray-100 shadow w-full'>
            <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
                <Link href='/' className='flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0'>
                    <Image src='/images/logo.png' width={40} height={40} alt='logo'  style={{ width: 'auto', height: 'auto' }}/>
                    <span className='ml-3 text-xl'>DevSpace</span>
                </Link>
                <nav className='flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto'>
                    <Link href='/blog' className='mx-5 cursor-pointer uppercase hover:text-indigo-300'>
                        Blog
                    </Link>
                    <Link href='/about' className='mx-5 cursor-pointer uppercase hover:text-indigo-300'>
                        About
                    </Link>
                </nav>
            </div>
        </header>
    )
}
export default PageHeader