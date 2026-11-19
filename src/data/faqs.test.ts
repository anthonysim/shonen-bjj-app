import { describe, expect, it } from 'vitest';
import { etiquette, faqGroups, faqPageGroups, faqsFor, type FaqPage } from './faqs';

describe('faqs', () => {
  it('has unique group ids and non-empty groups', () => {
    expect(new Set(faqGroups.map((g) => g.id)).size).toBe(faqGroups.length);
    for (const group of faqGroups) expect(group.items.length, group.id).toBeGreaterThan(0);
  });

  it('has non-empty questions and answers, with no duplicate questions', () => {
    const questions = faqGroups.flatMap((g) => g.items.map((i) => i.question));
    expect(new Set(questions).size).toBe(questions.length);
    for (const item of faqGroups.flatMap((g) => g.items)) {
      expect(item.question.trim()).not.toBe('');
      expect(item.answer.trim()).not.toBe('');
    }
  });

  it('gives every program page a short FAQ list', () => {
    for (const page of ['kids', 'bjj', 'no-gi', 'birthday', 'free-trial'] as FaqPage[]) {
      expect(faqsFor(page).length, page).toBeGreaterThanOrEqual(3);
    }
  });

  it('keeps birthday questions off the full FAQ page', () => {
    expect(faqPageGroups.map((g) => g.id)).not.toContain('birthday-parties');
    expect(faqPageGroups.length).toBeLessThan(faqGroups.length);
  });

  it('has etiquette rules', () => {
    expect(etiquette.length).toBeGreaterThan(0);
  });
});
