'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'cook-for-mom',
    podModulePrefix: 'cook-for-mom/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    metricsAdapters: [{
      name: 'GoogleAnalytics',
      environments: ['development', 'production'],
      config: {
        id: 'UA-114580212-1',
        debug: environment === 'development',
        trace: environment === 'development',
        sendHitTask: environment !== 'development'
      }
    }],

    sentry: {
      dsn: 'https://7ab1a2d634f84f8f8cceabc074249391@app.getsentry.com/298920'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.sentry.development = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
