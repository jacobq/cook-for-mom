import Component from '@ember/component';

export default Component.extend({
  didSubmit: false,
  onSubmit() {},

  submit(event) {
    this.get('onSubmit')(event);
    this.set('didSubmit', true);
  }
});
