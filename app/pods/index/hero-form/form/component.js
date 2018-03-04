import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

let lastY = -1;
let isFormShowing = true;

const Form = Component.extend({
  tagName: 'form',
  isMobile: service(),

  form: null,
  onViewportEntered() {},
  onViewportExited() {},

  didInsertElement() {
    lastY = -1;

    this._isFormShowingListener = checkFormShowing.bind(this);

    window.addEventListener('scroll', this._isFormShowingListener, true);

    next(this, checkFormShowing);

    if (!this.get('isMobile.any')) {
      next(this, focusChildInput, this.element);
    }
  },

  willDestroyElement() {
    window.removeEventListener('scroll', this._isFormShowingListener, true);
    this._isFormShowingListener = null;
  },

  onSubmit(event) {
    event.preventDefault();
    event.target.blur();

    this.get('form.submit')(event);
  },

  onKeydown(event) {
    switch (event.key) {
      case 'Enter': this.onSubmit(event);
    }
  }
});

Form.reopenClass({
  positionalParams: ['form']
});

export default Form;

function checkFormShowing(/* event */) {
  let isScrollingDown = window.scrollY > lastY;
  let shouldRecalculate = (isScrollingDown && isFormShowing) ||
    (!isScrollingDown && !isFormShowing)

  if (shouldRecalculate) {
    isFormShowing = this.element.getBoundingClientRect().bottom >= 0;

    if (isFormShowing) {
      this.get('onViewportEntered')();
    } else {
      this.get('onViewportExited')();
    }
  }

  lastY = window.scrollY;
}

function focusChildInput(element) {
  let input = element.querySelector('input');

  if (isPresent(input)) {
    let { top, bottom } = input.getBoundingClientRect();
    let { scrollY, innerHeight } = window;

    if (top > 0 && bottom < scrollY + innerHeight) {
      input.focus();
    }
  }
}
