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
}

export const schedule: ScheduleClass[] = [
  {
    id: 'kids-weekday',
    name: 'Kids',
    category: 'kids',
    program: 'kids',
    days: ['Tue', 'Thu'],
    start: '17:00',
    durationMin: 45,
    audience: 'Ages 4-13',
  },
  {
    id: 'kids-saturday',
    name: 'Kids',
    category: 'kids',
    program: 'kids',
    days: ['Sat'],
    start: '09:00',
    durationMin: 60,
    audience: 'Ages 4-13',
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
