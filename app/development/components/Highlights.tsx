import type { Highlight } from '../../data/development';

type HighlightsProps = {
  items: Highlight[];
};

const Highlights = ({ items }: HighlightsProps) => (
  <section aria-label="Highlights">
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(({ value, label }) => (
        <li
          key={value}
          className="rounded-lg border border-gray-300 bg-white/80 p-4 shadow-sm"
        >
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="mt-1 text-sm text-gray-700">{label}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Highlights;
