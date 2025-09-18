import Link from 'next/link';
import React from 'react';

import Image from 'next/image';

const StickyHeader: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 md:py-4 shadow">
            {/* Logo */}
            <div className="flex items-center mb-2 md:mb-0">
                <Image
                    src="/assets/images/glasses.png"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="mr-3"
                />
            </div>

            {/* Center Links */}
            <nav className="flex flex-col md:flex-row gap-2 md:gap-8 items-center flex-1 justify-center mb-2 md:mb-0">
                <Link href="#faq" className="text-lg font-medium hover:underline">FAQ</Link>
                <Link href="#" className="text-lg font-medium hover:underline">Link 2</Link>
                <Link href="#" className="text-lg font-medium hover:underline">Link 3</Link>
                <Link href="#" className="text-lg font-medium hover:underline">Link 4</Link>
            </nav>

            {/* Login Button */}
            <div className="flex items-center">
                <button className="diagonal-gradient-bg text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition w-full md:w-auto">
                    Log In
                </button>
            </div>
        </header>
    );
};

export default StickyHeader;