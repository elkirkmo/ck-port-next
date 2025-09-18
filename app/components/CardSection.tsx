import React from 'react';

type CardProps = {
    image: string;
    title: string;
    body: string;
    link: string;
};

const Card: React.FC<CardProps> = ({ image, title, body, link }) => (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="flex-shrink-0" style={{ flexBasis: '30%' }}>
            <img
                src={image}
                alt={title}
                className="w-full h-32 object-cover md:h-40"
                style={{ aspectRatio: '16/9' }}
            />
        </div>
        <div className="flex flex-col flex-grow p-4 justify-between">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4 flex-grow">{body}</p>
            <a
                href={link}
                className="mt-auto inline-block text-blue-600 hover:underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn More
            </a>
        </div>
    </div>
);

type CardSectionProps = {
    cards: CardProps[];
};

const CardSection: React.FC<CardSectionProps> = ({ cards }) => (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
            {cards.map((card, idx) => (
                <div key={idx} className="flex-1">
                    <Card {...card} />
                </div>
            ))}
        </div>
    </section>
);

export default CardSection;