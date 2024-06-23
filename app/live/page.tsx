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
  recurrance?: string[] | [];
};

type CalendarEventProps = {
  summary: string;
  description?: string | '';
  location?: string | '';
  date?: string | '';
  recurrance?: string[] | [];
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
  recurrance,
}: CalendarEventProps) => {
  const formattedDate = new Date(date || '');
  const isRecurringEvent = recurrance && recurrance?.length > 0;
  console.log(recurrance);
  /**
   * formattedHours
   * To convert the standard 24 hour format of the Date object to 12 hours.
   *
   * @returns String Hours in 12 hour format
   */
  const formattedHours = () => {
    return formattedDate.getHours() > 12
      ? `${formattedDate.getHours() - 12}`
      : formattedDate.getHours();
  };
  /**
   * formattedMin
   * To convert the minutes to a standard double digit format
   *
   * @returns String minutes with a prepended 0 if less than 10
   */
  const formattedMin = () => {
    const minutes =
      formattedDate.getUTCMinutes() < 10
        ? `0${formattedDate.getUTCMinutes()}`
        : formattedDate.getUTCMinutes().toString();
    return minutes.substring(1, 2);
  };

  const weekMap: { [key: string]: any } = {
    MO: 'Monday',
    TU: 'Tuesday',
    WE: 'Wednesday',
    TH: 'Thursday',
    FR: 'Friday',
    SA: 'Saturday',
    SU: 'Sunday',
  };

  const amOrPm = formattedDate.getHours() >= 12 ? ' PM' : ' AM';
  const recurringDay = () => {
    const dayCode =
      (isRecurringEvent && recurrance[0].split(';').pop()?.split('=').pop()) ||
      '';
    return weekMap[dayCode];
  };

  const recurringText = () =>
    isRecurringEvent &&
    `Weekly on ${recurringDay()} @ ${formattedHours()}:${`0${formattedMin()}`}${amOrPm}`;

  // Format the date to a string
  const dateHeaderText = `${formattedDate.getMonth()}/${formattedDate.getDay()}/${formattedDate.getFullYear()} @ ${formattedHours()}:${`0${formattedMin()}`}${amOrPm}`;

  return (
    <li className="pb-6">
      {date && (
        <h2 className="text-4xl">
          {isRecurringEvent ? recurringText() : dateHeaderText}
        </h2>
      )}
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
              date={start?.dateTime || ''}
              recurrance={recurrence || []}
            />
          )
        )}
      </ul>
    </main>
  );
}
