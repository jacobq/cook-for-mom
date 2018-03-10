import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { bind, next } from '@ember/runloop';

export default Component.extend({
  onResize: null, // is fn

  didInsertElement() {
    let onResize = this.get('onResize');

    if (isPresent(onResize)) {
      this._onResize = bind(this, onResize, this.element);

      next(this, this._onResize);
      window.addEventListener('resize', this._onResize, { passive: true });
    }
  },

  willDestroyElement() {
    if (isPresent(this._onResize)) {
      window.removeEventListener('resize', this._onResize, { passive: true });
      this._onResize = null;
    }
  }
});
