import Component from '@ember/component';
import { computed } from '@ember/object';

import moment from 'moment';

const COURSE_START = '2018-04-02';
const COURSE_END = '2018-05-13';

export default Component.extend({
  calendarMin: computed(function() {
    return moment.min(moment(), moment(COURSE_START));
  }),

  calendarMax: computed(function() {
    return moment.max(moment(), moment(COURSE_END));
  }),

  calendarCenter: computed(function() {
    return moment.min(moment.max(moment(), moment(COURSE_START)), moment(COURSE_END)); // eslint-disable-line max-len
  }),

  isAtEarliestMonth: computed('calendarMin', 'calendarCenter', function() {
    let hasEarlierMonths = this.get('calendarMin').endOf('month')
      .isBefore(moment(this.get('calendarCenter')).startOf('month'));

    return !hasEarlierMonths;
  }),

  isAtLatestMonth: computed('calendarMax', 'calendarCenter', function() {
    let hasLaterMonths = this.get('calendarMax').startOf('month')
      .isAfter(moment(this.get('calendarCenter')).endOf('month'));

    return !hasLaterMonths;
  }),

  isDateOutOfRange(date) {
    return !date.isBetween(this.get('calendarMin'), COURSE_END, 'day', '[]');
  }
});
