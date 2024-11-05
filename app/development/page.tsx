import { google } from 'googleapis';
import Header from '../components/Header';
import Video from '../components/video';
import Footer from '../components/Footer';
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
      <Footer showNav={true} />
    </main>
  );
}
