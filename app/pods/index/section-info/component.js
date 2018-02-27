import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['container-fluid', 'info'],

  titleComponent: 'index/section-info/title',
  leadComponent: 'index/section-info/lead'
});
