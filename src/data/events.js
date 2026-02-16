export const events = [
  {
    id: 'evt-001',
    title: 'Studio Session Recording',
    date: '2024-06-15',
    time: '7:00 PM',
    location: 'DC Studio',
    address: 'Shaw, Washington DC',
    lineup: ['dj-001'],
    ticketUrl: null,
    status: 'upcoming',
    type: 'recording',
    description: 'Join us for the next studio session recording. Limited spots available for live audience.',
    capacity: 25,
  },
  {
    id: 'evt-002',
    title: 'Warehouse Session Launch',
    date: '2024-07-20',
    time: '9:00 PM',
    location: 'TBD Warehouse',
    address: 'Silver Spring, MD',
    lineup: ['dj-002', 'dj-005'],
    ticketUrl: 'https://tickets.example.com/evt-002',
    status: 'upcoming',
    type: 'live',
    description: 'The inaugural Warehouse Session. Raw industrial vibes with our tech house specialists.',
    capacity: 150,
  },
  {
    id: 'evt-003',
    title: 'Session #003 Premiere',
    date: '2024-04-10',
    time: '8:00 PM',
    location: 'Online',
    address: 'YouTube Live',
    lineup: ['dj-006'],
    ticketUrl: null,
    status: 'past',
    type: 'premiere',
    description: 'Watch party for Nina Reyes\'s disco-infused session premiere.',
  },
  {
    id: 'evt-004',
    title: 'Rooftop Series Preview',
    date: '2024-08-10',
    time: '6:00 PM',
    location: 'Virginia Rooftop',
    address: 'Arlington, VA',
    lineup: ['dj-003', 'dj-004'],
    ticketUrl: 'https://tickets.example.com/evt-004',
    status: 'upcoming',
    type: 'live',
    description: 'Golden hour vibes as we preview our upcoming Rooftop Session series.',
    capacity: 75,
  },
  {
    id: 'evt-005',
    title: 'Studio Session Recording',
    date: '2024-06-29',
    time: '7:00 PM',
    location: 'DC Studio',
    address: 'Shaw, Washington DC',
    lineup: ['dj-004'],
    ticketUrl: null,
    status: 'upcoming',
    type: 'recording',
    description: 'Zara Okonkwo takes the studio for her progressive house journey.',
    capacity: 25,
  },
]

export const getEventById = (id) => events.find((event) => event.id === id)
export const getUpcomingEvents = () =>
  events.filter((event) => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
export const getPastEvents = () =>
  events.filter((event) => event.status === 'past')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
export const getEventsByType = (type) => events.filter((event) => event.type === type)
