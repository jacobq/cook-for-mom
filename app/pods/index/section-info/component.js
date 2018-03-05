import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['container-fluid', 'info'],

  contentComponent: 'index/section-info/content',
  titleComponent: 'index/section-info/title',
  leadComponent: 'index/section-info/lead'
});
