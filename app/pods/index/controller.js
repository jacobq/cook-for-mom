import Controller, { inject as controller } from '@ember/controller';
import { bind } from '@ember/runloop';

const BOOTSTRAP_MD_BREAKPOINT = 768; // from https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss#L171

export default Controller.extend({
  application: controller(),

  isHeroFormShowing: true,
  isBootstrapSmDown: false,

  init() {
    this._super(...arguments);

    if (typeof FastBoot === 'undefined') {
      this._resizeListener = bind(this, computeWindowSize);

      this._resizeListener();
      window.addEventListener('resize', this._resizeListener, true);
    }
  },

  willDestroy() {
    if (typeof FastBoot === 'undefined') {
      window.removeEventListener('resize', this._resizeListener, true);
      this._resizeListener = null;
    }
  }
});

function computeWindowSize() {
  this.set('isBootstrapSmDown', window.innerWidth < BOOTSTRAP_MD_BREAKPOINT);
}
