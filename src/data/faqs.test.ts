import { describe, expect, it } from 'vitest';
import {
  answerParts,
  answerText,
  etiquette,
  faqGroups,
  faqPageGroups,
  faqsFor,
  type FaqPage,
} from './faqs';

describe('faqs', () => {
  it('has unique group ids and non-empty groups', () => {
    expect(new Set(faqGroups.map((g) => g.id)).size).toBe(faqGroups.length);
    for (const group of faqGroups) expect(group.items.length, group.id).toBeGreaterThan(0);
  });

  it('has non-empty questions and answers, with no duplicate questions on any one page', () => {
    const lists = [
      faqPageGroups.flatMap((g) => g.items),
      ...(['kids', 'bjj', 'no-gi', 'birthday'] as FaqPage[]).map((page) => faqsFor(page)),
    ];
    for (const list of lists) {
      const questions = list.map((i) => i.question);
      expect(new Set(questions).size).toBe(questions.length);
    }
    for (const item of faqGroups.flatMap((g) => g.items)) {
      expect(item.question.trim()).not.toBe('');
      expect(item.answer.trim()).not.toBe('');
    }
  });

  it('gives every program page a short FAQ list', () => {
    for (const page of ['kids', 'bjj', 'no-gi', 'birthday'] as FaqPage[]) {
      expect(faqsFor(page).length, page).toBeGreaterThanOrEqual(3);
    }
  });

  it('keeps program-page lists off the full FAQ page', () => {
    for (const id of ['kids-page', 'adults-page', 'no-gi-page', 'birthday-parties']) {
      expect(faqPageGroups.map((g) => g.id)).not.toContain(id);
    }
    const fromData = faqPageGroups.filter((g) => g.id !== 'etiquette');
    expect(fromData.length).toBeLessThan(faqGroups.length);
  });

  it('ends the FAQ page with an etiquette group listing every rule', () => {
    expect(etiquette.length).toBeGreaterThan(0);
    const last = faqPageGroups.at(-1);
    expect(last?.id).toBe('etiquette');
    expect(last?.items[0].list).toEqual(etiquette);
  });

  it('uses unique group ids on the FAQ page (they are jump-link anchors)', () => {
    const ids = faqPageGroups.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('reads paragraphs and [text](href) links out of answers', () => {
    expect(answerParts('One [two](/x) three.\n\nFour.')).toEqual([
      [{ text: 'One ' }, { text: 'two', href: '/x' }, { text: ' three.' }],
      [{ text: 'Four.' }],
    ]);
    expect(answerText({ answer: 'See [us](/a).', list: ['Rule'] })).toBe('See us. Rule');
  });
});
