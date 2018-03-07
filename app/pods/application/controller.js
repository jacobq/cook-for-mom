import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  didSubmit: false,
  canNudgeUser: false,

  isNudging: null, // is object
  _nudgesRequested: null, // is array

  init() {
    this._super(...arguments);
    this._nudgesRequested = [];
  },

  requestNudgeFor(application, topic, name) {
    if (!application.get('canNudgeUser') || application.get('isNudging')) {
      return;
    }

    let requested = application.get('_nudgesRequested');
    let isRepeatRequest = requested.any(({ topic: _topic, name: _name }) => {
      return _topic === topic && _name === name;
    });

    if (!isRepeatRequest) {
      requested.addObject({ topic, name, timestamp: new Date() });
      application.set('isNudging', true);

      return true;
    }
  }
});
