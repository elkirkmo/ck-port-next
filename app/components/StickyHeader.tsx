'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
    { href: '/development', label: 'Development' },
    { href: '/live', label: 'Live' },
    { href: '/development#contact', label: 'Contact' },
];

const StickyHeader: React.FC = () => {
    // Client component only for this: marking the current page needs the URL.
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 md:px-8 py-3 md:py-4 shadow-sm">
            <Link
                href="/"
                aria-current={pathname === '/' ? 'page' : undefined}
                className="font-bold text-xl md:text-2xl text-gray-900"
            >
                Chris Kirkham
            </Link>

            <nav aria-label="Main">
                <ul className="flex flex-wrap gap-x-5 gap-y-1 md:gap-x-8">
                    {links.map(({ href, label }) => {
                        // Hash links (Contact) are never the current page.
                        const current = href === pathname;
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    aria-current={current ? 'page' : undefined}
                                    className={`text-base md:text-lg font-medium text-gray-900 hover:underline ${current ? 'underline underline-offset-4 decoration-2' : ''}`}
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default StickyHeader;
