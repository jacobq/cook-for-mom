import Component from '@ember/component';
import { computed, set } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { isPresent } from '@ember/utils';

import moment from 'moment';

const COURSE_START = '2018-04-02';
const COURSE_END = '2018-05-13';
const COURSE_LESSONS = [{
  slug: 'knife',
  title: 'Week 1: Knife Skills',
  description: htmlSafe('<em>Knife skills</em>, including <em>chopping</em>, <em>dicing</em>, and basic safety')
}, {
  slug: 'pan',
  title: 'Week 2: Cooking Proteins',
  description: htmlSafe('3 common techniques for cooking proteins like <em>fish</em>, <em>chicken</em>, and <em>tofu</em>')
}, {
  slug: 'shop',
  title: 'Week 3: How to Shop',
  description: htmlSafe('Where, how, and why to <em>shop</em> for the <em>best ingredients</em> you can get')
}, {
  slug: 'recycle',
  title: 'Week 4: The Continuous Kitchen',
  description: htmlSafe('How to use your cooking by-products to run a <em>budget-friendly</em>, <em>eco-conscious</em>, <em>continuous</em> kitchen')
}, {
  slug: 'clock',
  title: 'Week 5: Timing',
  description: htmlSafe('What cooking times <em>actually mean</em>')
}, {
  slug: 'camera',
  title: 'Week 6: Meal Prep',
  description: htmlSafe('The strategies <em>real chefs</em> use when <em>planning</em> and <em>presenting</em> tasty, Instagrammable meals')
}, {
  slug: 'learning',
  description: 'And much, much more!'
}];

const COURSE_DATES = [
  { date: '04-02', type: 'lesson', value: COURSE_LESSONS.findBy('slug', 'knife') },
    { date: '04-05', type: 'activity', value: 1 },
    { date: '04-06', type: 'activity', value: 1 },
  { date: '04-09', type: 'lesson', value: COURSE_LESSONS.findBy('slug', 'pan') },
    { date: '04-12', type: 'activity', value: 1 },
    { date: '04-14', type: 'activity', value: 2 },
  { date: '04-16', type: 'lesson', value: COURSE_LESSONS.findBy('slug', 'shop') },
    { date: '04-19', type: 'activity', value: 1 },
    { date: '04-20', type: 'activity', value: 1 },
    { date: '04-21', type: 'activity', value: 2 },
  { date: '04-23', type: 'lesson', value: COURSE_LESSONS.findBy('slug', 'recycle') },
    { date: '04-26', type: 'activity', value: 1 },
    { date: '04-27', type: 'activity', value: 2 },
    { date: '04-28', type: 'activity', value: 1 },
  { date: '04-30', type: 'lesson', value: COURSE_LESSONS.findBy('slug', 'clock') },
    { date: '05-04', type: 'activity', value: 1 },
    { date: '05-05', type: 'activity', value: 1 },
  { date: '05-07', type: 'lesson', value: COURSE_LESSONS.findBy('slug', 'camera') },
    { date: '05-10', type: 'activity', value: 1 },
    { date: '05-11', type: 'activity', value: 2 },
    { date: '05-12', type: 'activity', value: 2 },
  { date: '05-13', type: 'meal', value: 'Mother\'s Day!' },
];

export default Component.extend({
  classNames: ['course-calendar'],
  classNameBindings: ['isAtEarliestMonth:cal-start', 'isAtLatestMonth:cal-end'],

  dates: COURSE_DATES,
  lessons: COURSE_LESSONS,
  dayComponent: 'course-calendar/day',

  min: computed(function() {
    return moment.min(moment(), moment(COURSE_START));
  }),

  max: computed(function() {
    return moment.max(moment(), moment(COURSE_END));
  }),

  center: computed(function() {
    return moment.min(moment.max(moment(), moment(COURSE_START)), moment(COURSE_END)); // eslint-disable-line max-len
  }),

  isAtEarliestMonth: computed('min', 'center', function() {
    let hasEarlierMonths = this.get('min').endOf('month')
      .isBefore(moment(this.get('center')).startOf('month'));

    return !hasEarlierMonths;
  }),

  isAtLatestMonth: computed('max', 'center', function() {
    let hasLaterMonths = this.get('max').startOf('month')
      .isAfter(moment(this.get('center')).endOf('month'));

    return !hasLaterMonths;
  }),

  isDateOutOfRange(date) {
    return !date.isBetween(this.get('min'), COURSE_END, 'day', '[]');
  },

  activate(lesson, { shouldCenter = true }) {
    this.get('lessons').forEach((_lesson) => {
      let isActivating = _lesson === lesson;

      set(_lesson, 'active', isActivating);

      if (isActivating && shouldCenter) {
        let { center, dates } = this.getProperties('center', 'dates');
        let { date } = dates.findBy('value', lesson) || {};

        if (isPresent(date) && !isCentered(date, moment(center))) {
          this.set('center', moment(date, 'MM-DD'));
        }
      }
    });
  },

  deactivate(lesson) {
    set(lesson, 'active', false);
  }
});

function isCentered(date, center) {
  return moment(date, 'MM-DD')
    .isBetween(center.startOf('month'), center.endOf('month'));
}
