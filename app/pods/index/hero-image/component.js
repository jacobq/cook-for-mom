import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

import share from '../../../utils/share';

let lastY = -1;
let isFormShowing = true;

export default Component.extend({
  isMobile: service(),

  didSubmit: false,
  onFormShow() {},
  onFormHide() {},

  didInsertElement() {
    lastY = -1;
    this._isFormShowingListener = checkFormShowing.bind(this);

    this._isFormShowingListener();
    window.addEventListener('scroll', this._isFormShowingListener, true);

    if (this.get('isMobile.any')) {
      let { height: navHeight } = this.element
        .nextElementSibling.getBoundingClientRect();

      this.element.style.height = `${window.innerHeight - navHeight}px`;
    } else {
      let input = this.element.querySelector('input');

      if (isPresent(input)) {
        input.focus();
      }
    }
  },

  willDestroyElement() {
    window.removeEventListener('scroll', this._isFormShowingListener, true);
    this._isFormShowingListener = null;
  },

  onSubmit(event) {
    event.preventDefault();
    event.target.blur();

    this.get('onSubmit')(event);
  },

  onKeydown(event) {
    switch (event.key) {
      case 'Enter': this.onSubmit(event);
    }
  },

  share,
  reset() {
    this.set('didSubmit', false);
  },

  buySupplies() {
  }
});

function checkFormShowing(/* event */) {
  let isScrollingDown = window.scrollY > lastY;
  let shouldRecalculate = (isScrollingDown && isFormShowing) ||
    (!isScrollingDown && !isFormShowing)

  if (shouldRecalculate) {
    isFormShowing = this.element.querySelector('form')
      .getBoundingClientRect()
      .bottom >= 0;

    if (isFormShowing) {
      this.get('onFormShow')();
    } else {
      this.get('onFormHide')();
    }
  }

  lastY = window.scrollY;
}
