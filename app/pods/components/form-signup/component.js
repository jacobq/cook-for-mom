import Component from '@ember/component';
import { not } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { bind, next } from '@ember/runloop';
import { inject as service } from '@ember/service';

import share from '../../../utils/share';

export default Component.extend({
  tagName: 'form',

  isMobile: service(),

  didSubmit: false,
  canReset: true,
  shouldFocusInput: not('isMobile.any'),

  onSubmit() {},
  onViewportEntered: null, // is function
  onViewportExited: null, // is function

  headerComponent: 'form-signup/header',
  mainComponent: 'form-signup/main',
  footerComponent: 'form-signup/footer',

  share,
  buySupplies() {},

  didInsertElement() {
    let {
      onViewportEntered: entered,
      onViewportExited: exited,
      shouldFocusInput
    } = this.getProperties(...[
      'onViewportEntered',
      'onViewportExited',
      'shouldFocusInput'
    ]);

    if ([entered, exited].any(isPresent)) {
      this._scrollListener = bind(this, checkViewport);

      window.addEventListener('scroll', this._scrollListener, true);
      next(this, checkViewport);
    }

    if (shouldFocusInput) {
      next(this, focusInput, this.element);
    }
  },

  willDestroyElement() {
    window.removeEventListener('scroll', this._scrollListener, true);
    this._viewportListener = null;
  },

  keydown(event) {
    switch (event.key) {
      case 'Enter': this.submit(event);
    }
  },

  submit(event) {
    event.preventDefault();

    if (this.get('onSubmit')(event) !== false) {
      alert('todo submit');
      this.set('didSubmit', true);
    }
  }
});

function checkViewport(/* event */) {
  let { top, bottom } = this.element.getBoundingClientRect();
  let callbackName = (bottom >= 0 || top >= 0) ?
    'onViewportEntered' :
    'onViewportExited';

  let callback = this.get(callbackName);

  if (callback instanceof Function) {
    callback();
  }
}

function focusInput(element) {
  let input = element.querySelector('input');

  if (isPresent(input)) {
    let { top, bottom } = input.getBoundingClientRect();
    let { scrollY, innerHeight } = window;

    if (top > 0 && bottom < scrollY + innerHeight) {
      input.focus();
    }
  }
}
