import Component from '@ember/component';
import { set } from '@ember/object';
import { htmlSafe } from '@ember/string';

/* eslint-disable max-len */
const DISHES = [{
  slug: 'potatoes',
  imageUrl: '/assets/images/food/potatoes-640.jpg',
  description: htmlSafe('Purple <em>potatoes</em> with <em>pickled cabbage</em> and crema')
}, {
  slug: 'soup',
  imageUrl: '/assets/images/food/soup-640.jpg',
  description: htmlSafe('Salmorejo—a rustic Spanish <em>tomato soup</em>—garnished with eggs, <em>breadcrumbs</em>, and ham')
}, {
  slug: 'tacos',
  imageUrl: '/assets/images/food/tacos-1-640.jpg',
  description: htmlSafe('Homemade tortilla with <em>roasted pork shoulder</em> or <em>cauliflower</em>, pickled jalapenos, jicama, cotija <em>cheese</em>, and pico de gallo')
}, {
  slug: 'cookies',
  imageUrl: '/assets/images/food/cookies-640.jpg',
  description: htmlSafe('<em>Bonus!</em> Fresh-Baked Ginger Molasses <em>Cookies</em>')
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
