import { google } from 'googleapis';
import Header from '../components/Header';
import Video from '../components/video';
import content from '../content';

type PageContent = {
  title: string;
  linkText: string;
  pageTitle: string | '';
  description: string | '';
};

export default async function Page() {
  const { pageTitle, description }: PageContent = content?.pages[0];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Video />
      <Header name={pageTitle || ''} description={description || ''} />
      {/* <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {pages.map((x) => {
          const linkText = x.linkText || '/';
          return (
            <HomePageLink name={x.title} linkText={linkText} key={x.title} />
          );
        })}
      </div> */}
    </main>
  );
}
