import { google } from 'googleapis';
import Video from '../components/video';

const getEvents = async () => {
  const apis = google.getSupportedAPIs();
  const calID = process.env.GCAL_CALENDAR_ID;
  const calApiKey = process.env.GCAL_API_KEY;
  const calendar = google.calendar({ version: 'v3', auth: calApiKey });
  const result = await calendar.events.list({
    calendarId: calID,
  });
  const events = result.data?.items || [];
  console.log(events);
  const json = {
    events,
  };
  console.log(json);
  return json;
};

export default async function Page() {
  const events = await getEvents();
  console.log('inside the component', events.events);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Video />
      <p>Here we are</p>
    </main>
  );
}
