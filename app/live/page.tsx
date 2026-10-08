import { google, type calendar_v3 } from 'googleapis';
import Header from '../components/Header';
import Video from '../components/video';
import content from '../content';
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
  recurrence?: string[];
};
const getEvents = async () => {
  const calID = process.env.GCAL_CALENDAR_ID;
  const calApiKey = process.env.GCAL_API_KEY;

  // Without credentials the Calendar API returns 403. Bail out early so a
  // missing env var renders an empty schedule rather than failing the build.
  if (!calID || !calApiKey) {
    console.warn('GCAL_CALENDAR_ID or GCAL_API_KEY is unset; skipping fetch.');
    return { events: [] as calendar_v3.Schema$Event[] };
  }

  const calendar = google.calendar({ version: 'v3', auth: calApiKey });

  try {
    const result = await calendar.events.list({ calendarId: calID });
    return { events: result.data?.items || [] };
  } catch (error) {
    console.error('Failed to load calendar events:', error);
    return { events: [] as calendar_v3.Schema$Event[] };
  }
};

const CalendarEvent = ({
  summary,
  description,
  location,
  start,
  recurrence,
}: CalendarEventProps) => {
  const when = start ? formatEventWhen(start, recurrence) : null;

  return (
    <li className="pb-6">
      {when && <h2 className="text-4xl">{when}</h2>}
      <p className="text-2xl">{summary}</p>
      {description && <p>{description}</p>}
      {location && <p>{location}</p>}
    </li>
  );
};

export default async function Page() {
  const { pageTitle, description }: PageContent = content?.pages[3];
  const { events } = await getEvents();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-12 sm:p-24">
      {/* <Video /> */}
      <Header name={pageTitle || ''} description={description || ''} />
      <ul className="my-4">
        {events.map(
          ({ summary, description, id, location, start, recurrence }) => (
            <CalendarEvent
              key={id}
              summary={summary || ''}
              description={description || ''}
              location={location || ''}
              start={start}
              recurrence={recurrence || []}
            />
          )
        )}
      </ul>
    </main>
  );
}
