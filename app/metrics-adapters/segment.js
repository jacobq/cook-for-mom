import SegmentAdapter from 'ember-metrics/metrics-adapters/segment';

import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { next, schedule } from '@ember/runloop';
import { task, timeout, waitForProperty } from 'ember-concurrency';

export default SegmentAdapter.extend({
  fingerprintjs: service(),
  firebase: service(),
  raven: service(),

  init() {
    this._super(...arguments);
    this.get('waitForFingerprint').perform();
  },

  didFingerprint: false,
  waitForFingerprint: task(function *() {
    if (typeof FastBoot === 'undefined' && !this.get('didFingerprint')) {
      yield waitForProperty(this.get('fingerprintjs'), 'fingerprint');

      let { firebase, raven } = this.getProperties('firebase', 'raven');
      let { result, components } = this.get('fingerprintjs.fingerprint');

      registerRaven(raven, result);
      findOrCreateFirebaseFingerprint(firebase, result, components);

      while (typeof get(window, 'analytics.user') !== 'function') {
        yield timeout(1);
      }

      registerClientAnonymousId(result);
      this.set('didFingerprint', true);
    }
  }),

  alias: ensureFingerprintBefore('alias'),
  identify: ensureFingerprintBefore('identify'),
  trackEvent: ensureFingerprintBefore('trackEvent'),
  trackPage: ensureFingerprintBefore('trackPage')
});

function ensureFingerprintBefore(funcName) {
  return function (options = {}) {
    if (!this.get('didFingerprint')) {
      next(this, schedule, 'afterRender', this, funcName, options);
    } else {
      this._super(options);
    }
  }
}

function registerClientAnonymousId(id) {
  window.analytics.user().anonymousId(id);
}

function findOrCreateFirebaseFingerprint(firebase, id, components) {
  firebase.firestore()
    .collection('fingerprints')
    .doc(id)
    .set({ components })
    .catch((err) => {
      if (err.code === 'permission-denied') {
        return; // document exists
      }

      throw err;
    });
}

function registerRaven(raven, id) {
  // n.b. handle sentry separately since its client is wrapped by an ember service
  raven.callRaven('setUserContext', { id });
}
