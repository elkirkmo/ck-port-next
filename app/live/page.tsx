import { google } from 'googleapis';
import Header from '../components/Header';
import Video from '../components/Video';
import content from '../content';

interface StartTimes {
  dateTime: string | '';
  timeZone: string;
}

type PageContent = {
  title: string;
  linkText: string;
  pageTitle: string | '';
  description: string | '';
};

type GCalEvent = {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start?: StartTimes | {};
};

type CalendarEventProps = {
  summary: string;
  description?: string | '';
  location?: string | '';
  date?: string | '';
};

const getEvents = async () => {
  const apis = google.getSupportedAPIs();
  const calID = process.env.GCAL_CALENDAR_ID;
  const calApiKey = process.env.GCAL_API_KEY;
  const calendar = google.calendar({ version: 'v3', auth: calApiKey });
  const result = await calendar.events.list({
    calendarId: calID,
  });
  const events = result.data?.items || [];
  // console.log(events);
  const json = {
    events,
  };
  // console.log(json);
  return json;
};

const CalendarEvent = ({
  summary,
  description,
  location,
  date,
}: CalendarEventProps) => {
  const formattedDate = new Date(date || '');
  const dateHeaderText = `${formattedDate.getMonth()}/${formattedDate.getDay()}/${formattedDate.getFullYear()} ${formattedDate.getHours()}:${`0${formattedDate.getUTCMinutes()}`.substring(
    -2
  )}`;
  return (
    <li>
      <div>
        {date && <h2 className="text-4xl">{dateHeaderText}</h2>}
        <p className="text-2xl">{summary}</p>
        {description && <p>{description}</p>}
        {location && <p>{location}</p>}
      </div>
    </li>
  );
};

export default async function Page() {
  const { pageTitle, description }: PageContent = content?.pages[3];
  const { events } = await getEvents();
  // console.log('inside the component', JSON.stringify(events));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Video /> */}
      <Header name={pageTitle || ''} description={description || ''} />
      <ul>
        {events.map(({ summary, description, id, location, start }) => (
          <CalendarEvent
            key={id}
            summary={summary || ''}
            description={description || ''}
            location={location || ''}
            date={start?.dateTime || ''}
          />
        ))}
      </ul>
    </main>
  );
}
