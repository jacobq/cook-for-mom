import Component from '@ember/component';
import { bind, once } from '@ember/runloop';
import { inject as service } from '@ember/service';
import BREAKPOINTS from '../../../utils/breakpoints';

export default Component.extend({
  tagName: 'header',

  isMobile: service(),

  didSubmit: false,
  onSubmit() {},
  onFormVisibilityChange() {},

  isFormShowing: true,
  isFormFloating: false,

  didInsertElement() {
    if (typeof FastBoot === 'undefined') {
      this._resizeListener = bind(this, once, this, computeWindowSize);

      this._resizeListener();
      window.addEventListener('resize', this._resizeListener, {
        capture: true,
        passive: true
      });
    }

    if (this.get('isMobile.any')) {
      let { height: formHeight } = this.element.querySelector('form')
        .getBoundingClientRect();
      let { height: navHeight } = this.element
        .nextElementSibling.getBoundingClientRect();

      this.element.querySelector('main')
        .style.height = `${window.innerHeight - navHeight / 2 - formHeight}px`;
    }
  },

  willDestroy() {
    if (typeof FastBoot === 'undefined') {
      window.removeEventListener('resize', this._resizeListener, {
        capture: true,
        passive: true
      });

      this._resizeListener = null;
    }
  }
});

function computeWindowSize() {
  this.set('isFormFloating', window.innerWidth >= BREAKPOINTS.md);
}
