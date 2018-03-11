import Controller, { inject as controller } from '@ember/controller';
import { validator, buildValidations } from 'ember-cp-validations';

import BREAKPOINTS from '../../utils/breakpoints';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});

export default Controller.extend(Validations, {
  application: controller(),

  email: '',
  isHeroFormShowing: true,

  computeParallaxBackgroundStyle
});

function computeParallaxBackgroundStyle(element) {
  let isBootstrapMdDown = window.innerWidth < BREAKPOINTS.md;
  let heightMultiplier = isBootstrapMdDown ? 1.5 : 2;
  let { height } = element.nextElementSibling.getBoundingClientRect();

  element.style.top = `${-0.25 * height}px`;
  element.style.height = `${heightMultiplier * height}px`;
  element.style['background-position'] = isBootstrapMdDown ?
    'bottom center' :
    'center';
}
