import Component from '@ember/component';
import { set } from '@ember/object';

/* eslint-disable max-len */
const DISHES = [{
  slug: 'potatoes',
  imageUrl: '/assets/images/food/potatoes-640.jpg',
  description: 'Purple potatoes with pickled cabbage and crema'
}, {
  slug: 'soup',
  imageUrl: '/assets/images/food/soup-640.jpg',
  description: 'Salmorejo—a rustic Spanish tomato soup—garnished with eggs, breadcrumbs, and ham'
}, {
  slug: 'tacos',
  imageUrl: '/assets/images/food/tacos-1-640.jpg',
  description: 'Homemade tortilla with roasted pork shoulder or cauliflower, pickled jalapenos, jicama, cotija cheese, and pico de gallo'
}, {
  slug: 'cookies',
  imageUrl: '/assets/images/food/cookies-640.jpg',
  description: 'Bonus! Fresh-Baked Ginger Molasses Cookies'
}];
/* eslint-enable max-len */

export default Component.extend({
  classNames: ['meal-menu'],

  dishes: DISHES,

  activate(dish) {
    this.get('dishes').forEach((_dish) => {
      set(_dish, 'active', _dish === dish);
    });
  },

  deactivate(dish) {
    set(dish, 'active', false);
  }
});
