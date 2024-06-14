const MOCK_DATA = [
  {
    kind: 'calendar#event',
    etag: '"3435297719756000"',
    id: '1inm4f7ps1a5pocjndmhi8s5t7',
    status: 'confirmed',
    htmlLink:
      'https://www.google.com/calendar/event?eid=MWlubTRmN3BzMWE1cG9jam5kbWhpOHM1dDdfMjAyNDA2MDRUMDAwMDAwWiBjXzgxY2Y1YjRkYjYxMWVhZTc4NDA3MTI1M2I0ZTZlZTA2MmE4NzdiYzM1OWYzYjE1ZTMwOGVmMWJjODQxZmEzY2FAZw',
    created: '2024-06-06T04:40:59.000Z',
    updated: '2024-06-06T04:40:59.878Z',
    summary: 'Geeks Who Drink - Pub Trivia',
    description:
      '21+ Venue. Bring your buddies for some beer and trivia at Level Crossing Brewery!',
    location:
      'Level Crossing Brewing Company, 2496 S W Temple St, South Salt Lake, UT 84115, USA',
    creator: {
      email: 'me@chriskirkham.com',
      displayName: 'Chris Kirkham',
    },
    organizer: {
      email:
        'c_81cf5b4db611eae784071253b4e6ee062a877bc359f3b15e308ef1bc841fa3ca@group.calendar.google.com',
      displayName: 'Chris Kirkham - Live',
      self: true,
    },
    start: {
      dateTime: '2024-06-03T18:00:00-06:00',
      timeZone: 'America/Denver',
    },
    end: {
      dateTime: '2024-06-03T19:30:00-06:00',
      timeZone: 'America/Denver',
    },
    recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=MO'],
    iCalUID: '1inm4f7ps1a5pocjndmhi8s5t7@google.com',
    sequence: 0,
    eventType: 'default',
  },
  {
    kind: 'calendar#event',
    etag: '"3435308071028000"',
    id: '68acjphgtpabt25oit8q7luj7e',
    status: 'confirmed',
    htmlLink:
      'https://www.google.com/calendar/event?eid=NjhhY2pwaGd0cGFidDI1b2l0OHE3bHVqN2UgY184MWNmNWI0ZGI2MTFlYWU3ODQwNzEyNTNiNGU2ZWUwNjJhODc3YmMzNTlmM2IxNWUzMDhlZjFiYzg0MWZhM2NhQGc',
    created: '2024-06-06T06:07:15.000Z',
    updated: '2024-06-06T06:07:15.514Z',
    summary: 'Standup Set',
    creator: {
      email: 'me@chriskirkham.com',
      displayName: 'Chris Kirkham',
    },
    organizer: {
      email:
        'c_81cf5b4db611eae784071253b4e6ee062a877bc359f3b15e308ef1bc841fa3ca@group.calendar.google.com',
      displayName: 'Chris Kirkham - Live',
      self: true,
    },
    start: {
      dateTime: '2024-06-12T06:45:00-06:00',
      timeZone: 'America/Denver',
    },
    end: {
      dateTime: '2024-06-12T08:45:00-06:00',
      timeZone: 'America/Denver',
    },
    iCalUID: '68acjphgtpabt25oit8q7luj7e@google.com',
    sequence: 0,
    eventType: 'default',
  },
  {
    kind: 'calendar#event',
    etag: '"3436626958210000"',
    id: '6mmnfuln1tpd7uhlam3sqfsb6j',
    status: 'confirmed',
    htmlLink:
      'https://www.google.com/calendar/event?eid=Nm1tbmZ1bG4xdHBkN3VobGFtM3NxZnNiNmogY184MWNmNWI0ZGI2MTFlYWU3ODQwNzEyNTNiNGU2ZWUwNjJhODc3YmMzNTlmM2IxNWUzMDhlZjFiYzg0MWZhM2NhQGc',
    created: '2024-06-13T21:17:59.000Z',
    updated: '2024-06-13T21:17:59.105Z',
    summary: 'Live Event - Test',
    description: 'Test Test',
    location: 'Ice Haus, 7 E 4800 S, Murray, UT 84107, USA',
    creator: {
      email: 'me@chriskirkham.com',
      displayName: 'Chris Kirkham',
    },
    organizer: {
      email:
        'c_81cf5b4db611eae784071253b4e6ee062a877bc359f3b15e308ef1bc841fa3ca@group.calendar.google.com',
      displayName: 'Chris Kirkham - Live',
      self: true,
    },
    start: {
      dateTime: '2024-07-02T14:00:00-06:00',
      timeZone: 'America/Denver',
    },
    end: {
      dateTime: '2024-07-02T16:15:00-06:00',
      timeZone: 'America/Denver',
    },
    iCalUID: '6mmnfuln1tpd7uhlam3sqfsb6j@google.com',
    sequence: 0,
    eventType: 'default',
  },
  {
    kind: 'calendar#event',
    etag: '"3436627044722000"',
    id: '4i116mvsu5cbds9jcne11kuhiv',
    status: 'confirmed',
    htmlLink:
      'https://www.google.com/calendar/event?eid=NGkxMTZtdnN1NWNiZHM5amNuZTExa3VoaXYgY184MWNmNWI0ZGI2MTFlYWU3ODQwNzEyNTNiNGU2ZWUwNjJhODc3YmMzNTlmM2IxNWUzMDhlZjFiYzg0MWZhM2NhQGc',
    created: '2024-06-13T21:18:42.000Z',
    updated: '2024-06-13T21:18:42.361Z',
    summary: 'Another Test Event',
    location:
      'The Comedy Store, 8433 Sunset Blvd, West Hollywood, CA 90069, USA',
    creator: {
      email: 'me@chriskirkham.com',
      displayName: 'Chris Kirkham',
    },
    organizer: {
      email:
        'c_81cf5b4db611eae784071253b4e6ee062a877bc359f3b15e308ef1bc841fa3ca@group.calendar.google.com',
      displayName: 'Chris Kirkham - Live',
      self: true,
    },
    start: {
      dateTime: '2024-07-04T09:45:00-06:00',
      timeZone: 'America/Denver',
    },
    end: {
      dateTime: '2024-07-04T11:45:00-06:00',
      timeZone: 'America/Denver',
    },
    iCalUID: '4i116mvsu5cbds9jcne11kuhiv@google.com',
    sequence: 0,
    eventType: 'default',
  },
];

export default MOCK_DATA;
