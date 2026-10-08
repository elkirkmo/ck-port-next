'use client';

import React, { useState } from 'react';
import ObfuscatedEmail from './ObfuscatedEmail';

type FAQ = {
    question: string;
    answer: string;
    showEmail?: boolean;
};

type FAQSectionProps = {
    arr: FAQ[];
};

const FAQItem: React.FC<FAQ> = ({ question, answer, showEmail }) => {
    const [open, setOpen] = useState(false);

    return (
        <li className="border-b border-gray-200 last:border-none">
            <button
                className="w-full text-left py-4 px-2 flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
            >
                <span className="text-xl font-semibold">{question}</span>
                <span aria-hidden="true" className={`ml-2 transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {open && (
                <div className="px-4 pb-4 text-md text-gray-700 animate-fade-in">
                    {answer}
                    {showEmail && (
                        <>
                            {' '}
                            <ObfuscatedEmail className="font-semibold underline underline-offset-2" />
                        </>
                    )}
                </div>
            )}
        </li>
    );
};

const FAQSection: React.FC<FAQSectionProps> = ({ arr }) => {
    return (
        <section className="max-w-2xl mx-auto my-16 p-8 bg-white/80 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <ul>
                {arr.map((faq) => (
                    <FAQItem key={faq.question} {...faq} />
                ))}
            </ul>
        </section>
    );
}

export default FAQSection;