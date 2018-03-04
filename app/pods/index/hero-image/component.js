import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  isMobile: service(),

  didInsertElement() {
    if (this.get('isMobile.any')) {
      let { height: navHeight } = this.element
        .nextElementSibling.getBoundingClientRect();

      this.element.style.height = `${window.innerHeight - navHeight}px`;
    }
  }
});
