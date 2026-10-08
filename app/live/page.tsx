import Header from '../components/Header';
import Video from '../components/video';
import content from '../content';
import { getEvents } from './events';
import { formatEventWhen, type EventStart } from './formatEvent';

type PageContent = {
  title: string;
  linkText: string;
  pageTitle: string | '';
  description: string | '';
};

type CalendarEventProps = {
  summary: string;
  description?: string | '';
  location?: string | '';
  start?: EventStart;
};

const CalendarEvent = ({
  summary,
  description,
  location,
  start,
}: CalendarEventProps) => {
  const when = start ? formatEventWhen(start) : null;

  return (
    <li className="pb-6">
      {when && <h2 className="text-4xl">{when}</h2>}
      <p className="text-2xl">{summary}</p>
      {description && <p>{description}</p>}
      {location && <p>{location}</p>}
    </li>
  );
};

// Re-render hourly so finished events drop off without a redeploy.
export const revalidate = 3600;

export default async function Page() {
  const { pageTitle, description }: PageContent = content?.pages[3];
  const { events } = await getEvents();
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 pb-24">
      {/* <Video /> */}
      <Header name={pageTitle || ''} description={description || ''} />
      <ul className="px-4">
        {events.map(
          ({ summary, description, id, location, start }) => (
            <CalendarEvent
              key={id}
              summary={summary || ''}
              description={description || ''}
              location={location || ''}
              start={start}
            />
          )
        )}
      </ul>
    </main>
  );
}
