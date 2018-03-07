import Component from '@ember/component';
import { computed } from '@ember/object';
import { bind } from '@ember/runloop';
import { isPresent } from '@ember/utils';

const Day = Component.extend({
  classNameBindings: ['specialClass', 'isSimulatingHover:sim-hover'],

  calendar: null,
  day: null,

  dayString: computed('day', function() {
    return this.get('day.moment').format('MM-DD');
  }),

  specialDay: computed('calendar.dates', 'dayString', function() {
    return this.get('calendar.dates').findBy('date', this.get('dayString'));
  }),

  isSpecialDay: computed.bool('specialDay'),
  isSimulatingHover: computed.reads('specialDay.value.active'),
  specialClass: computed('day.isToday', 'specialDay.type', function() {
    if (this.get('day.isToday')) {
      return 'today';
    } else {
      let type = this.get('specialDay.type');

      switch (type) {
        case 'activity': return `${type}-${this.get('specialDay.value')}`;
        default: return type;
      }
    }
  }),

  didInsertElement() {
    let { calendar, specialDay } = this.getProperties('calendar', 'specialDay');

    this._onClick = bind(this, onClick);
    this.element.addEventListener('click', this._onClick, true);

    if (isPresent(specialDay) && specialDay.type === 'lesson') {
      let { value: lesson } = specialDay;

      this._onMouseOver = bind(this, onMouseOver, calendar, lesson);
      this._onMouseOut = bind(this, onMouseOut, calendar, lesson);

      this.element.addEventListener('mouseover', this._onMouseOver, true);
      this.element.addEventListener('mouseout', this._onMouseOut, true);
    }
  },

  willDestroyElement() {
    this.element.removeEventListener('click', this._onClick, true);
    this._onClick = null;

    if (this._onMouseOver) {
      this.element.removeEventListener('mouseover', this._onMouseOver, true);
      this._onMouseOver = null;
    }

    if (this._onMouseOut) {
      this.element.removeEventListener('mouseout', this._onMouseOut, true);
      this._onMouseOut = null;
    }
  }
});

Day.reopenClass({
  positionalParams: ['calendar', 'day']
});

export default Day;

function onClick(/* event */) {
  if (this.get('day.isToday')) {
    alert('todo sign up');
  }
}

function onMouseOver(calendar, lesson, event) {
  if (lesson.active) {
    return;
  }

  calendar.activate(lesson, {
    shouldCenter: !event.target.parentElement
      .classList.contains('ember-power-calendar-day--other-month')
  });
}

function onMouseOut(calendar, lesson, event) {
  let elem = this.element;
  let { target, relatedTarget: related } = event;

  if (!lesson.active || (elem.contains(related) && elem.contains(target))) {
    return;
  }

  calendar.deactivate(lesson);
}
