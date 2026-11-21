import { describe, expect, it } from 'vitest';
import { programs } from './site';
import {
  CATEGORIES,
  DAYS,
  classesByCategory,
  classesForAgeGroup,
  compactRange,
  friendlyWhen,
  slotText,
  DAY_NAMES,
  dayFromDate,
  classesByDay,
  formatDays,
  formatDaysFriendly,
  nextClass,
  endTime,
  formatTime,
  schedule,
  timeRange,
  whenLabel,
  toMinutes,
} from './schedule';

describe('schedule data', () => {
  it('has unique class ids', () => {
    expect(new Set(schedule.map((c) => c.id)).size).toBe(schedule.length);
  });

  it('uses valid categories, HH:MM start times, and positive durations', () => {
    for (const cls of schedule) {
      expect(CATEGORIES).toContain(cls.category);
      expect(cls.start).toMatch(/^([01]\d|2[0-3]):[0-5]\d$/);
      expect(cls.durationMin).toBeGreaterThan(0);
    }
  });

  it('only schedules valid days, with no repeats within a class', () => {
    for (const cls of schedule) {
      expect(cls.days.length).toBeGreaterThan(0);
      expect(new Set(cls.days).size).toBe(cls.days.length);
      for (const day of cls.days) expect(DAYS).toContain(day);
    }
  });

  it('links every class to a real program', () => {
    const slugs = programs.map((p) => p.slug);
    for (const cls of schedule) expect(slugs).toContain(cls.program);
  });

  it('never overlaps two classes on the same day', () => {
    for (const { day, classes } of classesByDay()) {
      for (let i = 1; i < classes.length; i++) {
        const prevEnd = toMinutes(classes[i - 1].start) + classes[i - 1].durationMin;
        expect(toMinutes(classes[i].start), `${day}: ${classes[i].id}`).toBeGreaterThanOrEqual(
          prevEnd,
        );
      }
    }
  });

  it('is closed on Sunday', () => {
    expect(classesByDay().find((d) => d.day === 'Sun')?.classes).toEqual([]);
  });
});

describe('time helpers', () => {
  it('formats 12-hour times', () => {
    expect(formatTime('00:00')).toBe('12:00 AM');
    expect(formatTime('09:05')).toBe('9:05 AM');
    expect(formatTime('12:00')).toBe('12:00 PM');
    expect(formatTime('17:45')).toBe('5:45 PM');
  });

  it('computes end time and range', () => {
    expect(endTime({ start: '17:00', durationMin: 45 })).toBe('17:45');
    expect(endTime({ start: '10:00', durationMin: 90 })).toBe('11:30');
    expect(timeRange({ start: '17:00', durationMin: 45 })).toBe('5:00 PM - 5:45 PM');
  });
});

describe('classesByDay', () => {
  it('returns every day in order, sorted by start time', () => {
    const grouped = classesByDay();
    expect(grouped.map((d) => d.day)).toEqual([...DAYS]);
    const tue = grouped.find((d) => d.day === 'Tue')!.classes;
    expect(tue.map((c) => c.start)).toEqual([...tue.map((c) => c.start)].sort());
    expect(tue.length).toBeGreaterThan(1);
  });
});

describe('formatDays', () => {
  it('collapses 3+ consecutive days into a range', () => {
    expect(formatDays(['Mon', 'Tue', 'Wed', 'Thu'])).toBe('Mon-Thu');
    expect(formatDays(['Mon', 'Tue', 'Wed'])).toBe('Mon-Wed');
  });

  it('lists non-consecutive or short sets', () => {
    expect(formatDays(['Tue', 'Thu'])).toBe('Tue, Thu');
    expect(formatDays(['Mon', 'Tue'])).toBe('Mon, Tue');
    expect(formatDays(['Mon', 'Wed', 'Fri'])).toBe('Mon, Wed, Fri');
    expect(formatDays(['Sat'])).toBe('Sat');
  });

  it('puts days in week order regardless of input order', () => {
    expect(formatDays(['Thu', 'Tue'])).toBe('Tue, Thu');
    expect(formatDays(['Wed', 'Mon', 'Tue'])).toBe('Mon-Wed');
  });
});

describe('classesByCategory', () => {
  it('returns every category in order, with every class exactly once', () => {
    const grouped = classesByCategory();
    expect(grouped.map((g) => g.category)).toEqual([...CATEGORIES]);
    expect(grouped.flatMap((g) => g.classes)).toHaveLength(schedule.length);
    for (const g of grouped) {
      for (const cls of g.classes) expect(cls.category).toBe(g.category);
    }
  });
});

describe('kids age groups', () => {
  const kids = programs.find((p) => p.slug === 'kids');
  const groupIds = (kids?.ageGroups ?? []).map((g) => g.id);

  it('only tags classes with real age groups', () => {
    for (const cls of schedule.filter((c) => c.ageGroups)) {
      for (const id of cls.ageGroups ?? []) expect(groupIds, cls.id).toContain(id);
    }
  });

  it('gives every kids age group at least one class', () => {
    expect(groupIds.length).toBeGreaterThan(0);
    for (const id of groupIds) expect(classesForAgeGroup(id).length, id).toBeGreaterThan(0);
  });

  it('formats when a group meets', () => {
    expect(whenLabel(classesForAgeGroup('kids-4-7'))).toBe(
      'Tue, Thu at 5:00 PM and Sat at 9:00 AM',
    );
    expect(friendlyWhen(classesForAgeGroup('kids-8-13'))).toBe(
      'Tue & Thu 5:00 PM \u00b7 Sat 9:00 AM',
    );
    expect(friendlyWhen(classesForAgeGroup('kids-8-13'), { long: true })).toBe(
      'Tuesday & Thursday 5:00 PM \u00b7 Saturday 9:00 AM',
    );
    expect(whenLabel([])).toBe('');
  });
});

describe('slotText', () => {
  it('puts kids ages in the name and adult ages in the meta, like the original', () => {
    const byId = (id: string) => schedule.find((c) => c.id === id)!;
    expect(slotText(byId('kids-weekday'))).toEqual({
      name: 'Kids BJJ \u00b7 Ages 4\u20137 & 8\u201313',
      meta: '45 min \u00b7 Gi',
    });
    expect(slotText(byId('no-gi')).meta).toBe('Adults 14+ \u00b7 60 min \u00b7 Rash guard');
    expect(slotText(byId('adults-basics')).meta).toBe('Adults 14+ \u00b7 60 min');
  });
});

describe('compactRange', () => {
  it('shares the suffix within a half of the day and keeps both across noon', () => {
    expect(compactRange({ start: '19:00', durationMin: 60 })).toBe('7:00\u20138:00 PM');
    expect(compactRange({ start: '11:30', durationMin: 60 })).toBe('11:30 AM\u201312:30 PM');
  });
});

describe('dayFromDate', () => {
  it('maps JS weekdays (Sunday = 0) to our Day names', () => {
    expect(dayFromDate(new Date(2026, 10, 22))).toBe('Sun');
    expect(dayFromDate(new Date(2026, 10, 23))).toBe('Mon');
    expect(dayFromDate(new Date(2026, 10, 20))).toBe('Fri');
    expect(dayFromDate(new Date(2026, 10, 21))).toBe('Sat');
  });

  it('has a full name for every day', () => {
    for (const day of DAYS) expect(DAY_NAMES[day].startsWith(day)).toBe(true);
  });
});

describe('formatDaysFriendly', () => {
  it('formats runs, pairs and single days like the original schedule cards', () => {
    expect(formatDaysFriendly(['Mon', 'Tue', 'Wed', 'Thu'])).toBe('Mon\u2013Thu');
    expect(formatDaysFriendly(['Thu', 'Tue'])).toBe('Tue & Thu');
    expect(formatDaysFriendly(['Sat'])).toBe('Saturday');
    expect(formatDaysFriendly(['Fri'], { short: true })).toBe('Fri');
    expect(formatDaysFriendly(['Mon', 'Wed', 'Fri'])).toBe('Mon, Wed, Fri');
  });
});

describe('nextClass', () => {
  // 2026-11-21 is a Saturday (local time)
  const at = (iso: string) => new Date(iso);

  it('finds the next class later today', () => {
    const next = nextClass(at('2026-11-21T08:00:00'));
    expect(next?.cls.id).toBe('kids-saturday');
    expect(next?.when).toBe('today at 9:00 AM');
  });

  it('skips classes that already started and rolls over to later days', () => {
    expect(nextClass(at('2026-11-21T09:30:00'))?.cls.id).toBe('adults-all-levels-saturday');
    // Saturday evening: nothing Sunday, so Monday's first class
    const monday = nextClass(at('2026-11-21T20:00:00'));
    expect(monday?.day).toBe('Mon');
    expect(monday?.when).toBe('Monday at 6:00 PM');
  });

  it('says tomorrow for the next day', () => {
    expect(nextClass(at('2026-11-23T21:00:00'))?.when).toBe('tomorrow at 5:00 PM');
  });

  it('returns null with no classes', () => {
    expect(nextClass(at('2026-11-21T08:00:00'), [])).toBeNull();
  });
});
