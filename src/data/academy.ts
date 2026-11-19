// Shared academy copy used on several pages. Placeholder text.

export interface Titled {
  title: string;
  body: string;
}

/** "Why us" pillars. Homepage and About. */
export const values: Titled[] = [
  {
    title: 'Authentic',
    body: 'Real jiu-jitsu with real technique, taught the way it is practiced and competed.',
  },
  {
    title: 'Elite',
    body: 'Coaching from a proven competitor who builds clear, repeatable skills.',
  },
  {
    title: 'Safe',
    body: 'A structured, respectful room where beginners are looked after from day one.',
  },
];

/** What a first class looks like. Homepage and Free Trial. */
export const firstClassSteps: Titled[] = [
  {
    title: 'Pick a class',
    body: 'Choose a time that suits you. We will text to confirm and answer any questions.',
  },
  {
    title: 'Arrive 15 minutes early',
    body: 'Meet your coach, get a tour, and borrow a gi if you need one.',
  },
  {
    title: 'Train at your own pace',
    body: 'Warm up, learn a technique, and drill with a partner. Rest whenever you need to.',
  },
];
