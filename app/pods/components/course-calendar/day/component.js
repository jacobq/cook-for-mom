import Component from '@ember/component';
import { computed } from '@ember/object';
import { bind } from '@ember/runloop';
import { isPresent } from '@ember/utils';

const SPECIAL_DATES = [
  { date: '04-02', type: 'lesson', value: 'Week 1: Knife Skills' },
    { date: '04-05', type: 'activity', value: 1 },
    { date: '04-06', type: 'activity', value: 1 },
  { date: '04-09', type: 'lesson', value: 'Week 2: Cooking Proteins' },
    { date: '04-12', type: 'activity', value: 1 },
    { date: '04-14', type: 'activity', value: 2 },
  { date: '04-16', type: 'lesson', value: 'Week 3: How to Shop' },
    { date: '04-19', type: 'activity', value: 1 },
    { date: '04-20', type: 'activity', value: 1 },
    { date: '04-21', type: 'activity', value: 2 },
  { date: '04-23', type: 'lesson', value: 'Week 4: The Continuous Kitchen' },
    { date: '04-26', type: 'activity', value: 1 },
    { date: '04-27', type: 'activity', value: 2 },
    { date: '04-28', type: 'activity', value: 1 },
  { date: '04-30', type: 'lesson', value: 'Week 5: Kitchen Timing' },
    { date: '05-04', type: 'activity', value: 1 },
    { date: '05-05', type: 'activity', value: 1 },
  { date: '05-07', type: 'lesson', value: 'Week 6: Meal Prep' },
    { date: '05-10', type: 'activity', value: 1 },
    { date: '05-11', type: 'activity', value: 2 },
    { date: '05-12', type: 'activity', value: 2 },
  { date: '05-13', type: 'meal', value: 'Mother\'s Day!' },
];

const Day = Component.extend({
  day: null,
  dayString: computed('day', function() {
    return this.get('day.moment').format('MM-DD');
  }),

  isSpecialDay: computed.bool('specialDay'),
  specialDay: computed('dayString', function() {
    return SPECIAL_DATES.findBy('date', this.get('dayString'));
  }),

  didUpdateAttrs() {
    ensureSpecialHandling.call(this);
  },

  didInsertElement() {
    this._onClick = bind(this, onClick);

    ensureSpecialHandling.call(this);
    this.element
      .addEventListener('click', this._onClick, true);
  },

  willDestroyElement() {
    this.element
      .removeEventListener('click', this._onClick, true);
    this._onClick = null;
  }
});

Day.reopenClass({
  positionalParams: ['day']
});

export default Day;

function onClick(/* event */) {
  if (this.get('day.isToday')) {
    alert('todo sign up');
  }
}

function ensureSpecialHandling() {
  let specialDay = this.get('specialDay');

  if (isPresent(specialDay)) {
    let { type, value } = specialDay;
    let klass = type === 'activity' ? `${type}-${value}` : type;

    this.element.classList.add(klass);
  } else if (this.get('day.isToday')) {
    this.element.classList.add('today');
  }
}
