import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  didSubmit: false,

  onSubmit(/* event */) {
    window.alert('modal');
    this.getWithDefault('application', this)
      .set('didSubmit', true);
  }
});
