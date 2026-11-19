import { describe, expect, it } from 'vitest';
import { programs } from './site';
import {
  CATEGORIES,
  DAYS,
  classesByDay,
  endTime,
  formatTime,
  schedule,
  timeRange,
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
