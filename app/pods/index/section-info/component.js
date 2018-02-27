import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['container-fluid'],

  titleComponent: 'index/section-info/title',
  leadComponent: 'index/section-info/lead'
});
