export type FeaturedEventId = 'hack-night' | 'poetry-jam' | 'street-food';

export type FeaturedEvent = {
  id: FeaturedEventId;
  title: string;
  venue: string;
  time: string;
  description: string;
};

export const featuredEvents: FeaturedEvent[] = [
  {
    id: 'hack-night',
    title: 'Midnight Hack Night',
    venue: 'Innovation Lab',
    time: 'Tonight at 9:00 PM',
    description:
      'Build quick campus tools with pop-up teams. Mentors roam all night and there is a prize for best utility.',
  },
  {
    id: 'poetry-jam',
    title: 'Open Mic Poetry Jam',
    venue: 'Library Steps',
    time: 'Thursday at 7:30 PM',
    description:
      'Spoken word, indie acoustic sets, and late-night coffee. Bring your own piece or just listen.',
  },
  {
    id: 'street-food',
    title: 'Street Food Crawl',
    venue: 'Downtown Stage',
    time: 'Saturday at 6:00 PM',
    description:
      'Student-curated route through the most-loved food trucks near campus, ending with a live DJ set.',
  },
];

export const featuredEventsById: Record<FeaturedEventId, FeaturedEvent> = {
  'hack-night': featuredEvents[0],
  'poetry-jam': featuredEvents[1],
  'street-food': featuredEvents[2],
};
