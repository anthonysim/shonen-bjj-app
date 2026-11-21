// Weekly class schedule. Placeholder times.

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = (typeof DAYS)[number];

export const CATEGORIES = ['kids', 'gi', 'no-gi'] as const;
export type Category = (typeof CATEGORIES)[number];

export const categoryLabels: Record<Category, string> = {
  kids: 'Kids',
  gi: 'Adults gi',
  'no-gi': 'Adults no-gi',
};

export interface ScheduleClass {
  id: string;
  name: string;
  category: Category;
  /** Slug of the program page this class belongs to (see `programs` in site.ts) */
  program: string;
  days: Day[];
  /** 24h "HH:MM" start time */
  start: string;
  durationMin: number;
  audience: string;
  /** For kids classes: the age group id this class belongs to (see `programs` in site.ts) */
  ageGroup?: string;
}

export const schedule: ScheduleClass[] = [
  {
    id: 'kids-weekday',
    name: 'Kids',
    category: 'kids',
    program: 'kids',
    ageGroup: 'kids-4-7',
    days: ['Tue', 'Thu'],
    start: '17:00',
    durationMin: 45,
    audience: 'Ages 4-7',
  },
  {
    id: 'kids-saturday',
    name: 'Kids',
    category: 'kids',
    program: 'kids',
    ageGroup: 'kids-8-13',
    days: ['Sat'],
    start: '09:00',
    durationMin: 60,
    audience: 'Ages 8-13',
  },
  {
    id: 'adults-basics',
    name: 'Adults Basics',
    category: 'gi',
    program: 'bjj',
    days: ['Mon', 'Tue', 'Wed', 'Thu'],
    start: '19:00',
    durationMin: 60,
    audience: 'Ages 14+, all new students',
  },
  {
    id: 'adults-all-levels-evening',
    name: 'Adults All-Levels',
    category: 'gi',
    program: 'bjj',
    days: ['Mon', 'Wed'],
    start: '18:00',
    durationMin: 60,
    audience: 'Ages 14+',
  },
  {
    id: 'adults-all-levels-noon',
    name: 'Adults All-Levels',
    category: 'gi',
    program: 'bjj',
    days: ['Fri'],
    start: '12:00',
    durationMin: 60,
    audience: 'Ages 14+',
  },
  {
    id: 'adults-all-levels-saturday',
    name: 'Adults All-Levels',
    category: 'gi',
    program: 'bjj',
    days: ['Sat'],
    start: '10:00',
    durationMin: 90,
    audience: 'Ages 14+',
  },
  {
    id: 'no-gi',
    name: 'No-Gi',
    category: 'no-gi',
    program: 'no-gi',
    days: ['Tue', 'Thu'],
    start: '18:00',
    durationMin: 60,
    audience: 'Ages 14+',
  },
];

export interface DayClass extends ScheduleClass {
  day: Day;
}

export function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** "17:00" -> "5:00 PM" */
export function formatTime(time: string): string {
  const total = toMinutes(time);
  const h24 = Math.floor(total / 60) % 24;
  const m = total % 60;
  const suffix = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function endTime(cls: Pick<ScheduleClass, 'start' | 'durationMin'>): string {
  const total = toMinutes(cls.start) + cls.durationMin;
  const h = Math.floor(total / 60) % 24;
  return `${String(h).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

/** "5:00 PM - 5:45 PM" */
export function timeRange(cls: Pick<ScheduleClass, 'start' | 'durationMin'>): string {
  return `${formatTime(cls.start)} - ${formatTime(endTime(cls))}`;
}

/** Classes grouped by day (in `DAYS` order), each day sorted by start time. Empty days included. */
export function classesByDay(
  classes: ScheduleClass[] = schedule,
): { day: Day; classes: DayClass[] }[] {
  return DAYS.map((day) => ({
    day,
    classes: classes
      .filter((cls) => cls.days.includes(day))
      .map((cls) => ({ ...cls, day }))
      .toSorted((a, b) => toMinutes(a.start) - toMinutes(b.start)),
  }));
}

/**
 * Compact day label: 3+ consecutive days become a range ("Mon-Thu"), otherwise a list
 * ("Tue, Thu"). Days are shown in week order.
 */
export function formatDays(days: readonly Day[]): string {
  const sorted = [...days].toSorted((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b));
  if (sorted.length >= 3) {
    const first = DAYS.indexOf(sorted[0]);
    const consecutive = sorted.every((day, i) => DAYS.indexOf(day) === first + i);
    if (consecutive) return `${sorted[0]}-${sorted[sorted.length - 1]}`;
  }
  return sorted.join(', ');
}

/**
 * Friendlier day label for the schedule cards: a run of 3+ days becomes "Mon\u2013Thu", two
 * days "Tue & Thu", one day its full name ("Saturday") unless `short` asks for "Sat".
 */
export function formatDaysFriendly(days: readonly Day[], { short = false } = {}): string {
  const sorted = [...days].toSorted((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b));
  if (sorted.length === 1) return short ? sorted[0] : DAY_NAMES[sorted[0]];
  if (sorted.length >= 3) {
    const first = DAYS.indexOf(sorted[0]);
    if (sorted.every((day, i) => DAYS.indexOf(day) === first + i)) {
      return `${sorted[0]}\u2013${sorted[sorted.length - 1]}`;
    }
  }
  return sorted.length === 2 ? sorted.join(' & ') : sorted.join(', ');
}

/** Classes grouped by category (in `CATEGORIES` order), each sorted by first day then start time. */
export function classesByCategory(
  classes: ScheduleClass[] = schedule,
): { category: Category; classes: ScheduleClass[] }[] {
  const firstDay = (cls: ScheduleClass) => Math.min(...cls.days.map((d) => DAYS.indexOf(d)));
  return CATEGORIES.map((category) => ({
    category,
    classes: classes
      .filter((cls) => cls.category === category)
      .toSorted((a, b) => firstDay(a) - firstDay(b) || toMinutes(a.start) - toMinutes(b.start)),
  }));
}

/** Classes for a kids age group, e.g. "kids-4-7". */
export function classesForAgeGroup(ageGroupId: string, classes: ScheduleClass[] = schedule) {
  return classes.filter((cls) => cls.ageGroup === ageGroupId);
}

/** "Tue, Thu at 5:00 PM", joined with " and " when a group meets at more than one time. */
export function whenLabel(classes: readonly ScheduleClass[]): string {
  return classes.map((cls) => `${formatDays(cls.days)} at ${formatTime(cls.start)}`).join(' and ');
}

export const DAY_NAMES: Record<Day, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

/** The `Day` for a date, in the date's own (local) time zone. JS counts Sunday as 0. */
export function dayFromDate(date: Date): Day {
  const order: Day[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return order[date.getDay()];
}
