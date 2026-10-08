import Link from 'next/link';

import Header from './components/Header';
import content from './content';
import { profile } from './data/development';

type HomePageLink = {
  name: string;
  linkText: string | '';
};

const HomePageLink = ({ linkText, name }: HomePageLink) => {
  return (
    <Link
      href={`/${name}`}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {name}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
        {linkText}
      </p>
    </Link>
  );
};

export default function Home() {
  const { pages } = content;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-12 pb-24">
        {/* <Video /> */}
        <Header
          name={profile.name}
          location={profile.location}
          description="Software Engineer and Digital Filmmaker"
        />
        <div className="grid text-center lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          {pages.map((x) => {
            const linkText = x.linkText || '/';
            return (
              <HomePageLink name={x.title} linkText={linkText} key={x.title} />

            );
          })}

        </div>
      </main>
    </>
  );
}
